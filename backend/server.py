from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend setup
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
QUOTE_RECIPIENT_EMAIL = os.environ.get('QUOTE_RECIPIENT_EMAIL', 'laszlochomel@gmail.com')
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# In-memory cache for quotes to allow resend when Mongo is unavailable (local testing)
QUOTE_CACHE = {}

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ========== Models ==========
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class StatusCheckCreate(BaseModel):
    client_name: str


class QuoteRequest(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(..., min_length=4, max_length=30)
    country: str = Field(..., min_length=2, max_length=80)
    need: str = Field(..., min_length=2, max_length=200)
    budget: str = Field(..., min_length=1, max_length=80)
    usage: str = Field(..., min_length=2, max_length=500)
    package: str
    wireless: str
    color: str
    resolution: str
    case_type: str
    rgb: str
    win_edition: str
    message: str = Field(..., min_length=2, max_length=4000)
    over_18: str
    cgv_accepted: bool


class QuoteStored(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    data: dict
    email_sent: bool = False
    email_error: Optional[str] = None


# ========== Routes ==========
@api_router.get("/")
async def root():
    return {"message": "LINE9 API ready"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]


def _build_email_html(q: QuoteRequest, quote_id: str) -> str:
    rows = [
        ("Nom et Prénom", q.full_name),
        ("Email", q.email),
        ("Téléphone", q.phone),
        ("Pays", q.country),
        ("Besoin", q.need),
        ("Budget", q.budget),
        ("Usage", q.usage),
        ("Forfait assemblage", q.package),
        ("Connectivité sans-fil", q.wireless),
        ("Couleur", q.color),
        ("Résolution cible", q.resolution),
        ("Boitier", q.case_type),
        ("RGB", q.rgb),
        ("Édition Win11", q.win_edition),
        ("Plus de 18 ans", q.over_18),
        ("CGV acceptées", "Oui" if q.cgv_accepted else "Non"),
    ]
    rows_html = "".join(
        f"<tr><td style='padding:10px 14px;border-bottom:1px solid #1a1a1a;color:#888;font-size:13px;width:200px;'>{label}</td>"
        f"<td style='padding:10px 14px;border-bottom:1px solid #1a1a1a;color:#fff;font-size:14px;font-weight:500;'>{value}</td></tr>"
        for label, value in rows
    )
    return f"""
    <div style="font-family:Inter,Arial,sans-serif;background:#0F0F0F;color:#fff;padding:24px;">
      <div style="max-width:640px;margin:0 auto;background:#141414;border-radius:18px;overflow:hidden;border:1px solid #222;">
        <div style="background:#C7F84E;color:#0F0F0F;padding:24px 28px;">
          <div style="font-size:11px;letter-spacing:0.22em;font-weight:700;text-transform:uppercase;">LINE9 · Nouveau devis</div>
          <div style="font-size:24px;font-weight:900;margin-top:6px;">Demande de devis #{quote_id[:8]}</div>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          {rows_html}
        </table>
        <div style="padding:20px 28px;background:#0F0F0F;border-top:1px solid #1a1a1a;">
          <div style="color:#888;font-size:12px;margin-bottom:8px;">Message du client</div>
          <div style="color:#fff;font-size:14px;line-height:1.5;white-space:pre-wrap;">{q.message}</div>
        </div>
        <div style="padding:16px 28px;background:#0a0a0a;color:#555;font-size:11px;text-align:center;">
          Reçu le {datetime.utcnow().strftime('%d/%m/%Y à %H:%M UTC')} · ID {quote_id}
        </div>
      </div>
    </div>
    """


@api_router.post("/quote")
async def create_quote(payload: QuoteRequest):
    if not payload.cgv_accepted:
        raise HTTPException(status_code=400, detail="Vous devez accepter les CGV.")

    quote_id = str(uuid.uuid4())
    stored = {
        "id": quote_id,
        "created_at": datetime.utcnow(),
        "data": payload.dict(),
        "email_sent": False,
        "email_error": None,
    }

    # Cache the quote in memory so it can be resent even if Mongo is down (dev only)
    try:
        QUOTE_CACHE[quote_id] = stored
    except Exception:
        pass

    # Try to send email via Resend
    email_error = None
    email_sent = False
    if RESEND_API_KEY:
        try:
            params = {
                "from": "LINE9 <onboarding@resend.dev>",
                "to": [QUOTE_RECIPIENT_EMAIL],
                "reply_to": payload.email,
                "subject": f"[LINE9] Nouveau devis — {payload.full_name}",
                "html": _build_email_html(payload, quote_id),
            }
            resp = resend.Emails.send(params)
            logger.info(f"Resend response: {resp}")
            email_sent = True
        except Exception as e:
            email_error = str(e)
            logger.error(f"Resend send failed: {e}")
    else:
        email_error = "RESEND_API_KEY missing"

    stored["email_sent"] = email_sent
    stored["email_error"] = email_error

    # Persist in MongoDB (always)
    try:
        await db.quotes.insert_one(stored)
    except Exception as e:
        logger.error(f"Mongo insert failed: {e}")

    return {
        "id": quote_id,
        "email_sent": email_sent,
        "message": "Votre demande a bien été enregistrée. Vous recevrez une réponse sous 24h.",
    }


@api_router.get("/quotes/count")
async def quotes_count():
    n = await db.quotes.count_documents({})
    return {"count": n}


@api_router.post("/quote/{quote_id}/resend")
async def resend_quote(quote_id: str):
    quote = None
    # Try to read from MongoDB but fall back to in-memory cache if DB is unreachable
    try:
        quote = await db.quotes.find_one({"id": quote_id})
    except Exception as e:
        logger.warning(f"Mongo read failed, falling back to cache: {e}")

    if not quote:
        quote = QUOTE_CACHE.get(quote_id)

    if not quote:
        raise HTTPException(status_code=404, detail="Devis introuvable")

    # Ensure Resend is configured
    if not RESEND_API_KEY:
        raise HTTPException(status_code=500, detail="RESEND_API_KEY missing")

    qdata = quote.get("data", {})
    client_email = qdata.get("email")
    if not client_email:
        raise HTTPException(status_code=400, detail="Le devis ne contient pas d'email client")

    try:
        # Recreate a QuoteRequest model from stored data for HTML generation
        qreq = QuoteRequest(**qdata)
        # Send only to the client email for local/testing keys to avoid
        # test-key restrictions that only allow the owner's email.
        to_list = [client_email]
        params = {
            "from": "LINE9 <onboarding@resend.dev>",
            "to": to_list,
            "reply_to": QUOTE_RECIPIENT_EMAIL,
            "subject": f"[LINE9] Devis — {qdata.get('full_name', '')}",
            "html": _build_email_html(qreq, quote_id),
        }
        resp = resend.Emails.send(params)
        logger.info(f"Resend resend response: {resp}")

        # Update stored quote status (don't fail the request if DB is down)
        try:
            await db.quotes.update_one({"id": quote_id}, {"$set": {"email_sent": True, "email_error": None}})
        except Exception as e:
            logger.warning(f"Mongo update after resend failed: {e}")

        return {"id": quote_id, "email_sent": True, "message": "Devis renvoyé avec succès."}
    except Exception as e:
        err = str(e)
        logger.error(f"Resend resend failed: {err}")
        try:
            await db.quotes.update_one({"id": quote_id}, {"$set": {"email_error": err}})
        except Exception as e2:
            logger.warning(f"Mongo update of error failed: {e2}")
        raise HTTPException(status_code=500, detail=f"Échec de l'envoi: {err}")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

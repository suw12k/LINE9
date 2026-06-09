import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, ArrowRight, ShieldCheck, Loader2, Check } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useToast } from "../hooks/use-toast";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Field = ({ label, hint, required, children }) => (
  <div className="flex flex-col">
    <label className="text-[12px] font-semibold text-[#0F0F0F] mb-2 tracking-tight">
      {label} {required && <span className="text-[#FF3B30]">*</span>}
    </label>
    {children}
    {hint && <p className="mt-2 text-[11px] text-[#0F0F0F]/55 leading-relaxed">{hint}</p>}
  </div>
);

const inputCls =
  "w-full px-4 py-3 bg-white border border-black/10 rounded-2xl text-[14px] text-[#0F0F0F] placeholder:text-[#0F0F0F]/35 focus:outline-none focus:border-[#0F0F0F] focus:ring-2 focus:ring-[#C7F84E] transition-[border-color,box-shadow] duration-200";

const selectCls = inputCls + " appearance-none bg-no-repeat pr-10";
const selectStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%230F0F0F' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
  backgroundPosition: "right 14px center",
  backgroundSize: "14px",
};

const initial = {
  full_name: "",
  email: "",
  phone: "+33 ",
  country: "France",
  need: "",
  budget: "",
  usage: "",
  package: "Premium (+ populaire)",
  wireless: "Aucune (Ethernet)",
  color: "",
  resolution: "",
  case_type: "",
  rgb: "",
  win_edition: "",
  message: "",
  over_18: "",
  cgv_accepted: false,
};

const Devis = () => {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const set = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [k]: v }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.cgv_accepted) {
      toast({ title: "CGV requises", description: "Merci de cocher la case CGV." });
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/quote`, form);
      setSuccess(true);
      toast({
        title: "Demande envoyée !",
        description: data.message || "Vous recevrez une réponse sous 24h.",
      });
      setForm(initial);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      let desc = "Veuillez réessayer dans un instant.";
      if (typeof detail === "string") {
        desc = detail;
      } else if (Array.isArray(detail) && detail.length > 0) {
        // Pydantic validation errors
        const fields = detail
          .map((d) => {
            const field = Array.isArray(d.loc) ? d.loc[d.loc.length - 1] : "champ";
            return `${field}: ${d.msg}`;
          })
          .slice(0, 3)
          .join(" · ");
        desc = `Champs invalides — ${fields}`;
      }
      toast({
        title: "Erreur d'envoi",
        description: desc,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#0F0F0F] selection:bg-[#C7F84E] selection:text-[#0F0F0F]">
      <Header />

      <main className="pt-32 pb-24">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0F0F0F]/60 hover:text-[#0F0F0F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Retour à l&apos;accueil
          </Link>

          <div className="mt-8 text-center">
            <div className="text-[11px] tracking-[0.22em] uppercase font-bold text-[#0F0F0F]/45 mb-4">
              · Devis personnalisé
            </div>
            <h1 className="font-black tracking-[-0.035em] leading-[0.95] text-[48px] sm:text-[72px]">
              Remplissez<br />
              <span className="italic font-light">ce </span>
              <span className="relative inline-block">
                <span className="relative z-10">formulaire.</span>
                <span className="absolute left-0 right-0 bottom-2 h-3 bg-[#C7F84E] z-0" />
              </span>
            </h1>
            <p className="mt-6 text-[14px] text-[#0F0F0F]/65 max-w-xl mx-auto leading-relaxed">
              Merci de ne remplir ce formulaire que <u>lorsque vous êtes prêt à commander</u>.<br />
              Vos informations <span className="text-[#0F0F0F] font-semibold">ne seront pas partagées</span> avec des tiers.
            </p>
          </div>

          {success ? (
            <div className="mt-16 max-w-2xl mx-auto bg-white rounded-3xl border border-black/10 p-10 text-center">
              <div className="w-16 h-16 mx-auto bg-[#C7F84E] rounded-full flex items-center justify-center mb-6">
                <Check className="w-8 h-8 text-[#0F0F0F]" strokeWidth={3} />
              </div>
              <h2 className="text-2xl font-black tracking-tight">Demande envoyée !</h2>
              <p className="mt-3 text-[14px] text-[#0F0F0F]/65 leading-relaxed">
                Merci pour votre confiance. Je reviens vers vous par email sous <strong>24h</strong> avec une configuration personnalisée.
              </p>
              <div className="flex gap-3 justify-center mt-8">
                <button
                  onClick={() => setSuccess(false)}
                  className="px-5 py-3 rounded-full border border-black/15 text-[13px] font-semibold hover:border-black transition-colors"
                >
                  Envoyer une autre demande
                </button>
                <Link
                  to="/"
                  className="px-5 py-3 rounded-full bg-[#0F0F0F] text-white text-[13px] font-semibold hover:bg-[#1a1a1a] transition-colors"
                >
                  Retour à l&apos;accueil
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-16 bg-white rounded-3xl border border-black/[0.08] p-6 sm:p-10 lg:p-14 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.18)]">
              {/* Section: Identité */}
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Nom et Prénom" required>
                  <input type="text" required value={form.full_name} onChange={set("full_name")} placeholder="ex : Jean Dupont" className={inputCls} />
                </Field>
                <Field label="Votre e-mail" required>
                  <input type="email" required value={form.email} onChange={set("email")} placeholder="jean@example.com" className={inputCls} />
                </Field>
                <Field label="Numéro de téléphone" required>
                  <input type="tel" required value={form.phone} onChange={set("phone")} placeholder="+33 6 12 34 56 78" className={inputCls} />
                </Field>
                <Field label="Pays" required>
                  <input type="text" required value={form.country} onChange={set("country")} placeholder="France" className={inputCls} />
                </Field>
              </div>

              {/* Section: Projet */}
              <div className="mt-8 grid grid-cols-1 gap-6">
                <Field label="Votre besoin" required>
                  <input type="text" required value={form.need} onChange={set("need")} placeholder="ex : PC gaming complet avec écran" className={inputCls} />
                </Field>
                <Field label="Budget" required hint="Indiquez votre budget total (PC + périphériques si besoin).">
                  <input type="text" required value={form.budget} onChange={set("budget")} placeholder="MIN 1500€" className={inputCls} />
                </Field>
                <Field label="Votre usage" required hint="Décrivez votre usage précis, les jeux et les applications que vous utiliserez le plus souvent.">
                  <textarea required value={form.usage} onChange={set("usage")} rows={3} placeholder="ex : Valorant, Warzone, Cyberpunk, montage vidéo Premiere Pro..." className={inputCls + " resize-y"} />
                </Field>
              </div>

              {/* Section: Configuration */}
              <div className="mt-8 grid sm:grid-cols-2 gap-6">
                <Field label="Forfait assemblage" required>
                  <select required value={form.package} onChange={set("package")} className={selectCls} style={selectStyle}>
                    <option>Essentiel</option>
                    <option>Premium (+ populaire)</option>
                    <option>Signature (custom poussé)</option>
                  </select>
                </Field>
                <Field label="Connectivité sans-fil" required>
                  <select required value={form.wireless} onChange={set("wireless")} className={selectCls} style={selectStyle}>
                    <option>Aucune (Ethernet)</option>
                    <option>WiFi 6</option>
                    <option>WiFi 6E</option>
                    <option>WiFi 7</option>
                    <option>WiFi + Bluetooth</option>
                  </select>
                </Field>
                <Field label="Couleur" required hint="Indiquez la couleur que vous souhaitez pour le PC.">
                  <select required value={form.color} onChange={set("color")} className={selectCls} style={selectStyle}>
                    <option value="">— Choisir —</option>
                    <option>Noir</option>
                    <option>Blanc</option>
                    <option>Noir & Blanc</option>
                    <option>Autre (préciser dans le message)</option>
                  </select>
                </Field>
                <Field label="Résolution cible" required hint="Il s'agit de la résolution de votre écran final.">
                  <select required value={form.resolution} onChange={set("resolution")} className={selectCls} style={selectStyle}>
                    <option value="">— Choisir —</option>
                    <option>1080p</option>
                    <option>1440p (2K)</option>
                    <option>2160p (4K)</option>
                    <option>Ultrawide 1440p</option>
                    <option>Ultrawide 4K</option>
                  </select>
                </Field>
                <Field label="Boitier" required hint="Les boitiers mesh sont en général plus performants et moins chers.">
                  <select required value={form.case_type} onChange={set("case_type")} className={selectCls} style={selectStyle}>
                    <option value="">— Choisir —</option>
                    <option>Mesh (meilleur airflow)</option>
                    <option>Verre trempé (esthétique)</option>
                    <option>Panoramique / Vitré</option>
                    <option>ITX (compact)</option>
                    <option>Au choix de l&apos;assembleur</option>
                  </select>
                </Field>
                <Field label="Avec RGB ?" required hint="Il s'agit du rétroéclairage des composants.">
                  <select required value={form.rgb} onChange={set("rgb")} className={selectCls} style={selectStyle}>
                    <option value="">— Choisir —</option>
                    <option>Oui, full RGB</option>
                    <option>Un peu (ventilos seulement)</option>
                    <option>Non, sobre</option>
                  </select>
                </Field>
                <Field label="Édition Win11" required hint="Pour un usage basique ou gaming, l'édition famille est adaptée.">
                  <select required value={form.win_edition} onChange={set("win_edition")} className={selectCls} style={selectStyle}>
                    <option value="">— Choisir —</option>
                    <option>Famille</option>
                    <option>Pro</option>
                    <option>Aucune (je l&apos;ai déjà)</option>
                  </select>
                </Field>
                <Field label="Avez-vous plus de 18 ans ?" required>
                  <select required value={form.over_18} onChange={set("over_18")} className={selectCls} style={selectStyle}>
                    <option value="">— Choisir —</option>
                    <option>Oui</option>
                    <option>Non (accord parental requis)</option>
                  </select>
                </Field>
              </div>

              {/* Message */}
              <div className="mt-8">
                <Field label="Votre message" required>
                  <textarea required value={form.message} onChange={set("message")} rows={5} placeholder="Détaillez votre demande, vos préférences de marques, vos contraintes particulières..." className={inputCls + " resize-y"} />
                </Field>
              </div>

              {/* CGV */}
              <div className="mt-8 flex items-start gap-3 p-4 rounded-2xl bg-[#F2F2EE]">
                <input
                  type="checkbox"
                  id="cgv"
                  required
                  checked={form.cgv_accepted}
                  onChange={set("cgv_accepted")}
                  className="mt-1 w-4 h-4 accent-[#0F0F0F] cursor-pointer"
                />
                <label htmlFor="cgv" className="text-[12px] text-[#0F0F0F]/70 leading-relaxed cursor-pointer">
                  J&apos;ai vérifié que toutes les informations sont correctes et j&apos;ai pris connaissance des Conditions Générales de Vente et de la Politique de Confidentialité.
                </label>
              </div>

              {/* Submit */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 text-[12px] text-[#0F0F0F]/55">
                  <ShieldCheck className="w-4 h-4" /> Données protégées · Réponse sous 24h
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex items-center gap-3 bg-[#0F0F0F] text-white text-[14px] font-semibold pl-6 pr-2 py-2 rounded-full hover:bg-[#1a1a1a] disabled:opacity-60 transition-colors duration-200"
                >
                  {loading ? "Envoi en cours..." : "Demander mon devis personnalisé"}
                  <span className="w-10 h-10 rounded-full bg-[#C7F84E] flex items-center justify-center text-[#0F0F0F] transition-transform duration-300 group-hover:rotate-45">
                    {loading ? (
                      <Loader2 className="w-[18px] h-[18px] animate-spin" strokeWidth={2.5} />
                    ) : (
                      <ArrowRight className="w-[18px] h-[18px]" strokeWidth={2.5} />
                    )}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Devis;

import React from "react";
import { Link } from "react-router-dom";
import { Check, ArrowUpRight, Sparkles, Shield, Truck } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const formulas = [
  {
    id: "essentiel",
    name: "ESSENTIEL",
    tagline: "Pour démarrer simple & propre",
    price: 119,
    accent: "#0F0F0F",
    highlight: false,
    features: [
      "Conseil composants sur mesure",
      "Montage soigné à la main",
      "Installation Windows 11",
      "Pilotes & mises à jour à jour",
      "Activation XMP / EXPO mémoire",
      "Tests de stabilité 24h",
    ],
  },
  {
    id: "signature",
    name: "SIGNATURE",
    tagline: "Le meilleur rapport soin / tarif",
    price: 179,
    accent: "#C7F84E",
    highlight: true,
    badge: "+ POPULAIRE",
    features: [
      "Tout ce qui est dans Essentiel",
      "Montage prioritaire sous 5 jours",
      "Cable management propre (atelier signé)",
      "Mise à jour BIOS dernière version",
      "Optimisation Windows (services, perfs)",
      "Tests benchmarks (Cinebench + 3DMark)",
      "Photos HD personnalisées du build",
    ],
  },
  {
    id: "atelier",
    name: "ATELIER",
    tagline: "L'expérience LINE9 complète",
    price: 259,
    accent: "#0F0F0F",
    highlight: false,
    features: [
      "Tout ce qui est dans Signature",
      "Courbe de ventilation custom (silence)",
      "Undervolt CPU & GPU stable & efficient",
      "Logiciels pré-installés (Steam, Discord…)",
      "1 an d'assistance technique prioritaire",
      "Garantie étendue 3 ans",
      "Coffret LINE9 + sticker collector",
    ],
  },
];

const FormulaCard = ({ f }) => {
  const isHl = f.highlight;
  return (
    <article
      className={`relative rounded-3xl p-8 lg:p-9 flex flex-col transition-all duration-300 ${
        isHl
          ? "bg-[#0F0F0F] text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)] lg:-translate-y-4"
          : "bg-white text-[#0F0F0F] border border-black/[0.08] hover:border-black/20"
      }`}
    >
      {/* Badge */}
      {isHl && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-[#C7F84E] text-[#0F0F0F] text-[10px] tracking-[0.22em] uppercase font-black px-3 py-1.5 rounded-full">
          <Sparkles className="w-3 h-3" strokeWidth={2.5} />
          {f.badge}
        </div>
      )}

      {/* Header */}
      <div>
        <div className={`text-[11px] tracking-[0.22em] uppercase font-bold ${isHl ? "text-[#C7F84E]" : "text-[#0F0F0F]/45"}`}>
          {f.name}
        </div>
        <div className={`mt-2 text-[14px] ${isHl ? "text-white/65" : "text-[#0F0F0F]/55"}`}>
          {f.tagline}
        </div>
      </div>

      {/* Price */}
      <div className="mt-7 flex items-baseline gap-2">
        <span className={`text-[64px] sm:text-[72px] font-black tracking-[-0.04em] leading-none ${isHl ? "text-white" : "text-[#0F0F0F]"}`}>
          {f.price}
        </span>
        <span className={`text-2xl font-black ${isHl ? "text-white" : "text-[#0F0F0F]"}`}>€</span>
        <span className={`text-[12px] ml-1 ${isHl ? "text-white/45" : "text-[#0F0F0F]/45"}`}>
          + frais de port
        </span>
      </div>
      <p className={`text-[11px] uppercase tracking-[0.16em] font-bold mt-2 ${isHl ? "text-white/45" : "text-[#0F0F0F]/45"}`}>
        Tarif main d&apos;œuvre · composants non inclus
      </p>

      {/* CTA */}
      <Link
        to="/devis"
        className={`mt-7 group inline-flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-[14px] transition-colors ${
          isHl
            ? "bg-[#C7F84E] text-[#0F0F0F] hover:brightness-95"
            : "bg-[#0F0F0F] text-white hover:bg-[#1a1a1a]"
        }`}
      >
        Demander un devis
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" strokeWidth={2.5} />
      </Link>

      {/* Features */}
      <ul className={`mt-8 pt-7 border-t flex-1 space-y-3.5 ${isHl ? "border-white/10" : "border-black/[0.06]"}`}>
        {f.features.map((feat) => (
          <li key={feat} className="flex items-start gap-3 text-[13px] leading-snug">
            <span
              className={`shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center ${
                isHl ? "bg-[#C7F84E]" : "bg-[#0F0F0F]"
              }`}
            >
              <Check className={`w-2.5 h-2.5 ${isHl ? "text-[#0F0F0F]" : "text-[#C7F84E]"}`} strokeWidth={4} />
            </span>
            <span className={isHl ? "text-white/85" : "text-[#0F0F0F]/80"}>
              {feat}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
};

const PcSurMesure = () => {
  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#0F0F0F] selection:bg-[#C7F84E] selection:text-[#0F0F0F]">
      <Header />

      <main className="pt-32 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {/* Intro */}
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.22em] uppercase font-bold text-[#0F0F0F]/45 mb-4">
              · PC sur mesure
            </div>
            <h1 className="font-black tracking-[-0.035em] leading-[0.95] text-[48px] sm:text-[80px]">
              3 formules,<br />
              <span className="italic font-light">une seule </span>
              <span className="relative inline-block">
                <span className="relative z-10">obsession.</span>
                <span className="absolute left-0 right-0 bottom-2 h-3 bg-[#C7F84E] z-0" />
              </span>
            </h1>
            <p className="mt-6 text-[15px] text-[#0F0F0F]/65 leading-relaxed max-w-2xl">
              Que vous arriviez avec vos composants ou que je vous accompagne dès le choix,
              je m&apos;occupe de tout. Trois niveaux de soin pour matcher avec votre besoin.
            </p>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 bg-white border border-black/10 px-4 py-2 rounded-full text-[12px] font-semibold text-[#0F0F0F]">
              <Shield className="w-3.5 h-3.5" /> Garantie 2 à 3 ans
            </span>
            <span className="inline-flex items-center gap-2 bg-white border border-black/10 px-4 py-2 rounded-full text-[12px] font-semibold text-[#0F0F0F]">
              <Truck className="w-3.5 h-3.5" /> Livraison France entière
            </span>
            <span className="inline-flex items-center gap-2 bg-white border border-black/10 px-4 py-2 rounded-full text-[12px] font-semibold text-[#0F0F0F]">
              <Sparkles className="w-3.5 h-3.5" /> Devis sous 24h
            </span>
          </div>

          {/* Pricing grid */}
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7">
            {formulas.map((f) => (
              <FormulaCard key={f.id} f={f} />
            ))}
          </div>

          {/* FAQ / Footnote */}
          <div className="mt-20 bg-white rounded-3xl border border-black/[0.06] p-8 lg:p-10 grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Composants non inclus",
                body: "Les tarifs ci-dessus couvrent la main d'œuvre et les services. Vous pouvez fournir les pièces, ou je vous établis un devis complet avec composants.",
              },
              {
                title: "Vous fournissez les pièces ?",
                body: "Pas de souci. Je vérifie la compatibilité en amont, je teste chaque composant à réception, et j'assemble selon la formule choisie.",
              },
              {
                title: "Service après-vente",
                body: "Chaque PC est testé 72h en charge avant départ. En cas de panne, je vous accompagne pour le diagnostic et le retour SAV des composants.",
              },
            ].map((f) => (
              <div key={f.title}>
                <h3 className="text-[15px] font-bold text-[#0F0F0F] tracking-tight">{f.title}</h3>
                <p className="mt-2 text-[13px] text-[#0F0F0F]/65 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>

          {/* Final CTA band */}
          <div className="mt-10 relative rounded-3xl bg-[#0F0F0F] text-white p-8 lg:p-12 overflow-hidden">
            <div
              aria-hidden
              className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-[#C7F84E]/15 blur-3xl"
            />
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="text-[11px] tracking-[0.22em] uppercase font-bold text-[#C7F84E] mb-3">
                  · Prêt à passer commande ?
                </div>
                <h2 className="font-black tracking-[-0.025em] leading-tight text-[28px] sm:text-[40px]">
                  Un devis détaillé sous 24h.<br />
                  <span className="italic font-light text-white/65">Sans engagement.</span>
                </h2>
              </div>
              <Link
                to="/devis"
                className="group inline-flex items-center gap-3 bg-[#C7F84E] text-[#0F0F0F] text-[14px] font-bold pl-6 pr-2 py-2 rounded-full hover:brightness-95 transition-[filter]"
              >
                Démarrer mon projet
                <span className="w-10 h-10 rounded-full bg-[#0F0F0F] flex items-center justify-center text-[#C7F84E] transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="w-[18px] h-[18px]" strokeWidth={2.5} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PcSurMesure;

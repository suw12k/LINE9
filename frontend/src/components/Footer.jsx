import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, Instagram, Youtube, Twitter } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast({ title: "Email invalide", description: "Veuillez entrer un email valide." });
      return;
    }
    toast({
      title: "Inscription confirmée !",
      description: "Vous recevrez notre prochaine édition très bientôt."
    });
    setEmail("");
  };

  return (
    <section className="py-24 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="relative bg-[#C7F84E] rounded-[36px] p-10 lg:p-16 overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.5] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }}
          />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-[11px] tracking-[0.22em] uppercase font-bold text-[#0F0F0F]/65 mb-4 inline-flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                Newsletter mensuelle
              </div>
              <h2 className="font-black text-[#0F0F0F] tracking-[-0.035em] leading-[0.95] text-[40px] sm:text-[54px]">
                Les bons plans hardware,<br />
                <span className="italic font-light">sans le </span>spam.
              </h2>
              <p className="mt-4 text-[#0F0F0F]/70 text-[15px] max-w-md">
                Une seule édition par mois. Tests exclusifs, promos, et nos dernières configurations en avant-première.
              </p>
            </div>
            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 bg-white rounded-full p-2 border border-black/10">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.fr"
                className="flex-1 px-5 py-3 bg-transparent text-[#0F0F0F] placeholder:text-[#0F0F0F]/40 text-[15px] focus:outline-none"
              />
              <button type="submit" className="inline-flex items-center justify-center gap-2 bg-[#0F0F0F] text-white px-6 py-3 rounded-full font-semibold text-[14px] hover:bg-[#1a1a1a] transition-colors">
                S'inscrire
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#0F0F0F] text-white pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[#C7F84E] rounded-[10px] flex items-center justify-center">
                <span className="text-[#0F0F0F] font-black text-lg leading-none">N</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-black text-[17px]">NEXUS</span>
                <span className="text-[10px] text-white/55 tracking-[0.18em] mt-0.5">HARDWARE</span>
              </div>
            </Link>
            <p className="text-white/55 text-[14px] leading-relaxed max-w-sm">
              Constructeur indépendant de PC premium assemblés à la main en Normandie. Livraison France & UE.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Instagram, Youtube, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-[#C7F84E] hover:border-[#C7F84E] hover:text-[#0F0F0F] transition-colors" aria-label="social">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Boutique", links: ["PC RTX 5090", "PC RTX 5080", "PC AMD", "Périphériques"] },
            { title: "Services", links: ["Montage Custom", "Dépannage", "Cybersécurité", "Impression 3D"] },
            { title: "Entreprise", links: ["À propos", "Avis clients", "Contact", "Mentions légales"] }
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] tracking-[0.22em] uppercase font-bold text-white/45 mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-[14px] text-white/80 hover:text-[#C7F84E] transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[12px] text-white/45">
          <div>© 2026 NEXUS Hardware. Tous droits réservés.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">CGV</a>
            <a href="#" className="hover:text-white">Confidentialité</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Newsletter };
export default Footer;

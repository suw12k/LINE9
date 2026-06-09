import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, Instagram, Youtube, Twitter } from "lucide-react";
import { useToast } from "../hooks/use-toast";

// Discord brand icon (lucide-react doesn't provide one)
const DiscordIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.42 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.42 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

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
                S&apos;inscrire
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
                <span className="text-[#0F0F0F] font-black text-lg leading-none">L9</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-black text-[17px]">LINE9</span>
                <span className="text-[10px] text-white/55 tracking-[0.18em] mt-0.5">HARDWARE</span>
              </div>
            </Link>
            <p className="text-white/55 text-[14px] leading-relaxed max-w-sm">
              LINE9 c&apos;est <span className="text-white font-semibold">Laszlo</span>, assembleur indépendant de PC sur mesure, montés à la main en Île-de-France. Builds testés, validés, livrés.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Youtube, href: "#", label: "Youtube" },
                { Icon: Twitter, href: "#", label: "Twitter" },
                { Icon: DiscordIcon, href: "https://discord.gg/83hCPfE2Z", label: "Discord" }
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-[#C7F84E] hover:border-[#C7F84E] hover:text-[#0F0F0F] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Réalisations", links: ["Tous les builds", "Builds blanc", "Builds RGB", "Watercooling"] },
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
          <div>© 2026 LINE9. Tous droits réservés.</div>
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

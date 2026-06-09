import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { configs } from "../configs";

const Configs = () => {
  const [active, setActive] = useState(configs[0].id);

  // Scrollspy: highlight sidebar item matching the current viewport section
  useEffect(() => {
    const handler = () => {
      const offset = 220; // top offset before considering section "active"
      let current = configs[0].id;
      for (const c of configs) {
        const el = document.getElementById(`config-${c.id}`);
        if (el && el.getBoundingClientRect().top - offset <= 0) {
          current = c.id;
        }
      }
      setActive(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#0F0F0F] selection:bg-[#C7F84E] selection:text-[#0F0F0F]">
      <Header />

      <main className="pt-32 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {/* Intro */}
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.22em] uppercase font-bold text-[#0F0F0F]/45 mb-4">
              · Configurations recommandées
            </div>
            <h1 className="font-black tracking-[-0.035em] leading-[0.95] text-[48px] sm:text-[72px]">
              3 builds<br />
              <span className="italic font-light">soigneusement </span>
              <span className="relative inline-block">
                <span className="relative z-10">sélectionnés.</span>
                <span className="absolute left-0 right-0 bottom-2 h-3 bg-[#C7F84E] z-0" />
              </span>
            </h1>
            <p className="mt-6 text-[15px] text-[#0F0F0F]/65 leading-relaxed max-w-2xl">
              Pas envie d&apos;un devis personnalisé ? Voici 3 configurations clés en main que je recommande,
              testées et validées. Cliquez sur chaque composant pour aller voir la fiche produit.
            </p>
          </div>

          {/* Layout: sidebar + content */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10 lg:gap-16">
            {/* Sidebar */}
            <aside className="lg:sticky lg:top-28 self-start">
              <div className="text-[11px] tracking-[0.22em] uppercase font-bold text-[#0F0F0F]/45 mb-5">
                Budgets
              </div>
              <nav className="flex lg:flex-col gap-2 lg:gap-1 overflow-x-auto lg:overflow-visible -mx-1 px-1">
                {configs.map((c) => {
                  const isActive = active === c.id;
                  return (
                    <a
                      key={c.id}
                      href={`#config-${c.id}`}
                      className={`relative shrink-0 lg:shrink py-3 px-4 rounded-2xl text-[14px] font-semibold transition-all duration-300 ${
                        isActive
                          ? "bg-[#0F0F0F] text-white"
                          : "bg-transparent text-[#0F0F0F]/55 hover:text-[#0F0F0F] hover:bg-black/[0.04]"
                      }`}
                    >
                      <span className="block text-[18px] font-black tracking-tight leading-none">
                        {c.budget}
                      </span>
                      <span className={`block text-[10px] uppercase tracking-[0.18em] mt-1.5 font-bold ${
                        isActive ? "text-[#C7F84E]" : "text-[#0F0F0F]/45"
                      }`}>
                        {c.tagline.split("—")[0].trim()}
                      </span>
                    </a>
                  );
                })}
              </nav>

              <Link
                to="/devis"
                className="mt-6 hidden lg:inline-flex items-center gap-2 text-[12px] font-semibold text-[#0F0F0F] px-4 py-2.5 rounded-full border border-black/15 hover:border-black hover:bg-[#0F0F0F] hover:text-white transition-colors duration-200"
              >
                Devis sur mesure
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </aside>

            {/* Content */}
            <div className="flex flex-col gap-20">
              {configs.map((c, idx) => (
                <section
                  key={c.id}
                  id={`config-${c.id}`}
                  className="scroll-mt-28"
                >
                  {/* Section header */}
                  <div className="flex items-baseline gap-6 flex-wrap pb-6 border-b-2 border-[#0F0F0F]">
                    <span className="text-[11px] font-mono text-[#0F0F0F]/45 font-bold tabular-nums">
                      0{idx + 1}
                    </span>
                    <h2 className="font-black tracking-[-0.035em] text-[56px] sm:text-[80px] leading-[0.9]">
                      {c.budget}
                    </h2>
                    <span className="ml-auto text-[12px] tracking-[0.18em] uppercase font-bold text-[#0F0F0F]/55">
                      {c.tagline}
                    </span>
                  </div>
                  <p className="mt-5 text-[14px] text-[#0F0F0F]/65 leading-relaxed max-w-2xl">
                    {c.description}
                  </p>

                  {/* Components list */}
                  <ul className="mt-8 bg-white rounded-3xl border border-black/[0.08] overflow-hidden">
                    {c.components.map((comp, i) => (
                      <li
                        key={comp.type}
                        className={`group ${i !== 0 ? "border-t border-black/[0.06]" : ""}`}
                      >
                        <a
                          href={comp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-5 px-6 py-5 hover:bg-[#C7F84E]/15 transition-colors duration-200"
                        >
                          <span className="text-[11px] tracking-[0.18em] uppercase font-bold text-[#0F0F0F]/65 w-[180px] shrink-0">
                            {comp.type}
                          </span>
                          <span className="flex-1 text-[14px] sm:text-[15px] text-[#0F0F0F] font-medium group-hover:text-[#0F0F0F]">
                            {comp.name}
                          </span>
                          <span className="shrink-0 w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-[#0F0F0F]/55 group-hover:bg-[#0F0F0F] group-hover:text-[#C7F84E] group-hover:border-[#0F0F0F] transition-colors duration-200">
                            <ExternalLink className="w-4 h-4" />
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>

                  {/* CTA per config */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#0F0F0F] text-white">
                    <div className="text-[13px] text-white/75 leading-relaxed">
                      Cette config vous intéresse ? Je peux la monter et la livrer chez vous.
                    </div>
                    <Link
                      to="/devis"
                      className="group inline-flex items-center gap-2 bg-[#C7F84E] text-[#0F0F0F] text-[13px] font-bold px-5 py-2.5 rounded-full hover:brightness-95 transition-[filter]"
                    >
                      Demander un devis
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" strokeWidth={2.5} />
                    </Link>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Configs;

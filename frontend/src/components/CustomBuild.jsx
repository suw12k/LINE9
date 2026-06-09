import React, { useState } from "react";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import { Link } from "react-router-dom";

const CustomBuild = () => {
  const [budget, setBudget] = useState(2000);
  const [usage, setUsage] = useState("Gaming");
  const usages = ["Gaming", "Création", "Bureautique", "Streaming"];

  const reco = budget < 1200
    ? { name: "CONFIG ESSENTIELLE", desc: "Bon GPU milieu de gamme · CPU 6 cœurs" }
    : budget < 2000
      ? { name: "CONFIG ÉQUILIBRÉE", desc: "GPU performant · CPU récent · DDR5" }
      : budget < 3000
        ? { name: "CONFIG HAUT DE GAMME", desc: "GPU enthusiast · CPU X3D · 32Go DDR5" }
        : { name: "CONFIG EXTRÊME", desc: "Le top du top, sans concession" };

  return (
    <section id="custom" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <div className="text-[11px] tracking-[0.22em] uppercase font-bold text-[#0F0F0F]/45 mb-4">
              · Configurateur
            </div>
            <h2 className="font-black text-[#0F0F0F] tracking-[-0.035em] leading-[0.95] text-[44px] sm:text-[64px]">
              Votre PC<br />
              <span className="italic font-light">idéal en </span>
              <span className="relative inline-block">
                <span className="relative z-10">30 sec.</span>
                <span className="absolute left-0 right-0 bottom-1 h-3 bg-[#C7F84E] z-0" />
              </span>
            </h2>

            <p className="mt-6 text-[15px] leading-relaxed text-[#0F0F0F]/65 max-w-md">
              Déplacez le curseur, choisissez votre usage. Nous vous proposons
              la configuration la plus pertinente, sans bullshit marketing.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Devis gratuit sous 24h",
                "Composants premium uniquement (pas de stock douteux)",
                "Tests de stabilité 72h avant expédition",
                "Garantie pièces et main d'œuvre 2 ans"
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-[14px] text-[#0F0F0F]/80">
                  <span className="w-5 h-5 rounded-full bg-[#0F0F0F] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#C7F84E]" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Interactive widget */}
          <div className="relative">
            <div className="relative bg-white rounded-3xl border border-black/10 p-8 lg:p-10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.18)]">
              <div className="flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-bold text-[#0F0F0F]/45">
                <Sparkles className="w-3.5 h-3.5" />
                Recommandation instantanée
              </div>

              {/* Budget */}
              <div className="mt-7">
                <div className="flex items-baseline justify-between">
                  <label className="text-[13px] font-semibold text-[#0F0F0F]">Budget</label>
                  <span className="text-2xl font-black text-[#0F0F0F]">
                    {budget.toLocaleString("fr-FR")}<span className="text-base font-bold">€</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="900"
                  max="7000"
                  step="50"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full mt-4 nexus-range"
                />
                <div className="flex justify-between text-[11px] text-[#0F0F0F]/45 font-medium mt-2">
                  <span>900€</span>
                  <span>7000€</span>
                </div>
              </div>

              {/* Usage */}
              <div className="mt-8">
                <label className="text-[13px] font-semibold text-[#0F0F0F] block mb-3">
                  Usage principal
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {usages.map((u) => (
                    <button
                      key={u}
                      onClick={() => setUsage(u)}
                      className={`px-4 py-3 rounded-2xl text-[13px] font-semibold transition-all duration-200 ${
                        usage === u
                          ? "bg-[#0F0F0F] text-white"
                          : "bg-[#F2F2EE] text-[#0F0F0F]/70 hover:bg-[#E8E8E4]"
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reco */}
              <div className="mt-8 p-5 bg-[#0F0F0F] rounded-2xl text-white">
                <div className="text-[10px] tracking-[0.22em] uppercase text-[#C7F84E] font-bold">
                  Pour vous
                </div>
                <div className="text-xl font-black mt-1.5">{reco.name}</div>
                <div className="text-white/55 text-[12px] mt-1">
                  {reco.desc}
                </div>
                <Link
                  to="/devis"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-[#C7F84E] text-[#0F0F0F] text-[13px] font-bold py-3 rounded-full hover:brightness-95 transition-[filter]"
                >
                  Demander un devis gratuit
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomBuild;

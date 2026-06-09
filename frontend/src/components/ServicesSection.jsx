import React from "react";
import { Wrench, LifeBuoy, Shield, Box, Monitor, Settings, ArrowUpRight } from "lucide-react";
import { services } from "../mock";

const iconMap = { Wrench, LifeBuoy, Shield, Box, Monitor, Settings };

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 lg:py-32 bg-[#0F0F0F] text-white relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "56px 56px"
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="text-[11px] tracking-[0.22em] uppercase font-bold text-[#C7F84E] mb-4">
              · Au-delà du matériel
            </div>
            <h2 className="font-black tracking-[-0.035em] leading-[0.95] text-[44px] sm:text-[64px]">
              Six manières<br />
              <span className="italic font-light text-white/60">de vous </span>
              accompagner.
            </h2>
          </div>
          <p className="text-white/55 max-w-sm text-[15px] leading-relaxed">
            De la première idée à la maintenance de longue durée, nos experts
            certifiés sont là à chaque étape. Sans jargon, sans surprise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-3xl overflow-hidden">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] || Wrench;
            return (
              <div
                key={s.id}
                className="group bg-[#0F0F0F] p-8 lg:p-10 relative hover:bg-[#161616] transition-colors duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-12">
                  <div className="w-12 h-12 rounded-2xl border border-white/15 flex items-center justify-center group-hover:border-[#C7F84E] group-hover:bg-[#C7F84E]/10 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-white group-hover:text-[#C7F84E] transition-colors" strokeWidth={1.75} />
                  </div>
                  <span className="text-white/30 text-[11px] font-mono tabular-nums">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 tracking-tight">{s.title}</h3>
                <p className="text-white/55 text-[14px] leading-relaxed mb-8">
                  {s.desc}
                </p>

                <button className="inline-flex items-center gap-2 text-[13px] font-semibold text-white group-hover:text-[#C7F84E] transition-colors">
                  {s.cta}
                  <ArrowUpRight
                    className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45"
                    strokeWidth={2.5}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

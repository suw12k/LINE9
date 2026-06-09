import React from "react";
import { ArrowUpRight, Cpu, MemoryStick, HardDrive, MonitorSmartphone } from "lucide-react";
import { featuredPCs } from "../mock";

const PCCard = ({ pc, index }) => {
  return (
    <article className="group relative bg-white rounded-3xl border border-black/[0.06] overflow-hidden hover:border-black/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.18)]">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#0F0F0F]">
        <img
          src={pc.image}
          alt={pc.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] tracking-[0.16em] font-bold uppercase"
          style={{ backgroundColor: pc.color, color: "#0F0F0F" }}
        >
          {pc.tag}
        </div>
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[11px] font-mono font-bold text-[#0F0F0F]">
          0{index + 1}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="text-[10px] tracking-[0.2em] uppercase text-[#0F0F0F]/45 font-bold">
          {pc.series}
        </div>
        <h3 className="text-xl font-black text-[#0F0F0F] mt-1 tracking-tight">
          {pc.name}
        </h3>

        {/* Specs grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mt-5">
          <div className="flex items-center gap-2 text-[12px] text-[#0F0F0F]/70">
            <MonitorSmartphone className="w-3.5 h-3.5 text-[#0F0F0F]/40" />
            <span className="truncate">{pc.gpu}</span>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-[#0F0F0F]/70">
            <Cpu className="w-3.5 h-3.5 text-[#0F0F0F]/40" />
            <span className="truncate">{pc.cpu}</span>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-[#0F0F0F]/70">
            <MemoryStick className="w-3.5 h-3.5 text-[#0F0F0F]/40" />
            <span className="truncate">{pc.ram}</span>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-[#0F0F0F]/70">
            <HardDrive className="w-3.5 h-3.5 text-[#0F0F0F]/40" />
            <span className="truncate">{pc.storage}</span>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-black/[0.06] flex items-center justify-between">
          <span className="text-[12px] text-[#0F0F0F]/55 font-medium">
            Configuration personnalisée
          </span>
          <span className="w-9 h-9 rounded-full bg-[#0F0F0F] text-[#C7F84E] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </article>
  );
};

const FeaturedPCs = () => {
  return (
    <section id="shop" className="py-24 lg:py-32 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="text-[11px] tracking-[0.22em] uppercase font-bold text-[#0F0F0F]/45 mb-4">
              · Mes réalisations
            </div>
            <h2 className="font-black text-[#0F0F0F] tracking-[-0.035em] leading-[0.95] text-[44px] sm:text-[64px]">
              Les PC que j&apos;ai<br />
              <span className="italic font-light">assemblés &amp; </span>
              <span className="relative inline-block">
                <span className="relative z-10">configurés.</span>
                <span className="absolute left-0 right-0 bottom-2 h-3 bg-[#C7F84E] z-0" />
              </span>
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-[#0F0F0F]/65 max-w-xl">
              Chaque machine est pensée, montée et testée à la main.
              Voici un aperçu de quelques configurations sorties de l&apos;atelier.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPCs.map((pc, i) => (
            <PCCard key={pc.id} pc={pc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPCs;

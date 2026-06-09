import React, { useState } from "react";
import { ArrowUpRight, Cpu, MemoryStick, HardDrive, MonitorSmartphone } from "lucide-react";
import { featuredPCs } from "../mock";
import { useToast } from "../hooks/use-toast";

const PCCard = ({ pc }) => {
  const { toast } = useToast();

  const handleAdd = () => {
    toast({
      title: "Ajouté au panier",
      description: `${pc.name} — ${pc.price.toLocaleString("fr-FR")} €`
    });
  };

  return (
    <article className="group relative bg-white rounded-3xl border border-black/[0.06] overflow-hidden hover:border-black/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.18)]">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F2F2EE]">
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
        <button
          aria-label="Voir"
          className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white text-[#0F0F0F] flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-[opacity,transform] duration-300"
        >
          <ArrowUpRight className="w-[18px] h-[18px]" strokeWidth={2.5} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-[#0F0F0F]/45 font-bold">
              {pc.series}
            </div>
            <h3 className="text-xl font-black text-[#0F0F0F] mt-1 tracking-tight">
              {pc.name}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[10px] tracking-[0.16em] uppercase text-[#0F0F0F]/45 font-bold">
              à partir de
            </div>
            <div className="text-xl font-black text-[#0F0F0F]">
              {pc.price.toLocaleString("fr-FR")}€
            </div>
          </div>
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mt-5">
          <div className="flex items-center gap-2 text-[12px] text-[#0F0F0F]/70">
            <MonitorSmartphone className="w-3.5 h-3.5 text-[#0F0F0F]/40" />
            <span className="truncate">{pc.gpu.split(" ").slice(0, 3).join(" ")}</span>
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

        <button
          onClick={handleAdd}
          className="mt-6 w-full bg-[#0F0F0F] text-white text-[13px] font-semibold py-3 rounded-full hover:bg-[#1a1a1a] transition-colors"
        >
          Configurer & commander
        </button>
      </div>
    </article>
  );
};

const FeaturedPCs = () => {
  const [filter, setFilter] = useState("Tous");
  const filters = ["Tous", "RTX 5090", "RTX 5080", "RTX 5070", "AMD"];

  const filtered = featuredPCs.filter((p) => {
    if (filter === "Tous") return true;
    if (filter === "AMD") return p.series.startsWith("RX");
    return p.series.includes(filter);
  });

  return (
    <section id="shop" className="py-24 lg:py-32 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="text-[11px] tracking-[0.22em] uppercase font-bold text-[#0F0F0F]/45 mb-4">
              · La collection
            </div>
            <h2 className="font-black text-[#0F0F0F] tracking-[-0.035em] leading-[0.95] text-[44px] sm:text-[64px]">
              Des machines<br />
              <span className="italic font-light">construites une </span>
              <span className="relative inline-block">
                <span className="relative z-10">par une.</span>
                <span className="absolute left-0 right-0 bottom-2 h-3 bg-[#C7F84E] z-0" />
              </span>
            </h2>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all duration-200 ${
                  filter === f
                    ? "bg-[#0F0F0F] text-white"
                    : "bg-white text-[#0F0F0F]/70 border border-black/10 hover:border-black/30"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pc) => (
            <PCCard key={pc.id} pc={pc} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#0F0F0F]/50">
            Aucune configuration ne correspond à ce filtre.
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPCs;

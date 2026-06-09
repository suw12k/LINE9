import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";
import { articles } from "../mock";

const Magazine = () => {
  const [main, ...rest] = articles;
  return (
    <section id="magazine" className="py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="text-[11px] tracking-[0.22em] uppercase font-bold text-[#0F0F0F]/45 mb-4">
              · Magazine
            </div>
            <h2 className="font-black text-[#0F0F0F] tracking-[-0.035em] leading-[0.95] text-[44px] sm:text-[64px]">
              L'actu hardware,<br />
              <span className="italic font-light">décryptée </span>sans filtre.
            </h2>
          </div>
          <Link
            to="/devis"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#0F0F0F] px-6 py-3 rounded-full border border-black/15 hover:border-black hover:bg-[#0F0F0F] hover:text-white transition-colors duration-200"
          >
            Demander un devis
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Main article */}
          <article className="group relative rounded-3xl overflow-hidden bg-white border border-black/[0.06] hover:border-black/20 transition-colors duration-300">
            <div className="aspect-[16/11] overflow-hidden bg-[#F2F2EE]">
              <img src={main.image} alt={main.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] font-bold text-[#0F0F0F]/55">
                <span className="bg-[#C7F84E] text-[#0F0F0F] px-2.5 py-1 rounded-full">{main.category}</span>
                <span>{main.date}</span>
                <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{main.readTime}</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-black text-[#0F0F0F] tracking-tight mt-4 leading-tight group-hover:underline decoration-2 underline-offset-4">
                {main.title}
              </h3>
              <p className="text-[#0F0F0F]/65 text-[15px] leading-relaxed mt-3">{main.excerpt}</p>
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-black/[0.06]">
                <span className="text-[13px] text-[#0F0F0F]/55">Par {main.author}</span>
                <span className="w-10 h-10 rounded-full bg-[#0F0F0F] text-[#C7F84E] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                </span>
              </div>
            </div>
          </article>

          {/* Right list */}
          <div className="flex flex-col gap-6">
            {rest.map((a) => (
              <article key={a.id} className="group flex gap-5 bg-white rounded-3xl border border-black/[0.06] hover:border-black/20 p-4 transition-colors duration-300">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden bg-[#F2F2EE] shrink-0">
                  <img src={a.image} alt={a.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] font-bold text-[#0F0F0F]/55">
                      <span className="bg-[#F2F2EE] text-[#0F0F0F] px-2 py-0.5 rounded-full">{a.category}</span>
                      <span>·</span>
                      <span>{a.date}</span>
                    </div>
                    <h4 className="font-bold text-[#0F0F0F] mt-2 text-[17px] leading-snug tracking-tight group-hover:underline decoration-2 underline-offset-4">
                      {a.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between text-[12px] text-[#0F0F0F]/50">
                    <span>{a.author}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{a.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Magazine;

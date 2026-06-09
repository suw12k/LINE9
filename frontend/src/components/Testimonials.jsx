import React, { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import { testimonials } from "../mock";

const Testimonials = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((v) => (v + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);

  const current = testimonials[active];

  return (
    <section className="py-24 lg:py-32 bg-[#F2F2EE] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="text-[11px] tracking-[0.22em] uppercase font-bold text-[#0F0F0F]/45 mb-4">
              · Avis clients
            </div>
            <h2 className="font-black text-[#0F0F0F] tracking-[-0.035em] leading-[0.95] text-[44px] sm:text-[58px]">
              160+ clients,<br />
              <span className="italic font-light">aucun </span>
              regret.
            </h2>
            <div className="flex items-center gap-1 mt-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#0F0F0F] fill-[#C7F84E]" />
              ))}
              <span className="ml-3 text-[14px] font-semibold text-[#0F0F0F]">
                5.0/5 · +160 avis
              </span>
            </div>

            {/* Dots */}
            <div className="flex gap-2 mt-10">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActive(i)}
                  aria-label={`Avis ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === i ? "w-10 bg-[#0F0F0F]" : "w-4 bg-[#0F0F0F]/20"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div key={current.id} className="relative bg-white rounded-3xl p-8 lg:p-12 border border-black/[0.06] testimonial-fade">
              <Quote className="w-10 h-10 text-[#C7F84E] mb-6" strokeWidth={1.5} />
              <p className="text-[20px] lg:text-[24px] leading-[1.4] text-[#0F0F0F] font-medium tracking-[-0.01em]">
                «&nbsp;{current.text}&nbsp;»
              </p>
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-black/[0.06]">
                <div className="w-12 h-12 rounded-full bg-[#0F0F0F] text-[#C7F84E] flex items-center justify-center font-black text-lg">
                  {current.name[0]}
                </div>
                <div>
                  <div className="font-bold text-[#0F0F0F] text-[15px]">{current.name}</div>
                  <div className="text-[12px] text-[#0F0F0F]/55">{current.role}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#C7F84E] fill-[#C7F84E]" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

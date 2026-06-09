import React, { useEffect, useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { stats } from "../mock";

const Hero = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) +
          " CET"
      );
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden">
      {/* Subtle grid background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.045) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at 50% 30%, black 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 30%, black 40%, transparent 80%)"
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Top meta row */}
        <div className="flex items-center justify-between mb-10 text-[11px] tracking-[0.2em] uppercase text-[#0F0F0F]/55 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#C7F84E] rounded-full animate-pulse" />
            En ligne · {time}
          </div>
          <div className="hidden sm:block">Édition 026 — Hiver 2026</div>
          <div className="hidden md:block">Île-de-France · Par Laszlo</div>
        </div>

        {/* Big headline */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-6 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-black text-[#0F0F0F] tracking-[-0.04em] leading-[0.92] text-[56px] sm:text-[78px] lg:text-[120px] xl:text-[140px]">
              Le PC,
              <br />
              <span className="inline-flex items-center">
                pensé
                <span className="mx-3 lg:mx-5 inline-block align-middle w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 rounded-full bg-[#C7F84E] relative overflow-hidden">
                  <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.7),transparent_50%)]" />
                </span>
              </span>
              <br />
              <span className="italic font-light">assemblé à la </span>main.
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-10">
              <a
                href="#shop"
                className="group inline-flex items-center gap-3 bg-[#0F0F0F] text-white text-[14px] font-semibold pl-6 pr-2 py-2 rounded-full hover:bg-[#1a1a1a] transition-colors duration-200"
              >
                Voir mes réalisations
                <span className="w-10 h-10 rounded-full bg-[#C7F84E] flex items-center justify-center text-[#0F0F0F] transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="w-[18px] h-[18px]" strokeWidth={2.5} />
                </span>
              </a>
              <Link
                to="/devis"
                className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#0F0F0F] px-6 py-3 rounded-full border border-[#0F0F0F]/15 hover:border-[#0F0F0F] transition-colors duration-200"
              >
                Configurateur sur mesure
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right column: tagline + featured card */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <p className="text-[15px] leading-relaxed text-[#0F0F0F]/70 max-w-md">
              Moi c&apos;est <span className="text-[#0F0F0F] font-semibold">Laszlo</span> et je monte des configurations premium à la main, en Île-de-France, testées 72h. Une philosophie simple : <span className="text-[#0F0F0F] font-semibold">aucune concession.</span>
            </p>

            <div className="relative rounded-3xl bg-[#0F0F0F] text-white p-6 overflow-hidden">
              <div
                aria-hidden
                className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-[#C7F84E]/15 blur-3xl"
              />
              <div className="text-[10px] tracking-[0.22em] uppercase text-[#C7F84E] font-bold">
                Dernier build
              </div>
              <div className="text-xl font-bold mt-2 leading-tight">
                BUILD WHITE FROST
              </div>
              <div className="text-white/55 text-[13px] mt-1">
                Watercooling AIO · DDR5 RGB · XFX Radeon
              </div>
              <div className="flex items-end justify-between mt-6">
                <div className="text-[12px] text-white/45 max-w-[60%]">
                  Assemblé et testé à la main en atelier.
                </div>
                <Link
                  to="/devis"
                  className="text-[12px] font-semibold inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 transition-colors px-3 py-2 rounded-full"
                >
                  Devis <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 border-t border-[#0F0F0F]/10">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-7 px-2 ${
                i !== 0 ? "md:border-l border-[#0F0F0F]/10" : ""
              }`}
            >
              <div className="text-4xl lg:text-5xl font-black tracking-tight text-[#0F0F0F]">
                {s.value}
              </div>
              <div className="text-[12px] uppercase tracking-[0.16em] text-[#0F0F0F]/55 mt-2 font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

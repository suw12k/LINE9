import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import FeaturedPCs from "../components/FeaturedPCs";
import ServicesSection from "../components/ServicesSection";
import CustomBuild from "../components/CustomBuild";
import Magazine from "../components/Magazine";
import Testimonials from "../components/Testimonials";
import Footer, { Newsletter } from "../components/Footer";

const MarqueeBand = () => {
  const items = [
    "Assemblé à la main en Île-de-France",
    "Devis gratuit sous 24h",
    "Test stabilité 72h",
    "Garantie 2 ans",
    "Service client 7j/7",
    "+160 avis 5/5"
  ];
  const loop = [...items, ...items];
  return (
    <div className="bg-[#0F0F0F] text-white py-5 overflow-hidden border-y border-white/5">
      <div className="flex gap-12 whitespace-nowrap nexus-marquee">
        {loop.map((t, i) => (
          <div key={i} className="flex items-center gap-12 text-[13px] uppercase tracking-[0.2em] font-medium">
            <span>{t}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7F84E]" />
          </div>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#0F0F0F] selection:bg-[#C7F84E] selection:text-[#0F0F0F]">
      <Header />
      <main>
        <Hero />
        <MarqueeBand />
        <FeaturedPCs />
        <CustomBuild />
        <ServicesSection />
        <Magazine />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

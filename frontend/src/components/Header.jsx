import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { navItems } from "../mock";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "bg-[#FAFAF7]/85 backdrop-blur-xl border-b border-black/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-9 h-9 bg-[#0F0F0F] rounded-[10px] flex items-center justify-center transition-transform duration-300 group-hover:rotate-[8deg]">
                <span className="text-[#C7F84E] font-black text-lg leading-none">L9</span>
              </div>
              <div className="absolute -inset-1 bg-[#C7F84E] rounded-[12px] opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-[#0F0F0F] text-[17px] tracking-tight">LINE9</span>
              <span className="text-[10px] text-[#666] tracking-[0.18em] font-medium uppercase mt-0.5">Hardware</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`relative px-4 py-2 text-[14px] font-medium transition-colors duration-200 group ${
                    isActive ? "text-[#0F0F0F]" : "text-[#0F0F0F]/60 hover:text-[#0F0F0F]"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-4 right-4 -bottom-0.5 h-px bg-[#0F0F0F] origin-left transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full hover:bg-black/5 transition-colors">
              <Search className="w-[18px] h-[18px] text-[#0F0F0F]" />
            </button>
            <button className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full hover:bg-black/5 transition-colors relative">
              <ShoppingBag className="w-[18px] h-[18px] text-[#0F0F0F]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C7F84E] rounded-full border-2 border-[#FAFAF7]" />
            </button>
            <Link
              to="/devis"
              className="hidden md:inline-flex items-center gap-2 ml-2 bg-[#0F0F0F] text-white text-[13px] font-semibold px-5 py-2.5 rounded-full hover:bg-[#0F0F0F]/85 transition-colors duration-200"
            >
              Devis gratuit
              <span className="w-1.5 h-1.5 bg-[#C7F84E] rounded-full" />
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        } bg-[#FAFAF7] border-b border-black/[0.06]`}
      >
        <div className="px-6 py-4 flex flex-col">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="py-3 text-[15px] font-medium text-[#0F0F0F] border-b border-black/[0.05] last:border-0"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/devis"
            className="mt-4 inline-flex items-center justify-center gap-2 bg-[#0F0F0F] text-white text-sm font-semibold px-5 py-3 rounded-full"
          >
            Devis gratuit
            <span className="w-1.5 h-1.5 bg-[#C7F84E] rounded-full" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

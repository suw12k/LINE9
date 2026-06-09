import React, { useEffect, useState } from "react";
import { Cookie, X, Check, Settings2, Shield } from "lucide-react";

const STORAGE_KEY = "line9_cookie_consent_v1";

const defaultPrefs = {
  necessary: true, // always on
  analytics: false,
  marketing: false,
};

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState(defaultPrefs);

  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      // localStorage unavailable
    }
    if (!saved) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const persist = (value) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...value, savedAt: new Date().toISOString() })
      );
    } catch (e) {
      // ignore
    }
    setVisible(false);
  };

  const acceptAll = () =>
    persist({ necessary: true, analytics: true, marketing: true });

  const rejectAll = () =>
    persist({ necessary: true, analytics: false, marketing: false });

  const saveCustom = () => persist(prefs);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-5 pointer-events-none"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
    >
      <div className="pointer-events-auto max-w-[1100px] mx-auto bg-[#0F0F0F] text-white rounded-3xl border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] overflow-hidden cookie-banner-anim">
        {!showSettings ? (
          /* === Main banner === */
          <div className="p-5 sm:p-7 lg:p-8 flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex items-start gap-4 flex-1">
              <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-[#C7F84E]/15 items-center justify-center shrink-0">
                <Cookie className="w-5 h-5 text-[#C7F84E]" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <h2
                  id="cookie-title"
                  className="text-[16px] sm:text-[18px] font-bold tracking-tight"
                >
                  On parle cookies, sans en faire un fromage 🍪
                </h2>
                <p className="text-white/60 text-[13px] sm:text-[14px] leading-relaxed mt-1.5 max-w-2xl">
                  LINE9 utilise des cookies essentiels au fonctionnement du site
                  et, avec votre accord, des cookies de mesure d&apos;audience pour
                  améliorer votre expérience. Vous pouvez tout accepter, tout
                  refuser, ou choisir précisément.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 lg:gap-3 lg:flex-nowrap shrink-0">
              <button
                onClick={() => setShowSettings(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 text-white/85 hover:border-white hover:text-white text-[13px] font-semibold transition-colors"
              >
                <Settings2 className="w-4 h-4" />
                Personnaliser
              </button>
              <button
                onClick={rejectAll}
                className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-[13px] font-semibold transition-colors"
              >
                Tout refuser
              </button>
              <button
                onClick={acceptAll}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C7F84E] text-[#0F0F0F] text-[13px] font-bold hover:brightness-95 transition-[filter]"
              >
                Tout accepter
                <Check className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>
          </div>
        ) : (
          /* === Settings panel === */
          <div className="p-5 sm:p-7 lg:p-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#C7F84E]/15 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-[#C7F84E]" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-[16px] sm:text-[18px] font-bold tracking-tight">
                    Préférences de cookies
                  </h2>
                  <p className="text-white/55 text-[12px] mt-0.5">
                    Activez ce qui vous met à l&apos;aise. Vous gardez le contrôle.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                aria-label="Fermer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <CookieRow
                title="Essentiels"
                desc="Indispensables au bon fonctionnement du site (navigation, formulaires, sécurité). Ne peuvent pas être désactivés."
                checked
                locked
              />
              <CookieRow
                title="Mesure d'audience"
                desc="Nous aident à comprendre comment vous utilisez le site (pages visitées, temps passé) pour l'améliorer."
                checked={prefs.analytics}
                onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
              />
              <CookieRow
                title="Marketing"
                desc="Permettent de mesurer la pertinence des contenus et campagnes que vous voyez sur les réseaux."
                checked={prefs.marketing}
                onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
              />
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 mt-7 pt-6 border-t border-white/10">
              <button
                onClick={rejectAll}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-[13px] font-semibold transition-colors"
              >
                Tout refuser
              </button>
              <button
                onClick={saveCustom}
                className="px-5 py-2.5 rounded-full border border-white/20 hover:border-white text-[13px] font-semibold transition-colors"
              >
                Enregistrer mes choix
              </button>
              <button
                onClick={acceptAll}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C7F84E] text-[#0F0F0F] text-[13px] font-bold hover:brightness-95 transition-[filter]"
              >
                Tout accepter
                <Check className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CookieRow = ({ title, desc, checked, onChange, locked }) => {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-start gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-[14px] tracking-tight">{title}</h3>
          {locked && (
            <span className="text-[10px] uppercase tracking-[0.16em] bg-[#C7F84E] text-[#0F0F0F] font-bold px-2 py-0.5 rounded-full">
              Toujours actif
            </span>
          )}
        </div>
        <p className="text-white/55 text-[12px] sm:text-[13px] leading-relaxed mt-1.5">
          {desc}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={locked}
        onClick={() => !locked && onChange && onChange(!checked)}
        className={`shrink-0 mt-0.5 relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
          checked ? "bg-[#C7F84E]" : "bg-white/15"
        } ${locked ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full transition-transform duration-200 ${
            checked ? "translate-x-[22px] bg-[#0F0F0F]" : "translate-x-[2px] bg-white"
          }`}
        />
      </button>
    </div>
  );
};

export default CookieBanner;

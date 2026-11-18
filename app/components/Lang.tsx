"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Lang } from "../content";

const Ctx = createContext<{ lang: Lang; toggle: () => void }>({ lang: "pt", toggle: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");
  useEffect(() => {
    try {
      const s = localStorage.getItem("lang");
      if (s === "en" || s === "pt") setLang(s);
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    try { localStorage.setItem("lang", lang); } catch {}
  }, [lang]);
  return <Ctx.Provider value={{ lang, toggle: () => setLang((l) => (l === "pt" ? "en" : "pt")) }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);

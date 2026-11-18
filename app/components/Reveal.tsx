"use client";

import { useEffect, useRef } from "react";

/** Entra no scroll: sobe e desfoca de leve. Sem JS, tudo já visível. */
export function Reveal({ children, as: Tag = "div", className = "", delay = 0 }: {
  children: React.ReactNode; as?: React.ElementType; className?: string; delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.dataset.reveal = "out";
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.dataset.reveal = "in"; io.disconnect(); }
    }, { rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    // foco por teclado nunca cai num elemento ainda invisível
    const show = () => { el.dataset.reveal = "in"; io.disconnect(); };
    el.addEventListener("focusin", show);
    return () => { io.disconnect(); el.removeEventListener("focusin", show); };
  }, []);
  return <Tag ref={ref} className={className} style={{ "--d": `${delay}ms` } as React.CSSProperties}>{children}</Tag>;
}

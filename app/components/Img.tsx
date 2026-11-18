"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Imagem que carrega sob demanda e entra suave: começa levemente desfocada e ampliada,
 * e assenta quando o arquivo chega e ela aparece na tela. Sem JS, aparece normalmente.
 */
export function Img({ src, alt, eager = false, className = "" }: { src: string; alt: string; eager?: boolean; className?: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [state, setState] = useState<"ssr" | "wait" | "in">("ssr");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setState("wait");
    let loaded = el.complete, seen = false;
    const check = () => { if (loaded && seen) setState("in"); };
    const onLoad = () => { loaded = true; check(); };
    el.addEventListener("load", onLoad);
    el.addEventListener("error", onLoad);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { seen = true; io.disconnect(); check(); } }, { rootMargin: "0px 0px -6% 0px" });
    io.observe(el);
    return () => { io.disconnect(); el.removeEventListener("load", onLoad); el.removeEventListener("error", onLoad); };
  }, [src]);
  return (
    <img ref={ref} className={`img ${className}`} data-img={state} src={src} alt={alt}
      loading={eager ? "eager" : "lazy"} decoding="async" />
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Gravação curta do produto em uso, sem som e em loop. Nada é baixado até a hora de tocar:
 * no modo padrão toca quando entra na tela; com `hover`, só enquanto o cursor está no link em volta.
 * Com movimento reduzido ou economia de dados fica só o poster.
 */
export function Clip({ src, poster, label, hover = false, className = "" }: { src: string; poster: string; label: string; hover?: boolean; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const saver = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const play = () => { v.play().catch(() => {}); };
    if (hover) {
      if (!window.matchMedia("(hover: hover)").matches) return;
      const host: Element = v.closest("a") ?? v;
      const stop = () => { v.pause(); setOn(false); };
      host.addEventListener("pointerenter", play);
      host.addEventListener("pointerleave", stop);
      return () => { host.removeEventListener("pointerenter", play); host.removeEventListener("pointerleave", stop); };
    }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) play(); else v.pause(); }, { threshold: 0.35 });
    io.observe(v);
    return () => io.disconnect();
  }, [hover, src]);
  return (
    <video ref={ref} className={`clip ${className}`} data-on={on} data-hover={hover} src={src} poster={hover ? undefined : poster}
      muted loop playsInline preload="none" tabIndex={-1} aria-label={label} onPlaying={() => setOn(true)} />
  );
}

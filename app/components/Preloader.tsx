"use client";

import { useEffect, useState } from "react";

/** Contador 0→100 enquanto as fontes e os prints chegam; depois a cortina sobe. Uma vez por sessão. */
export function Preloader() {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // data-ready solta as animações de entrada (Split, cortina da página): elas esperam a cortina subir
    const ready = () => { document.documentElement.dataset.ready = ""; };
    try {
      if (sessionStorage.getItem("loaded")) { setGone(true); ready(); return; }
    } catch {}
    // só o que a primeira dobra usa: as fontes e o primeiro print. O resto carrega por baixo.
    let loaded = 0;
    const total = 2;
    const bump = () => { loaded++; };
    const first = new Image(); first.onload = first.onerror = bump; first.src = "/work/fraus.webp";
    document.fonts.ready.then(bump);
    const start = performance.now();
    let raf = 0, shown = 0;
    const loop = () => {
      const el = performance.now() - start;
      const t = Math.min(1, el / 900);
      // teto: com rede lenta ou imagem quebrada, a cortina sobe mesmo assim
      const target = (el > 2200 ? 1 : Math.min(t, loaded / total)) * 100;
      shown += (target - shown) * 0.16;
      setN(Math.round(shown));
      if (shown > 99.4) {
        setN(100);
        setTimeout(() => { setDone(true); ready(); }, 120);
        setTimeout(() => setGone(true), 1050);
        try { sessionStorage.setItem("loaded", "1"); } catch {}
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (gone) return null;
  return (
    <div className="pre" data-done={done} aria-hidden="true">
      <span className="pre__n">{String(n).padStart(3, "0")}</span>
      <span className="pre__l">João Pedro · portfólio</span>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

/**
 * Fundo interativo: uma malha de pixels sobre o grafite. Em volta do cursor (ou do dedo) os pixels
 * crescem num anel e deixam um rastro que esfria; um clique solta uma onda. Parado, uma luz passeia sozinha.
 * Canvas 2D, então roda em qualquer navegador. Com movimento reduzido, fica a malha estática.
 */
export function Field() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, dpr = 1, gap = 30, cols = 0, rows = 0, raf = 0;
    let heat = new Float32Array(0);
    const ptr = { x: -1, y: -1, tx: 0, ty: 0, last: -1e9 };
    const ripples: { x: number; y: number; t: number }[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      gap = W < 700 ? 24 : 30;
      cols = Math.ceil(W / gap) + 1; rows = Math.ceil(H / gap) + 2;
      heat = new Float32Array(cols * rows);
      if (still) draw(0);
    };
    const onMove = (e: PointerEvent) => { ptr.tx = e.clientX; ptr.ty = e.clientY; ptr.last = performance.now(); };
    const onDown = (e: PointerEvent) => {
      ripples.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (ripples.length > 4) ripples.shift();
    };

    function draw(now: number) {
      const t = now / 1000;
      // sem ponteiro há 2,5 s (ou no celular parado): a luz passeia sozinha
      if (now - ptr.last > 2500) {
        ptr.tx = W * (0.5 + 0.36 * Math.sin(t * 0.21));
        ptr.ty = H * (0.46 + 0.3 * Math.sin(t * 0.29 + 1.3));
      }
      if (ptr.x < 0) { ptr.x = ptr.tx; ptr.y = ptr.ty; }
      ptr.x += (ptr.tx - ptr.x) * 0.085; ptr.y += (ptr.ty - ptr.y) * 0.085;

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, W, H);
      ctx!.fillStyle = "#e9e8e4";
      const R = Math.min(300, W * 0.45);
      const ox = (W - (cols - 1) * gap) / 2;
      const oy = (H - (rows - 1) * gap) / 2 - ((window.scrollY * 0.12) % gap); // a malha desliza de leve com o scroll
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const gx = ox + c * gap, gy = oy + r * gap;
          const dx = gx - ptr.x, dy = gy - ptr.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          // anel: calmo no centro (o texto sob o cursor continua legível), forte a meio raio
          let f = 0;
          if (!still && d < R) { const s = Math.sin((Math.PI * d) / R); f = s * s; }
          let wave = 0;
          for (const rp of ripples) {
            const age = (now - rp.t) / 1000;
            if (age > 1.8) continue;
            const dd = Math.hypot(gx - rp.x, gy - rp.y) - age * 560;
            wave = Math.max(wave, Math.exp(-(dd * dd) / 3600) * (1 - age / 1.8));
          }
          const i = r * cols + c;
          const h = (heat[i] = Math.max(heat[i] * 0.955, f * 0.85, wave));
          const amb = 0.5 + 0.5 * Math.sin(gx * 0.012 + gy * 0.017 + t * 0.55) * Math.sin(gy * 0.011 - t * 0.33 + gx * 0.004);
          const size = 1.3 + amb * 1.2 + h * 5;
          const push = d > 0 ? (f * 9) / d : 0;
          ctx!.globalAlpha = 0.09 + amb * 0.08 + h * 0.3;
          ctx!.fillRect(gx + dx * push - size / 2, gy + dy * push - size / 2, size, size);
        }
      }
      ctx!.globalAlpha = 1;
    }

    const loop = (now: number) => {
      if (!document.hidden) draw(now);
      raf = requestAnimationFrame(loop);
    };
    resize();
    window.addEventListener("resize", resize);
    if (!still) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return <div className="field" aria-hidden="true"><canvas ref={ref} /></div>;
}

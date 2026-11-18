"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { nameLayout, type NameLayout } from "./pixelName";

/**
 * Fundo interativo: uma malha de pixels sobre o grafite. Em volta do cursor (ou do dedo) os pixels
 * crescem num anel e deixam um rastro que esfria; um clique solta uma onda. Parado, uma luz passeia sozinha.
 * Elementos com data-field="#cor" acendem a malha em volta deles nessa cor (no toque, vale o mais central da tela),
 * e cada troca de página passa uma cortina de pixels de cima a baixo.
 * No hero, os pixels montam o nome: um elemento com data-px-name reserva o espaço e a malha desenha "JOÃO PEDRO"
 * dentro dele. O cursor espalha as letras, elas voltam, e ao rolar o nome se desfaz na malha.
 * Canvas 2D, então roda em qualquer navegador. Com movimento reduzido, fica a malha estática e o nome vira texto.
 */
export function Field() {
  const ref = useRef<HTMLCanvasElement>(null);
  const path = usePathname();
  const wipe = useRef(-1e9);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    wipe.current = performance.now();
  }, [path]);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, dpr = 1, gap = 30, cols = 0, rows = 0, raf = 0;
    let heat = new Float32Array(0);
    const ptr = { x: -1, y: -1, tx: 0, ty: 0, last: -1e9 };
    const ripples: { x: number; y: number; t: number }[] = [];
    const tgt: { el: Element | null; color: string; amt: number } = { el: null, color: "#e9e8e4", amt: 0 };
    const touch = window.matchMedia("(hover: none)").matches;
    let lastPick = 0;
    const lit: number[] = [];
    // o nome em pixels: cada célula tem um deslocamento em relação à casa dela e volta por mola
    type Px = { hx: number; hy: number; ox: number; oy: number; vx: number; vy: number; sx: number; sy: number; wait: number };
    const name: { el: Element | null; lay: NameLayout | null; px: Px[]; rect: DOMRect | null; amt: number; born: number; tick: number; vis: number } =
      { el: null, lay: null, px: [], rect: null, amt: 0, born: 0, tick: 0, vis: 0 };
    const buildName = (rect: DOMRect) => {
      const lay = nameLayout(rect.width / rect.height > 3.4);
      name.lay = lay; name.born = 0; name.amt = 0;
      name.px = lay.cells.map((c) => {
        const a = Math.random() * Math.PI * 2, far = 0.35 + Math.random() * 0.65;
        const sx = Math.cos(a) * far, sy = Math.sin(a) * far;
        return { hx: c.x, hy: c.y, ox: sx * W * 0.6, oy: sy * H * 0.6, vx: 0, vy: 0, sx, sy, wait: c.x * 9 + Math.random() * 260 };
      });
    };
    if (!still) document.documentElement.dataset.px = "";
    const onOver = (e: PointerEvent) => {
      if (touch) return;
      const el = (e.target as Element).closest?.("[data-field]") ?? null;
      tgt.el = el;
      if (el) tgt.color = (el as HTMLElement).dataset.field || tgt.color;
    };

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

    let last: DOMRect | null = null;
    function draw(now: number) {
      const t = now / 1000;
      // sem ponteiro há 2,5 s (ou no celular parado): a luz passeia sozinha
      if (now - ptr.last > 2500) {
        ptr.tx = W * (0.5 + 0.36 * Math.sin(t * 0.21));
        ptr.ty = H * (0.46 + 0.3 * Math.sin(t * 0.29 + 1.3));
      }
      if (ptr.x < 0) { ptr.x = ptr.tx; ptr.y = ptr.ty; }
      ptr.x += (ptr.tx - ptr.x) * 0.085; ptr.y += (ptr.ty - ptr.y) * 0.085;

      // no toque não existe hover: acende o elemento marcado mais perto do centro da tela
      if (touch && now - lastPick > 300) {
        lastPick = now;
        let best: Element | null = null, bd = H * 0.34;
        document.querySelectorAll("[data-field]").forEach((el) => {
          const r = el.getBoundingClientRect();
          const dd = Math.abs(r.top + r.height / 2 - H / 2);
          if (dd < bd) { bd = dd; best = el; }
        });
        tgt.el = best;
        if (best) tgt.color = (best as HTMLElement).dataset.field || tgt.color;
      }
      if (tgt.el && !tgt.el.isConnected) tgt.el = null;
      tgt.amt += ((tgt.el ? 1 : 0) - tgt.amt) * 0.07;
      const box = tgt.el ? tgt.el.getBoundingClientRect() : null;
      if (box) last = box;
      lit.length = 0;
      const wipeAge = (now - wipe.current) / 1000;
      const front = wipeAge < 1.1 ? -120 + (wipeAge / 0.95) * (H + 240) : -1e6;

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
          if (front > -1e5) { const dw = gy - front; wave = Math.max(wave, Math.exp(-(dw * dw) / 9000) * 0.9); }
          const i = r * cols + c;
          const h = (heat[i] = Math.max(heat[i] * 0.955, f * 0.85, wave));
          if (last && tgt.amt > 0.02) {
            const ex = Math.max(last.left - gx, 0, gx - last.right), ey = Math.max(last.top - gy, 0, gy - last.bottom);
            const de = Math.sqrt(ex * ex + ey * ey);
            const g = (de === 0 ? 0.2 : Math.exp(-(de * de) / 5200)) * tgt.amt;
            if (g > 0.03) lit.push(gx, gy, g);
          }
          const amb = 0.5 + 0.5 * Math.sin(gx * 0.012 + gy * 0.017 + t * 0.55) * Math.sin(gy * 0.011 - t * 0.33 + gx * 0.004);
          const size = 1.3 + amb * 1.2 + h * 5;
          const push = d > 0 ? (f * 9) / d : 0;
          // onde o nome está montado, a malha comum recua para não sujar as letras
          const nr = name.rect;
          const under = nr && name.vis > 0.02 && gx > nr.left - 12 && gx < nr.right + 12 && gy > nr.top - 12 && gy < nr.bottom + 12 ? 1 - name.vis * 0.9 : 1;
          ctx!.globalAlpha = (0.09 + amb * 0.08 + h * 0.3) * under;
          ctx!.fillRect(gx + dx * push - size / 2, gy + dy * push - size / 2, size, size);
        }
      }
      // segunda passada: a cor do produto em volta do elemento em foco
      if (lit.length) {
        ctx!.fillStyle = tgt.color;
        for (let k = 0; k < lit.length; k += 3) {
          const g = lit[k + 2], size = 2 + g * 5.5;
          ctx!.globalAlpha = Math.min(0.9, g * 0.95);
          ctx!.fillRect(lit[k] - size / 2, lit[k + 1] - size / 2, size, size);
        }
      }
      drawName(now);
      ctx!.globalAlpha = 1;
    }

    function drawName(now: number) {
      if (still) return;
      if (!name.el || !name.el.isConnected) {
        name.el = null;
        if (name.tick++ % 8 === 0) name.el = document.querySelector("[data-px-name]");
        if (name.el) buildName(name.el.getBoundingClientRect());
      }
      if (name.el) name.rect = name.el.getBoundingClientRect();
      const rect = name.rect, lay = name.lay;
      if (!rect || !lay) return;
      // se a largura mudou de faixa (girou o celular, redimensionou), remonta no desenho certo
      if (name.el && (rect.width / rect.height > 3.4) !== (lay.cols === 55)) { buildName(rect); return; }
      const ready = "ready" in document.documentElement.dataset;
      if (ready && !name.born) name.born = now;
      const age = name.born ? now - name.born : -1;
      name.amt += ((name.el && ready ? 1 : 0) - name.amt) * 0.08;
      if (!name.el && name.amt < 0.01) { name.rect = null; name.lay = null; name.px = []; name.vis = 0; return; }
      const cell = rect.width / lay.cols;
      const side = cell * 0.8;
      // rolar a página desfaz o nome de volta na malha
      const gone = Math.min(1, Math.max(0, (H * 0.16 - rect.top) / (H * 0.5)));
      const out = Math.max(gone * gone, 1 - name.amt);
      name.vis = age > 600 ? 1 - out : 0;
      const live = now - ptr.last < 2500;
      const reach = Math.max(90, cell * 5);
      ctx!.fillStyle = "#e9e8e4";
      for (const p of name.px) {
        const hx = rect.left + (p.hx + 0.5) * cell, hy = rect.top + (p.hy + 0.5) * cell;
        if (age < 0 || age < p.wait) continue; // ainda não entrou
        const tx = p.sx * out * 320, ty = p.sy * out * 320;
        let fx = (tx - p.ox) * 0.045, fy = (ty - p.oy) * 0.045;
        if (live) {
          const dx = hx + p.ox - ptr.tx, dy = hy + p.oy - ptr.ty;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < reach && d > 0.01) { const k = (1 - d / reach) ** 2 * 5.5; fx += (dx / d) * k; fy += (dy / d) * k; }
        }
        for (const rp of ripples) {
          const a = (now - rp.t) / 1000;
          if (a > 1.8) continue;
          const dx = hx - rp.x, dy = hy - rp.y, d = Math.sqrt(dx * dx + dy * dy) || 1;
          const dd = d - a * 560;
          const k = Math.exp(-(dd * dd) / 3600) * (1 - a / 1.8) * 2.4;
          fx += (dx / d) * k; fy += (dy / d) * k;
        }
        p.vx = (p.vx + fx) * 0.82; p.vy = (p.vy + fy) * 0.82;
        p.ox += p.vx; p.oy += p.vy;
        const off = Math.min(1, Math.sqrt(p.ox * p.ox + p.oy * p.oy) / 260);
        const s = side * (1 - off * 0.55);
        ctx!.globalAlpha = Math.max(0, (0.94 - off * 0.7) * (1 - out));
        ctx!.fillRect(hx + p.ox - s / 2, hy + p.oy - s / 2, s, s);
      }
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
      window.addEventListener("pointerover", onOver, { passive: true });
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerover", onOver);
      delete document.documentElement.dataset.px;
    };
  }, []);

  return <div className="field" aria-hidden="true"><canvas ref={ref} /></div>;
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { useLang } from "./Lang";
import { Arrow } from "./Arrow";
import { Techs } from "./Tech";
import { Clip } from "./Clip";
import { cases } from "../content";

const Ctx = createContext<(id: string) => void>(() => {});
/** Abre o resumo de um projeto num pop-up. */
export const useProject = () => useContext(Ctx);

/** Clique simples abre o pop-up; ctrl/cmd-clique e navegação sem JS seguem o link normal. */
export function projectClick(open: (id: string) => void, id: string) {
  return (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    open(id);
  };
}

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useLang();
  const ref = useRef<HTMLDialogElement>(null);
  const [id, setId] = useState(cases[0].id);
  const [shot, setShot] = useState(0);
  const open = useCallback((next: string) => {
    setId(next);
    setShot(0);
    const d = ref.current;
    if (d && !d.open) d.showModal();
    d?.scrollTo(0, 0);
  }, []);
  const close = () => ref.current?.close();

  // trocar de rota fecha o pop-up
  const path = usePathname();
  useEffect(() => { ref.current?.close(); }, [path]);

  const i = Math.max(0, cases.findIndex((w) => w.id === id));
  const w = cases[i];
  const next = cases[(i + 1) % cases.length];
  const pt = lang === "pt";
  const shots = [w.image, ...w.shots, w.mobile];
  const tall = shot === shots.length - 1;
  return (
    <Ctx.Provider value={open}>
      {children}
      <dialog ref={ref} className="sheet" aria-labelledby="sheet-name" data-lenis-prevent=""
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
        <div className="sheet__in">
          <button className="sheet__x" onClick={close} aria-label={pt ? "Fechar" : "Close"}><X size={20} aria-hidden="true" /></button>
          <div className="sheet__media">
            <a className="sheet__stage" data-tall={tall} href={w.links[0].href} target="_blank" rel="noopener"
              aria-label={`${w.name}: ${pt ? "abrir o site" : "open the site"}`}>
              {shot === 0
                ? <Clip key={w.video} src={w.video} poster={w.image} label={`${w.name}: ${pt ? "gravação do site em uso" : "recording of the site in use"}`} />
                : <img key={shots[shot]} src={shots[shot]} alt={`${w.name}: ${w.line[lang]}`} />}
            </a>
            <div className="sheet__thumbs" role="group" aria-label={pt ? "Telas do projeto" : "Project screens"}>
              {shots.map((src, k) => (
                <button key={src} onClick={() => setShot(k)} aria-current={k === shot ? "true" : undefined} data-tall={k === shots.length - 1}
                  aria-label={k === 0 ? (pt ? "Vídeo" : "Video") : `${pt ? "Tela" : "Screen"} ${k + 1}`}>
                  <img src={src} alt="" loading="lazy" decoding="async" />
                  {k === 0 && <Play className="sheet__play" size={16} aria-hidden="true" />}
                </button>
              ))}
            </div>
            <a className="sheet__url" href={w.links[0].href} target="_blank" rel="noopener">{w.links[0].href.replace(/^https:\/\//, "").replace(/\/$/, "")} <Arrow /></a>
          </div>
          <div className="sheet__text">
            <p className="sheet__meta">{w.kind[lang]} · {w.year}</p>
            <h2 id="sheet-name" className="sheet__name">{w.name}</h2>
            <p className="sheet__line">{w.line[lang]}</p>
            <p className="sheet__body">{w.body[lang]}</p>
            {w.facts && (
              <dl className="nums">
                {w.facts.map((f) => <div key={f.n + f.l.pt}><dt>{f.n}</dt><dd>{f.l[lang]}</dd></div>)}
              </dl>
            )}
            <Techs items={w.stack} />
            <p className="sheet__links">
              {w.links.map((l, k) => (
                <a key={l.href} className={k === 0 ? "btn btn--fill" : "btn"} href={l.href} target="_blank" rel="noopener">{l.label[lang]} <Arrow /></a>
              ))}
            </p>
            <p className="sheet__foot">
              <Link href={`/projetos/${w.id}/`} onClick={close}>{pt ? "Página completa" : "Full page"}</Link>
              <button onClick={() => open(next.id)}>{pt ? "Próximo" : "Next"}: {next.name} →</button>
            </p>
          </div>
        </div>
      </dialog>
    </Ctx.Provider>
  );
}

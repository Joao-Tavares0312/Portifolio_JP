"use client";

import { useEffect, useRef } from "react";
import { useLang } from "../components/Lang";
import { Reveal } from "../components/Reveal";
import { Split } from "../components/Split";
import { Glyph } from "../components/Glyph";
import { Techs } from "../components/Tech";
import { path, t } from "../content";

export default function Experience() {
  const { lang } = useLang();
  const list = useRef<HTMLOListElement>(null);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = list.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const k = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
        el.style.setProperty("--p", k.toFixed(3));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <section>
      <h1 className="page__title"><Split text={t[lang].nav[2]} step={35} /></h1>
      <ol className="xp" ref={list}>
        {path.map((p, i) => (
          <Reveal as="li" key={p.org} delay={i * 80}>
            <span className="xp__year" aria-hidden="true">{p.year}</span>
            <div className="xp__who">
              <span className="tile"><Glyph name={p.icon} /></span>
              <div>
                <p className="xp__when">{p.when[lang]}</p>
                <h2 className="xp__org">{p.org}</h2>
                <p className="xp__role">{p.role[lang]}</p>
              </div>
            </div>
            <div className="xp__what">
              <p className="xp__text">{p.text[lang]}</p>
              {p.tags.length > 0 && <Techs items={p.tags} />}
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

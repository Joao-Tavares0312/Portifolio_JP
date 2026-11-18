"use client";

import Link from "next/link";
import { useLang } from "../../components/Lang";
import { Reveal } from "../../components/Reveal";
import { Arrow } from "../../components/Arrow";
import { Split } from "../../components/Split";
import { Techs } from "../../components/Tech";
import { Img } from "../../components/Img";
import { cases, t } from "../../content";

export function CaseView({ id }: { id: string }) {
  const { lang } = useLang();
  const c = t[lang];
  const i = cases.findIndex((w) => w.id === id);
  const w = cases[i];
  const next = cases[(i + 1) % cases.length];
  return (
    <article className="case">
      <Link href="/projetos/" className="case__back">← {c.back}</Link>
      <h1 className="case__name"><Split text={w.name} step={40} /></h1>
      <div className="case__cols">
        <div className="case__text">
          <p className="case__meta">{w.year} / {w.kind[lang]}</p>
          <p className="case__line">{w.line[lang]}</p>
          <p className="case__body">{w.body[lang]}</p>
          {w.facts && (
            <dl className="nums">
              {w.facts.map((f) => <div key={f.n + f.l.pt}><dt>{f.n}</dt><dd>{f.l[lang]}</dd></div>)}
            </dl>
          )}
          <Techs items={w.stack} />
          <p className="case__links">
            {w.links.map((l, k) => (
              <a key={l.href} className={k === 0 ? "btn btn--fill" : "btn"} href={l.href} target="_blank" rel="noopener">{l.label[lang]} <Arrow /></a>
            ))}
          </p>
        </div>
        {w.image && (
          <figure className="plate">
            <a href={w.links[0].href} target="_blank" rel="noopener" tabIndex={-1}>
              <Img src={w.image} alt={`${w.name}: ${w.line[lang]}`} eager />
            </a>
            <figcaption>{w.links[0].href.replace(/^https:\/\//, "").replace(/\/$/, "")}</figcaption>
          </figure>
        )}
      </div>
      <Reveal>
        <Link href={`/projetos/${next.id}/`} className="case__next">
          <span>{c.next}</span>
          <span className="case__nextname">{next.name}</span>
        </Link>
      </Reveal>
    </article>
  );
}

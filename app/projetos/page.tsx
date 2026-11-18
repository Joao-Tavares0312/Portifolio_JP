"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLang } from "../components/Lang";
import { Reveal } from "../components/Reveal";
import { Split } from "../components/Split";
import { Arrow } from "../components/Arrow";
import { Glyph } from "../components/Glyph";
import { Img } from "../components/Img";
import { Techs } from "../components/Tech";
import { projectClick, useProject } from "../components/ProjectModal";
import { cases, more, t } from "../content";

export default function Projects() {
  const { lang } = useLang();
  const c = t[lang];
  const openProject = useProject();
  const pt = lang === "pt";
  return (
    <section>
      <header className="head">
        <h1 className="page__title"><Split text={c.nav[3]} step={35} /></h1>
        <p className="head__note">
          {pt ? "Clique em um projeto para ver o resumo e o link." : "Click a project to see the summary and the link."}
        </p>
      </header>
      <ul className="cards">
        {cases.map((w, i) => (
          <Reveal as="li" key={w.id} delay={(i % 2) * 120}>
            <Link className="card" href={`/projetos/${w.id}/`} onClick={projectClick(openProject, w.id)}>
              <span className="card__media">
                <Img src={w.image} alt="" eager={i < 2} />
              </span>
              <span className="card__body">
                <span className="card__top"><span>{w.kind[lang]}</span><span>{w.year}</span></span>
                <span className="card__name">{w.name}</span>
                <span className="card__line">{w.line[lang]}</span>
                <span className="card__foot">
                  <Techs items={w.stack.slice(0, 4)} />
                  <span className="card__more">{pt ? "Ver resumo" : "Summary"} <Plus size={16} aria-hidden="true" /></span>
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
      <Reveal className="lab">
        <h2 className="block__h">{c.moreH}</h2>
        <ul>
          {more.map((m) => (
            <li key={m.name}>
              <span className="tile"><Glyph name={m.icon} /></span>
              <p className="lab__tag">{m.tag[lang]}</p>
              <h3>{m.href ? <a href={m.href} target="_blank" rel="noopener">{m.name} <Arrow /></a> : m.name}</h3>
              <p>{m.text[lang]}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

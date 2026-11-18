"use client";

import { BriefcaseBusiness, Database, GraduationCap, Languages, LayoutPanelTop, MapPin, Rocket, Server, UsersRound } from "lucide-react";
import { useLang } from "../components/Lang";
import { Reveal } from "../components/Reveal";
import { Split } from "../components/Split";
import { Glyph } from "../components/Glyph";
import { TechIcon } from "../components/Tech";
import { about, certs, stack, t } from "../content";

const sheet = {
  pt: [
    [MapPin, "Onde", "Varginha, MG", "sul de Minas Gerais"],
    [BriefcaseBusiness, "Hoje", "Desenvolvedor na Sourei", "produto Wascer, tracking server-side"],
    [GraduationCap, "Formação", "Ciência da Computação", "UNIS-MG, em andamento"],
    [Languages, "Idiomas", "Português e inglês", "inglês B2 · Cambridge English"],
  ],
  en: [
    [MapPin, "Where", "Varginha, Brazil", "southern Minas Gerais"],
    [BriefcaseBusiness, "Now", "Developer at Sourei", "Wascer, server-side tracking"],
    [GraduationCap, "Education", "B.Sc. Computer Science", "UNIS-MG, in progress"],
    [Languages, "Languages", "Portuguese and English", "English B2 · Cambridge English"],
  ],
} as const;

const steps = {
  pt: [[UsersRound, "Conversa com quem usa"], [Database, "Banco de dados"], [Server, "Back-end"], [LayoutPanelTop, "Front-end"], [Rocket, "Publicação"]],
  en: [[UsersRound, "Talk to users"], [Database, "Database"], [Server, "Back-end"], [LayoutPanelTop, "Front-end"], [Rocket, "Deploy"]],
} as const;

export default function About() {
  const { lang } = useLang();
  const c = t[lang];
  const pt = lang === "pt";
  return (
    <section className="about">
      <h1 className="page__title"><Split text={c.nav[1]} step={35} /></h1>

      <div className="about__top">
        <div className="about__text">
          <p className="about__lead">{c.lede}</p>
          <p>{about[lang][0]}</p>
          <p>{about[lang][2]}</p>
        </div>
        <dl className="about__sheet">
          {sheet[lang].map(([Icon, k, v, sub]) => (
            <div key={k}>
              <span className="tile"><Icon size={22} strokeWidth={1.5} aria-hidden="true" /></span>
              <dt>{k}</dt>
              <dd>{v}<small>{sub}</small></dd>
            </div>
          ))}
        </dl>
      </div>

      <Reveal className="block">
        <h2 className="block__h">{pt ? "Como eu trabalho" : "How I work"}</h2>
        <p className="block__lead">{about[lang][1]}</p>
        <ol className="steps">
          {steps[lang].map(([Icon, label], i) => (
            <li key={label}>
              <span className="steps__n">0{i + 1}</span>
              <Icon size={30} strokeWidth={1.3} aria-hidden="true" />
              <span className="steps__l">{label}</span>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal className="block">
        <h2 className="block__h">{c.stackH}</h2>
        <ul className="tools">
          {stack.map((s) => <li key={s}><TechIcon name={s} size={30} /><span>{s}</span></li>)}
        </ul>
      </Reveal>

      <Reveal className="block">
        <h2 className="block__h">{pt ? "Cursos e certificados" : "Courses and certificates"}</h2>
        <ul className="quals">
          {certs.map((q) => (
            <li key={q.name}>
              <span className="tile"><Glyph name={q.icon} /></span>
              <p className="quals__name">{q.name}</p>
              <p className="quals__by">{q.by}</p>
              <p className="quals__year">{q.year}</p>
            </li>
          ))}
        </ul>
      </Reveal>

    </section>
  );
}

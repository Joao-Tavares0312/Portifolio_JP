"use client";

import Link from "next/link";
import { ArrowDown, BriefcaseBusiness, GraduationCap, MoveRight, Plus, Rocket } from "lucide-react";
import { useLang } from "./components/Lang";
import { Split } from "./components/Split";
import { Reveal } from "./components/Reveal";
import { Arrow } from "./components/Arrow";
import { Techs } from "./components/Tech";
import { projectClick, useProject } from "./components/ProjectModal";
import { MAIL } from "./components/Nav";
import { cases, t } from "./content";

const facts = {
  pt: [
    ["Sourei", "desenvolvedor desde fev 2026"],
    ["Projetos", "publicados e funcionando"],
    ["UNIS-MG", "Ciência da Computação"],
  ],
  en: [
    ["Sourei", "developer since Feb 2026"],
    ["Projects", "shipped and running"],
    ["UNIS-MG", "B.Sc. Computer Science"],
  ],
};
const factIcons = [BriefcaseBusiness, Rocket, GraduationCap];

export default function Home() {
  const { lang } = useLang();
  const c = t[lang];
  const openProject = useProject();
  const pt = lang === "pt";
  return (
    <>
      <section className="hero">
        <p className="hero__kicker">Varginha, MG · Brasil</p>
        {/* o nome é desenhado pela malha de pixels do fundo (Field); o texto fica para leitor de tela, sem JS e movimento reduzido */}
        <h1 className="hero__name" data-px-name=""><span>João Pedro</span></h1>
        <p className="hero__role"><Split text={pt ? "programador fullstack" : "full-stack developer"} delay={900} step={22} /></p>
        <p className="hero__sub">{pt ? "Pego o projeto do banco de dados à interface e coloco no ar. Se você precisa de alguém assim, me chama." : "I take a project from the database to the interface and put it live. If you need someone like that, get in touch."}</p>
        <nav className="hero__go" aria-label={pt ? "Atalhos" : "Shortcuts"}>
          <Link href="/projetos/"><MoveRight size={22} strokeWidth={1.4} aria-hidden="true" />{pt ? "ver os projetos" : "see the projects"}</Link>
          <Link href="/sobre/"><MoveRight size={22} strokeWidth={1.4} aria-hidden="true" />{pt ? "quem eu sou" : "about me"}</Link>
          <Link href="/experiencia/"><MoveRight size={22} strokeWidth={1.4} aria-hidden="true" />{pt ? "experiência" : "experience"}</Link>
          <a href={MAIL}><MoveRight size={22} strokeWidth={1.4} aria-hidden="true" />{pt ? "conversar" : "let's talk"}</a>
        </nav>
        <a className="hero__down" href="#work-h"><ArrowDown size={16} aria-hidden="true" />{c.workH}</a>
      </section>

      <section className="index" aria-labelledby="work-h">
        <h2 id="work-h" className="index__h">{c.workH} <span>({String(cases.length).padStart(2, "0")})</span></h2>
        <ol className="index__list">
          {cases.map((w, k) => (
            <Reveal as="li" key={w.id} delay={k * 70}>
              <Link href={`/projetos/${w.id}/`} data-field={w.accent} onClick={projectClick(openProject, w.id)}>
                <span className="index__n">0{k + 1}</span>
                <span className="index__name">{w.name}</span>
                <span className="index__info">
                  <span className="index__line">{w.line[lang]}</span>
                  <Techs items={w.stack.slice(0, 3)} />
                </span>
                <span className="index__meta"><span>{w.kind[lang]}</span><span>{w.year}</span></span>
                <Plus className="index__plus" size={28} strokeWidth={1.3} aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="facts" aria-label={c.nav[1]}>
        {facts[lang].map(([a, b], i) => {
          const Icon = factIcons[i];
          return (
            <Reveal key={a} className="facts__item" delay={i * 90}>
              <Icon size={26} strokeWidth={1.4} aria-hidden="true" />
              <p className="facts__big">{a}</p>
              <p className="facts__small">{b}</p>
            </Reveal>
          );
        })}
        <Reveal className="facts__more" delay={300}>
          <Link href="/sobre/">{lang === "pt" ? "Quem eu sou" : "About me"} <Arrow /></Link>
          <Link href="/experiencia/">{c.nav[2]} <Arrow /></Link>
        </Reveal>
      </section>
    </>
  );
}

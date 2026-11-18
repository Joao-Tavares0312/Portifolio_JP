"use client";

import Link from "next/link";
import { useLang } from "./components/Lang";
import { Arrow } from "./components/Arrow";

export default function NotFound() {
  const { lang } = useLang();
  const pt = lang === "pt";
  return (
    <section className="lost">
      <p className="lost__n" aria-hidden="true">404</p>
      <h1 className="lost__h">{pt ? "Essa página não existe." : "This page doesn't exist."}</h1>
      <p className="lost__p">{pt ? "O link pode estar errado ou a página mudou de lugar. Os projetos continuam no mesmo endereço." : "The link may be wrong or the page has moved. The projects are still where they were."}</p>
      <p className="lost__go">
        <Link className="btn btn--fill" href="/">{pt ? "Voltar ao início" : "Back to home"} <Arrow /></Link>
        <Link className="btn" href="/projetos/">{pt ? "Ver os projetos" : "See the projects"} <Arrow /></Link>
      </p>
    </section>
  );
}

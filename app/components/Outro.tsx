"use client";

import { useLang } from "./Lang";
import { Arrow } from "./Arrow";

/** Fecho de toda página: o convite e o e-mail em tamanho de manchete. */
export function Outro() {
  const { lang } = useLang();
  return (
    <footer className="outro">
      <p className="outro__k">{lang === "pt" ? "Quer falar comigo?" : "Want to talk?"}</p>
      <a className="outro__mail" href="mailto:pedrotavaresvicente@gmail.com">
        pedrotavaresvicente@gmail.com
      </a>
      <ul className="outro__links">
        <li><a href="https://wa.me/5535988537120" target="_blank" rel="noopener">WhatsApp <Arrow /></a></li>
        <li><a href="https://www.linkedin.com/in/jo%C3%A3o-vicente7477/" target="_blank" rel="noopener">LinkedIn <Arrow /></a></li>
        <li><a href="https://github.com/Joao-Tavares0312" target="_blank" rel="noopener">GitHub <Arrow /></a></li>
      </ul>
      <p className="outro__foot">© 2026 João Pedro Tavares Vicente · Varginha, MG</p>
    </footer>
  );
}

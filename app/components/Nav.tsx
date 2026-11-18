"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "./Lang";
import { Arrow } from "./Arrow";
import { IconGit, IconIn, IconMail, IconWhats } from "./Icons";
import { t } from "../content";

const routes = ["/", "/sobre/", "/experiencia/", "/projetos/"];
export const MAIL = "mailto:pedrotavaresvicente@gmail.com";
const contacts = [
  { label: "E-mail", href: MAIL, Icon: IconMail },
  { label: "WhatsApp", href: "https://wa.me/5535988537120", Icon: IconWhats },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jo%C3%A3o-vicente7477/", Icon: IconIn },
  { label: "GitHub", href: "https://github.com/Joao-Tavares0312", Icon: IconGit },
];

/**
 * Navegação no topo. No alto da página é uma barra aberta (nome, páginas, contatos);
 * rolando, encolhe para uma pílula só com as páginas, some ao descer e volta ao subir.
 * A linha na base da pílula mostra o quanto da página já foi lido.
 */
export function Nav() {
  const { lang, toggle } = useLang();
  const path = usePathname() || "/";
  const c = t[lang];
  const ref = useRef<HTMLElement>(null);
  const [menu, setMenu] = useState(false);
  const active = (r: string) => (r === "/" ? path === "/" : path.startsWith(r.slice(0, -1)));

  useEffect(() => {
    const el = ref.current!;
    let last = window.scrollY, raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.setProperty("--p", max > 0 ? Math.min(1, y / max).toFixed(3) : "0");
      el.dataset.top = String(y < 60);
      if (y < 60) el.dataset.hidden = "false";
      else if (y > last + 4) el.dataset.hidden = "true";
      else if (y < last - 4) el.dataset.hidden = "false";
      last = y;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => { setMenu(false); }, [path]);
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", menu);
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenu(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  return (
    <>
      <header className="nav" ref={ref} data-top="true" data-hidden="false">
        <Link href="/" className="nav__id">
          <span>João Pedro</span>
          <span className="nav__role">{c.role}</span>
        </Link>
        <nav className="nav__pill" aria-label={lang === "pt" ? "Principal" : "Main"}>
          {routes.map((r, i) => (
            <Link key={r} href={r} aria-current={active(r) ? "page" : undefined}>{c.nav[i]}</Link>
          ))}
          <a className="nav__talk" href={MAIL}>{c.contact}</a>
        </nav>
        <div className="nav__end">
          <ul className="nav__contacts" aria-label={c.contact}>
            {contacts.map(({ label, href, Icon }) => (
              <li key={label}>
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" aria-label={label} title={label}><Icon /></a>
              </li>
            ))}
          </ul>
          <button className="nav__lang" onClick={toggle} aria-label={c.langLabel}>{c.langBtn}</button>
          <button className="nav__menu" onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-controls="menu"
            aria-label={menu ? (lang === "pt" ? "Fechar menu" : "Close menu") : "Menu"}>
            {menu ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </header>

      <div className="menu" id="menu" data-open={menu} inert={!menu}>
        <nav aria-label="Menu">
          {routes.map((r, i) => (
            <Link key={r} href={r} aria-current={active(r) ? "page" : undefined} onClick={() => setMenu(false)}>
              <span>0{i + 1}</span>{c.nav[i]}
            </Link>
          ))}
        </nav>
        <ul className="menu__contacts">
          {contacts.map(({ label, href, Icon }) => (
            <li key={label}>
              <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener"><Icon />{label} <Arrow /></a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

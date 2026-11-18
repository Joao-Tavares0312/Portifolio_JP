import {
  Bot, BriefcaseBusiness, Coffee, Database, GitBranch, GraduationCap, House, Languages, Sheet, Tags, Telescope,
} from "lucide-react";
import { TechIcon } from "./Tech";

const map = {
  work: BriefcaseBusiness, coffee: Coffee, study: GraduationCap, lang: Languages, astro: Telescope,
  sheet: Sheet, git: GitBranch, db: Database, bot: Bot, tags: Tags, home: House,
} as const;

/** Ícone de linha por chave do conteúdo (content.ts). "python" usa o logo da linguagem. */
export function Glyph({ name, size = 22 }: { name: string; size?: number }) {
  if (name === "python") return <TechIcon name="Python" size={size} />;
  const Icon = map[name as keyof typeof map];
  return Icon ? <Icon size={size} strokeWidth={1.5} aria-hidden="true" /> : null;
}

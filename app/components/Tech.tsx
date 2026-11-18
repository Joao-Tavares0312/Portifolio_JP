import {
  siArduino, siCplusplus, siDocker, siGoogletagmanager, siKotlin, siNextdotjs, siPostgresql, siPython,
  siReact, siSupabase, siTelegram, siTypescript, siVercel, siWebgpu,
} from "simple-icons";

const map: Record<string, { path: string }> = {
  Python: siPython, TypeScript: siTypescript, React: siReact, "Next.js": siNextdotjs, PostgreSQL: siPostgresql,
  Supabase: siSupabase, Docker: siDocker, Kotlin: siKotlin, "C++": siCplusplus, "C++ / Arduino": siArduino,
  Arduino: siArduino, "GTM server-side": siGoogletagmanager, WebGPU: siWebgpu, Vercel: siVercel, "Telegram API": siTelegram,
};

/** Logo da tecnologia em uma cor só (herda a cor do texto). Sem logo conhecido, não desenha nada. */
export function TechIcon({ name, size = 16 }: { name: string; size?: number }) {
  const icon = map[name];
  if (!icon) return null;
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true"><path d={icon.path} /></svg>;
}

/** Lista de tecnologias como etiquetas com logo. */
export function Techs({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`techs ${className}`}>
      {items.map((s) => <li key={s}><TechIcon name={s} />{s}</li>)}
    </ul>
  );
}

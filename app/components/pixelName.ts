/**
 * O nome "JOÃO PEDRO" desenhado em células, para a malha de pixels do fundo montar no hero.
 * Letras 5×7, com o til duas linhas acima do A. Em tela larga é uma linha só; em tela estreita, duas.
 */
const G: Record<string, string[]> = {
  J: ["....#", "....#", "....#", "....#", "#...#", "#...#", ".###."],
  O: [".###.", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
  A: [".###.", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
  P: ["####.", "#...#", "#...#", "####.", "#....", "#....", "#...."],
  E: ["#####", "#....", "#....", "####.", "#....", "#....", "#####"],
  D: ["####.", "#...#", "#...#", "#...#", "#...#", "#...#", "####."],
  R: ["####.", "#...#", "#...#", "####.", "#.#..", "#..#.", "#...#"],
};
const TILDE = [".#..#", "#.##."];
const TOP = 3; // linhas reservadas acima das letras para o til

export type Cell = { x: number; y: number };
export type NameLayout = { cols: number; rows: number; cells: Cell[] };

function word(text: string, x0: number, y0: number, out: Cell[]) {
  Array.from(text).forEach((ch, k) => {
    const base = ch === "Ã" ? "A" : ch;
    const x = x0 + k * 6;
    G[base].forEach((row, r) => { for (let c = 0; c < 5; c++) if (row[c] === "#") out.push({ x: x + c, y: y0 + r }); });
    if (ch === "Ã") TILDE.forEach((row, r) => { for (let c = 0; c < 5; c++) if (row[c] === "#") out.push({ x: x + c, y: y0 - TOP + r }); });
  });
}

/** Uma linha: 55×10 células. Duas linhas: 29×19. */
export function nameLayout(wide: boolean): NameLayout {
  const cells: Cell[] = [];
  if (wide) {
    word("JOÃO", 0, TOP, cells);
    word("PEDRO", 26, TOP, cells);
    return { cols: 55, rows: 10, cells };
  }
  word("JOÃO", 3, TOP, cells);
  word("PEDRO", 0, TOP + 9, cells);
  return { cols: 29, rows: 19, cells };
}

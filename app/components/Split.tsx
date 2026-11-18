/** Quebra o texto em letras dentro de máscaras por palavra; o CSS sobe cada letra em sequência. */
export function Split({ text, delay = 0, step = 22 }: { text: string; delay?: number; step?: number }) {
  let i = 0;
  return (
    <span className="split" aria-label={text}>
      {text.split(" ").map((word, w) => (
        <span key={w}>
          {w > 0 && " "}
          <span className="split__w" aria-hidden="true">
            {Array.from(word).map((ch, k) => (
              <span className="split__c" key={k} style={{ animationDelay: `${delay + i++ * step}ms` }}>{ch}</span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

import Reveal from "@/components/Reveal";
import RoomMedia from "@/components/RoomMedia";

const VALUES = [
  ["Honestidade", "acima de qualquer negócio"],
  ["Profissionalismo", "em cada detalhe"],
  ["Dedicação", "como se o sonho fosse nosso"],
  ["Rapidez", "porque sonho não pode esperar"],
  ["Melhoria contínua", "evoluir um pouco todos os dias"],
] as const;

/* Capítulo 03 — O que acreditamos · copy à esquerda, cozinha à direita */
export default function ChapterValues() {
  return (
    <section id="valores" className="grain relative overflow-hidden bg-night px-5 py-24 sm:px-8 lg:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="chapter-tag">Capítulo 03 — O que acreditamos</p>
          <h2 className="font-display mt-6 text-balance text-4xl font-bold leading-[1.12] text-ink sm:text-5xl">
            Valores que <span className="text-blue-500">não negociamos</span>
          </h2>

          <div className="mt-7 max-w-xl space-y-5 text-lg leading-relaxed text-body">
            <p>
              <span className="font-semibold text-ink">Nossa missão:</span> transformar a
              conquista do imóvel próprio em uma jornada segura, transparente e possível
              para cada família da Zona Oeste.
            </p>
            <p>
              <span className="font-semibold text-ink">Nossa visão:</span> ser a imobiliária
              mais confiável e admirada de Campo Grande e região — referência em realizar
              sonhos.
            </p>
          </div>

          <ul className="mt-8 space-y-3">
            {VALUES.map(([v, d]) => (
              <li
                key={v}
                className="flex items-baseline gap-3 rounded-xl border border-line bg-panel/70 px-5 py-3.5 transition-colors hover:border-blue-600/40"
              >
                <span className="h-2 w-2 shrink-0 translate-y-[-1px] rounded-full bg-blue-500" />
                <span>
                  <span className="font-semibold text-ink">{v}</span>{" "}
                  <span className="text-sm text-muted">— {d}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <RoomMedia
          src="/videos/cozinhaa.mp4"
          alt="Cozinha de apartamento decorado"
          caption="Cozinha"
        />
      </div>
    </section>
  );
}

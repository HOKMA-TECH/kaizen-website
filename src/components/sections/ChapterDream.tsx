import Reveal from "@/components/Reveal";
import RoomMedia from "@/components/RoomMedia";

/* Capítulo 01 — O Sonho · copy à esquerda, sala à direita */
export default function ChapterDream() {
  return (
    <section className="grain relative overflow-hidden bg-night px-5 py-24 sm:px-8 lg:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="chapter-tag">Capítulo 01 — O sonho</p>
          <h2 className="font-display mt-6 text-balance text-4xl font-bold leading-[1.12] text-ink sm:text-5xl">
            Tem sonho que cabe numa <span className="text-blue-500">sala de estar.</span>
          </h2>
          <div className="mt-7 max-w-xl space-y-5 text-lg leading-relaxed text-body">
            <p>
              O sofá onde a família se junta no domingo. A estante com as fotos de quem
              você ama. A TV do futebol, do filme, do desenho repetido pela décima vez.
            </p>
            <p>
              Tem sonho que é uma varanda com vista pro pôr do sol — e tem sonho que é{" "}
              <span className="text-ink">simplesmente parar de pagar aluguel.</span>
            </p>
            <p className="font-display text-xl font-semibold text-ink">
              A gente acredita que todo sonho merece virar{" "}
              <span className="text-blue-400">endereço.</span>
            </p>
          </div>
        </Reveal>

        <RoomMedia
          src="/videos/sala.mp4"
          alt="Sala de estar aconchegante de apartamento decorado"
          caption="Sala de estar"
        />
      </div>
    </section>
  );
}

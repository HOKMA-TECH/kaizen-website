import Reveal from "@/components/Reveal";
import PropertyCard from "@/components/PropertyCard";
import { PROPERTIES } from "@/lib/properties";
import { SITE } from "@/lib/site";

export default function FeaturedProperties() {
  return (
    <section id="imoveis" className="relative bg-abyss px-5 py-24 sm:px-8 lg:py-32">
      <div className="divider-glow absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="chapter-tag">Capítulo 05 — O encontro</p>
            <h2 className="font-display mt-5 max-w-2xl text-balance text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
              Cada imóvel abaixo já foi o sonho de alguém.{" "}
              <span className="text-blue-500">O próximo pode ser o seu.</span>
            </h2>
          </div>
          <a
            href={`${SITE.whatsapp}?text=Ol%C3%A1!%20Quero%20ver%20todos%20os%20im%C3%B3veis%20dispon%C3%ADveis.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Ver portfólio completo
          </a>
        </Reveal>

        <Reveal stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROPERTIES.map((p) => (
            <PropertyCard key={p.id} p={p} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

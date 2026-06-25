import Link from "next/link";
import Reveal from "@/components/Reveal";
import RealPropertyCard from "@/components/RealPropertyCard";
import { getFeaturedProperties } from "@/lib/realProperties";

export default async function FeaturedProperties() {
  const properties = await getFeaturedProperties(3);

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
          <Link href="/imoveis" className="btn btn-outline">
            Ver portfólio completo
          </Link>
        </Reveal>

        {properties.length > 0 ? (
          <Reveal stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((p) => (
              <RealPropertyCard key={p.id} p={p} />
            ))}
          </Reveal>
        ) : (
          <div className="mt-14 rounded-2xl border border-line bg-panel/60 py-16 text-center">
            <p className="font-display text-xl font-semibold text-ink">Novos imóveis em breve</p>
            <p className="mt-2 text-muted">Fale com a gente e conte o que você procura.</p>
            <Link href="/imoveis" className="btn btn-primary mt-6">
              Ver imóveis
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

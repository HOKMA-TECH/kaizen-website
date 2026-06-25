import Reveal from "@/components/Reveal";
import { TESTIMONIALS } from "@/lib/properties";

export default function Testimonials() {
  return (
    <section id="depoimentos" className="bg-mesh-dark relative bg-night px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="chapter-tag justify-center">Capítulo 06 — Quem viveu, conta</p>
          <h2 className="font-display mt-5 text-balance text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
            Histórias que já têm <span className="text-blue-500">endereço</span>
          </h2>
        </Reveal>

        <Reveal stagger className="mt-14 grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="card-dark flex flex-col p-7">
              <svg viewBox="0 0 24 24" className="h-8 w-8 fill-blue-600/50" aria-hidden>
                <path d="M10 7H6a3 3 0 00-3 3v7h7v-7H7a3 3 0 013-3zm11 0h-4a3 3 0 00-3 3v7h7v-7h-3a3 3 0 013-3z" />
              </svg>
              <blockquote className="mt-4 flex-1 leading-relaxed text-body">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-5">
                <div className="font-semibold text-ink">{t.name}</div>
                <div className="text-sm text-blue-400">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

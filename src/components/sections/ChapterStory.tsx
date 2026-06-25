"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import RoomMedia from "@/components/RoomMedia";
import { STATS } from "@/lib/site";

/* Capítulo 02 — A História · quarto à esquerda, copy à direita (zigue-zague) */
export default function ChapterStory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".story-fade", {
        y: 28,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".story-copy", start: "top 75%" },
      });

      // contadores
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString("pt-BR");
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="historia"
      className="bg-mesh-dark relative overflow-hidden bg-abyss px-5 py-24 sm:px-8 lg:py-36"
    >
      <div className="divider-glow absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* mídia primeiro no desktop (zigue-zague); no mobile a copy vem antes */}
          <div className="order-2 lg:order-1">
            <RoomMedia
              src="/videos/quarto.mp4"
              alt="Quarto aconchegante de apartamento decorado"
              caption="Quarto"
              reverse
            />
          </div>

          <div className="story-copy order-1 lg:order-2">
            <p className="story-fade chapter-tag">Capítulo 02 — A história</p>
            <h2 className="story-fade font-display mt-6 text-balance text-4xl font-bold leading-[1.12] text-ink sm:text-5xl">
              <span className="text-blue-500">Kaizen</span> significa{" "}
              <span className="italic">melhoria contínua.</span>
            </h2>

            <div className="story-fade mt-7 max-w-xl space-y-5 text-lg leading-relaxed text-body">
              <p>
                Foi com essa filosofia que nascemos, há 3 anos, no coração de{" "}
                <span className="text-ink">Campo Grande</span>. Começamos como todo grande
                sonho começa: pequenos, e com vontade de fazer diferente.
              </p>
              <p>
                Hoje somos <span className="text-ink">mais de 100 corretores e parceiros</span>{" "}
                altamente qualificados, com vasta experiência no mercado imobiliário. Gente
                daqui, que conhece cada rua da Zona Oeste — e que trata o seu sonho como se
                fosse o próprio.
              </p>
              <p>
                É assim que já ajudamos mais de <span className="text-ink">1.500 famílias</span>{" "}
                a conquistarem as chaves do próprio lar: com profissionalismo, dedicação,
                rapidez e, acima de tudo, <span className="text-blue-400">honestidade</span>.
              </p>
            </div>
          </div>
        </div>

        {/* estatísticas */}
        <div className="mt-20">
          <div className="divider-glow" />
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-4xl font-bold text-ink sm:text-5xl">
                  <span data-count={s.value}>0</span>
                  <span className="text-blue-500">{s.suffix}</span>
                </div>
                <div className="mt-2 text-sm text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

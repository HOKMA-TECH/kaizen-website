"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROCESS_STEPS } from "@/lib/properties";
import { SITE } from "@/lib/site";

export default function Journey() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // linha central cresce conforme o scroll
      gsap.fromTo(
        ".journey-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".journey-steps",
            start: "top 70%",
            end: "bottom 55%",
            scrub: 0.4,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".journey-step").forEach((el, i) => {
        gsap.from(el, {
          x: i % 2 === 0 ? -36 : 36,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="jornada" className="bg-mesh-dark relative bg-abyss px-5 py-28 sm:px-8 lg:py-36">
      <div className="divider-glow absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="chapter-tag justify-center">Capítulo 04 — A jornada</p>
          <h2 className="font-display mt-6 text-balance text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
            Sua jornada até as <span className="text-blue-500">chaves</span>
          </h2>
          <p className="mt-5 text-lg text-body">
            Quatro passos. Zero dor de cabeça. A gente cuida do caminho, você cuida do sonho.
          </p>
        </div>

        <div className="journey-steps relative mt-20">
          {/* linha central (esquerda no mobile) */}
          <div className="journey-line absolute left-[15px] top-0 h-full w-px sm:left-1/2" />

          <div className="space-y-14 sm:space-y-20">
            {PROCESS_STEPS.map((s, i) => (
              <div
                key={s.step}
                className={`journey-step relative flex flex-col gap-4 pl-12 sm:w-1/2 sm:pl-0 ${
                  i % 2 === 0
                    ? "sm:pr-14 sm:text-right"
                    : "sm:ml-auto sm:pl-14"
                }`}
              >
                {/* nó na linha */}
                <span
                  className={`absolute top-1 flex h-8 w-8 items-center justify-center rounded-full border border-blue-600/50 bg-panel text-xs font-bold text-blue-400 shadow-glow left-0 ${
                    i % 2 === 0 ? "sm:left-auto sm:-right-4" : "sm:-left-4"
                  }`}
                >
                  {s.step}
                </span>
                <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                  {s.title}
                </h3>
                <p className="leading-relaxed text-body">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <a
            href={`${SITE.whatsapp}?text=Ol%C3%A1!%20Quero%20come%C3%A7ar%20minha%20jornada%20at%C3%A9%20as%20chaves.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Dar o primeiro passo
          </a>
        </div>
      </div>
    </section>
  );
}

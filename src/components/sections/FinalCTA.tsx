"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SITE } from "@/lib/site";

export default function FinalCTA() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!reduce) {
        gsap.fromTo(
          ".final-title",
          { scale: 0.82, autoAlpha: 0.3 },
          {
            scale: 1,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 85%",
              end: "center 55%",
              scrub: 0.5,
            },
          }
        );
        gsap.to(".final-orb", {
          yPercent: -30,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }

      gsap.from(".final-actions", {
        y: 24,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: { trigger: ".final-actions", start: "top 88%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="grain relative flex min-h-[80svh] items-center overflow-hidden bg-night px-5 py-28 text-center sm:px-8"
    >
      <div className="final-orb orb left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 bg-blue-700/25" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <p className="chapter-tag justify-center">Capítulo final — o seu</p>
        <h2 className="final-title font-display mt-8 text-balance text-5xl font-bold leading-[1.05] text-ink sm:text-7xl">
          Mais de 1.500 histórias já têm endereço.{" "}
          <span className="bg-gradient-to-r from-blue-500 via-glow to-blue-400 bg-clip-text text-transparent">
            A sua começa hoje.
          </span>
        </h2>

        <div className="final-actions mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`${SITE.whatsapp}?text=Ol%C3%A1!%20Quero%20escrever%20minha%20hist%C3%B3ria%20com%20a%20Kaizen.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary !px-8 !py-4 text-base"
          >
            Falar com um corretor agora
          </a>
          <button
            onClick={() =>
              document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn btn-outline"
          >
            Deixar meus dados
          </button>
        </div>

        <p className="mt-8 text-sm text-faint">
          Atendimento rápido e seguro · {SITE.creci}
        </p>
      </div>
    </section>
  );
}

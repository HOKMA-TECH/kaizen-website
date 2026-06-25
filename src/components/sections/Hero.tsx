"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SITE } from "@/lib/site";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set("[data-hero]", { autoAlpha: 1, y: 0, yPercent: 0 });
        return;
      }

      // entrada: linhas do título sobem de máscaras
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          "[data-hero='eyebrow']",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.8, delay: 0.2 }
        )
        .fromTo(
          ".hero-line",
          { yPercent: 115 },
          { yPercent: 0, duration: 1.2, stagger: 0.14, ease: "power4.out" },
          "-=0.4"
        )
        .fromTo(
          "[data-hero='sub']",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          "[data-hero='cta']",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          "[data-hero='hint']",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1 },
          "-=0.3"
        );

      // parallax: orbes e palavra de fundo em velocidades diferentes
      gsap.to(".orb-1", {
        yPercent: 45,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".orb-2", {
        yPercent: -35,
        xPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-bgword", {
        xPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      // o conteúdo sai mais devagar que o scroll (parallax de saída)
      gsap.to(".hero-content", {
        yPercent: 18,
        autoAlpha: 0.25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="hero"
      className="bg-hero-gradient grain relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* luzes em parallax */}
      <div className="orb orb-1 left-[-10%] top-[8%] h-[420px] w-[420px] bg-blue-700/30" />
      <div className="orb orb-2 right-[-12%] bottom-[-5%] h-[520px] w-[520px] bg-blue-600/20" />

      {/* palavra de marca gigante ao fundo */}
      <div
        className="hero-bgword brand-word font-display pointer-events-none absolute inset-x-0 bottom-[3%] select-none text-center text-[23vw] font-extrabold leading-none"
        aria-hidden
      >
        KAIZEN
      </div>

      <div className="hero-content relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 pt-32 sm:px-8">
        <p data-hero="eyebrow" className="eyebrow invisible">
          Kaizen Soluções Imobiliárias — Campo Grande · RJ
        </p>

        <h1 className="font-display mt-7 max-w-5xl text-balance text-[2.7rem] font-bold leading-[1.04] text-ink sm:text-6xl lg:text-[5.2rem]">
          <span className="block overflow-hidden pb-1">
            <span className="hero-line block">Todo sonho merece</span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span className="hero-line block">
              um{" "}
              <span className="bg-gradient-to-r from-blue-500 via-glow to-blue-400 bg-clip-text italic text-transparent">
                endereço.
              </span>
            </span>
          </span>
        </h1>

        <p
          data-hero="sub"
          className="invisible mt-8 max-w-xl text-lg leading-relaxed text-body"
        >
          Somos a Kaizen. Há 3 anos ajudamos famílias da Zona Oeste a conquistar
          o que é delas: <span className="text-ink">as chaves do próprio lar.</span>
        </p>

        <div data-hero="cta" className="invisible mt-10 flex flex-wrap items-center gap-4">
          <a
            href={`${SITE.whatsapp}?text=Ol%C3%A1!%20Quero%20conquistar%20meu%20im%C3%B3vel%20em%20Campo%20Grande.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Começar minha história
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
              <path d="M11.3 3.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.29-4.3H2a1 1 0 1 1 0-2h13.59l-4.3-4.3a1 1 0 0 1 0-1.4Z" />
            </svg>
          </a>
          <button
            onClick={() =>
              document.querySelector("#imoveis")?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn btn-outline"
          >
            Ver imóveis
          </button>
        </div>

        <div
          data-hero="hint"
          className="invisible mt-20 flex items-center gap-3 text-xs uppercase tracking-luxe text-faint"
        >
          <span className="relative flex h-9 w-5 items-start justify-center rounded-full border border-line p-1.5">
            <span className="h-1.5 w-1 animate-bounce rounded-full bg-blue-500" />
          </span>
          Role e conheça nossa história
        </div>
      </div>
    </section>
  );
}

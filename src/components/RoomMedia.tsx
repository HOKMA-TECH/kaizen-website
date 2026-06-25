"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

type RoomMediaProps = {
  /** Caminho de imagem (jpg/png/webp) ou vídeo (.mp4/.webm). Vídeo: autoplay mudo em loop. */
  src: string;
  alt: string;
  /** Legenda do chip flutuante, ex.: "Sala de estar" */
  caption: string;
  /** Inverte a direção do pan do Ken Burns para variar entre capítulos */
  reverse?: boolean;
};

const isVideo = (src: string) => /\.(mp4|webm)$/i.test(src);

/**
 * Mídia de cômodo: fica fixa na posição (sem parallax) e surge com uma
 * animação de revelação ao entrar na tela. Ken Burns (zoom+pan) só em
 * imagens; vídeo (.mp4/.webm) toca em autoplay mudo e em loop.
 */
export default function RoomMedia({ src, alt, caption, reverse = false }: RoomMediaProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // Ken Burns contínuo apenas para imagem (vídeo já tem movimento próprio)
      if (!isVideo(src)) {
        gsap.fromTo(
          ".room-media",
          { scale: 1.08, xPercent: reverse ? 2.5 : -2.5 },
          {
            scale: 1.18,
            xPercent: reverse ? -2.5 : 2.5,
            duration: 14,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          }
        );
      }

      // surgimento: a mídia se revela por máscara, sobe e dá foco — uma vez só
      gsap.from(".room-frame", {
        clipPath: "inset(16% 16% 16% 16% round 24px)",
        autoAlpha: 0,
        y: 40,
        scale: 0.96,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });
    },
    { scope: root, dependencies: [src, reverse] }
  );

  return (
    <div ref={root} className="relative">
      {/* brilho atrás da moldura */}
      <div className="absolute -inset-6 rounded-[2.5rem] bg-blue-600/10 blur-2xl" aria-hidden />

      <div className="room-frame relative aspect-[4/5] overflow-hidden rounded-3xl ring-1 ring-line shadow-card sm:aspect-[5/6] lg:aspect-[4/5]">
        {isVideo(src) ? (
          <video
            src={src}
            className="room-media h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            aria-label={alt}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} loading="lazy" className="room-media h-full w-full object-cover" />
        )}
        {/* integra a foto ao tema dark */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/55 via-transparent to-night/10" />

        {/* chip de legenda */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-line bg-night/70 px-4 py-2 backdrop-blur-md">
          <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
          <span className="text-xs font-semibold uppercase tracking-wider text-ink">{caption}</span>
        </div>
      </div>
    </div>
  );
}

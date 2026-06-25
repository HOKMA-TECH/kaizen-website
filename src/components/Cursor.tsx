"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/** Brilho azul que segue o mouse — desktop apenas (CSS esconde em touch). */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // começa fora da tela até o primeiro mousemove
  return <div ref={ref} className="cursor-glow" style={{ transform: "translate(-100vw, -100vh)" }} aria-hidden />;
}

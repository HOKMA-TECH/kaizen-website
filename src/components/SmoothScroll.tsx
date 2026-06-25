"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ScrollSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    // Drive ScrollTrigger from Lenis' scroll loop.
    lenis.on("scroll", ScrollTrigger.update);
    const onRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    if (process.env.NODE_ENV !== "production") {
      (window as unknown as Record<string, unknown>).__lenis = lenis;
      (window as unknown as Record<string, unknown>).__gsap = gsap;
    }
    return () => {
      gsap.ticker.remove(onRaf);
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  return null;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <ReactLenis
      root
      autoRaf={false}
      options={{
        lerp: 0.09,
        duration: 1.25,
        smoothWheel: !reduce,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
      }}
    >
      <ScrollSync />
      {children}
    </ReactLenis>
  );
}

"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  /** Stagger direct children instead of animating the container as one block. */
  stagger?: boolean;
  id?: string;
};

export default function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 22,
  stagger = false,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = stagger ? Array.from(el.children) : el;
      if (stagger) gsap.set(el, { opacity: 1 });

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          delay,
          ease: "power2.out",
          stagger: stagger ? 0.1 : 0,
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} id={id} data-reveal>
      {children}
    </Tag>
  );
}

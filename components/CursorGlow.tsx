"use client";
import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const dot = dotRef.current!;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      // Ignore touch drags to avoid weirdness on mobile
      if (e.pointerType === "touch") return;
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.opacity = "1";
    };

    const onLeave = () => {
      dot.style.opacity = "0"; // fade when leaving window
    };

    const tick = () => {
      // LERP for buttery follow
      x += (targetX - x) * 0.15;
      y += (targetY - y) * 0.15;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={dotRef} className="cursor-glow" aria-hidden="true" />;
}

"use client";
import { useRef, type MouseEvent, type ReactNode } from "react";

/**
 * Magnetic wrapper that subtly pulls toward the cursor.
 * Simpler typing (always renders a <span/>) to keep TS happy on Vercel.
 */
type Props = {
  children: ReactNode;
  strength?: number;                // default 6px
  className?: string;
  style?: React.CSSProperties;
  as?: "span" | "div" | "a" | "button"; // accepted but ignored (for compatibility)
};

export default function Magnetic({
  children,
  strength = 6,
  className,
  style,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);

  const onMouseMove = (e: MouseEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${(x / (r.width / 2)) * strength}px, ${(y / (r.height / 2)) * strength}px)`;
    el.style.transition = "transform 0.06s ease-out";
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
    el.style.transition = "transform 0.25s ease";
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={style}
    >
      {children}
    </span>
  );
}

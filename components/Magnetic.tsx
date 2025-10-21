"use client";
import { useRef, MouseEvent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  strength?: number; // px offset toward cursor (default 6)
  as?: keyof JSX.IntrinsicElements; // wrapper element, default 'div'
  style?: React.CSSProperties;
  className?: string;
};

export default function Magnetic({
  children,
  strength = 6,
  as: As = "div",
  style,
  className,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
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
    <As
      ref={ref as any}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={style}
    >
      {children}
    </As>
  );
}

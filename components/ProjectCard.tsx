"use client";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { useRef, type MouseEvent } from "react";

export default function ProjectCard({ p }: { p: Project }) {
  const isSoon = !!p.comingSoon;

  // Magnetic hover helpers
  const magnetize =
    (ref: React.RefObject<HTMLElement>, strength = 6) =>
    (e: MouseEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${(x / (r.width / 2)) * strength}px, ${(y / (r.height / 2)) * strength}px)`;
      el.style.transition = "transform 0.06s ease-out";
    };

  const demagnetize = (ref: React.RefObject<HTMLElement>) => () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
    el.style.transition = "transform 0.25s ease";
  };

  const liveRef = useRef<HTMLAnchorElement>(null);
  const codeRef = useRef<HTMLAnchorElement>(null);
  const caseRef = useRef<HTMLAnchorElement>(null);

  return (
    <article
      className="card"
      aria-labelledby={`${p.slug}-title`}
      style={{ display: "flex", flexDirection: "column", gap: 10, position: "relative", opacity: isSoon ? 0.9 : 1 }}
    >
      {/* IMAGE (next/image) */}
      <div
        className="shimmer"
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid var(--border-soft)",
          position: "relative",
          background:
            "linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.03))",
          filter: isSoon ? "grayscale(0.15)" : "none",
        }}
      >
        {p.image ? (
          <Image
            src={p.image}
            alt={`${p.title} preview`}
            // Use fill + objectFit for responsive cover
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            priority={false}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
            }}
          >
            <span className="muted">{p.title} preview</span>
          </div>
        )}
      </div>

      {/* Title */}
      <h3 id={`${p.slug}-title`} className="glow-title" style={{ margin: "10px 0 2px", fontSize: "1.1rem" }}>
        {p.title}
      </h3>

      {/* Summary */}
      <p className="muted" style={{ margin: 0 }}>{p.summary}</p>

      {/* Tech chips */}
      <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
        {p.tech.slice(0, 4).map((t) => (
          <span
            key={t}
            style={{
              display: "inline-block",
              padding: "4px 10px",
              border: "1px solid var(--border-soft)",
              borderRadius: 999,
              fontSize: 12,
              color: "var(--text-dim)",
              background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.00))",
              backdropFilter: "blur(6px)",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="actions" style={{ marginTop: 8 }}>
        {isSoon ? (
          <span
            aria-disabled="true"
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid var(--border-soft)",
              color: "var(--text-dim)",
              background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.00))",
              backdropFilter: "blur(6px)",
            }}
          >
            Stay tuned
          </span>
        ) : (
          <>
            {p.liveUrl && (
              <a
                ref={liveRef}
                className="btn primary"
                href={p.liveUrl}
                target="_blank"
                rel="noreferrer"
                title={`Open ${p.title} live demo`}
                onMouseMove={magnetize(liveRef)}
                onMouseLeave={demagnetize(liveRef)}
              >
                Live
              </a>
            )}
            {p.repoUrl && (
              <a
                ref={codeRef}
                className="btn"
                href={p.repoUrl}
                target="_blank"
                rel="noreferrer"
                title={`View ${p.title} source code`}
                onMouseMove={magnetize(codeRef)}
                onMouseLeave={demagnetize(codeRef)}
              >
                Code
              </a>
            )}
            <Link
              ref={caseRef}
              className="btn"
              href={`/projects/${p.slug}`}
              title="Case study"
              onMouseMove={magnetize(caseRef)}
              onMouseLeave={demagnetize(caseRef)}
            >
              Case study
            </Link>
          </>
        )}
      </div>
    </article>
  );
}

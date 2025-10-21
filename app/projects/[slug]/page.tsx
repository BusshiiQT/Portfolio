"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { projects } from "@/data/projects";

export default function ProjectPage() {
  // Read the dynamic route param safely in a client component
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const p = projects.find((proj) => proj.slug === slug);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  if (!p) return <div>Project not found.</div>;

  return (
    <div style={{ padding: "2rem 1rem", maxWidth: 900, margin: "0 auto" }}>
      {/* Title + Summary */}
      <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>{p.title}</h1>
      <p style={{ marginTop: 8, color: "var(--muted)" }}>{p.summary}</p>

      {/* Main image (click to enlarge) */}
      {p.image && (
        <div style={{ marginTop: 16 }}>
          <img
            src={p.image}
            alt={p.title}
            style={{
              maxWidth: "100%",
              borderRadius: 12,
              boxShadow: "0 0 10px rgba(0,0,0,0.25)",
              cursor: "pointer",
            }}
            onClick={() => setLightboxImage(p.image!)}
          />
        </div>
      )}

      {/* Screenshot gallery */}
      {p.images && p.images.length > 1 && (
        <section style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 12 }}>
            Screenshots
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: 12,
            }}
          >
            {p.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${p.title} screenshot ${i + 1}`}
                style={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 12,
                  cursor: "pointer",
                  boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                  transition: "transform 0.2s ease",
                }}
                onClick={() => setLightboxImage(src)}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            ))}
          </div>
        </section>
      )}

      {/* Highlights */}
      {p.highlights?.length ? (
        <section style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 12 }}>
            Highlights
          </h2>
          <ul style={{ paddingLeft: 20, lineHeight: 1.6 }}>
            {p.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Tech stack */}
      {p.tech?.length ? (
        <section style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 12 }}>
            Tech Stack
          </h2>
          <p>{p.tech.join(" · ")}</p>
        </section>
      ) : null}

      {/* Links */}
      <section style={{ marginTop: 32 }}>
        <a
          href={p.liveUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            marginRight: 16,
            background: "var(--accent)",
            color: "#fff",
            padding: "10px 18px",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          Live Demo
        </a>
        <a
          href={p.repoUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            background: "transparent",
            color: "var(--accent)",
            border: "2px solid var(--accent)",
            padding: "8px 16px",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          View Code
        </a>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            cursor: "zoom-out",
          }}
        >
          <img
            src={lightboxImage}
            alt="Full size"
            style={{
              maxHeight: "90%",
              maxWidth: "90%",
              borderRadius: 12,
              boxShadow: "0 0 20px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      )}
    </div>
  );
}

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Magnetic from "@/components/Magnetic";

type SectionKey = "home" | "projects" | "about";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionKey>("home");

  // Helper: map hash -> SectionKey
  const keyFromHash = (hash: string): SectionKey => {
    if (hash === "#projects") return "projects";
    if (hash === "#about") return "about";
    return "home";
  };

  // Smooth-scroll to an element if present
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    // Offset for sticky header: use scroll-margin-top in CSS, but fallback here too
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Observe sections to keep active state while scrolling
  useEffect(() => {
    const projectsEl = document.getElementById("projects");
    const aboutEl = document.getElementById("about");

    const entriesToSection = new Map<Element, SectionKey>();
    if (projectsEl) entriesToSection.set(projectsEl, "projects");
    if (aboutEl) entriesToSection.set(aboutEl, "about");

    if (entriesToSection.size === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          const sec = entriesToSection.get(visible.target);
          if (sec) setActive(sec);
        } else {
          // If nothing is intersecting, assume home (top) while scrolling
          // (the hash listener will correct it when user uses back/forward)
          setActive("home");
        }
      },
      {
        root: null,
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    entriesToSection.forEach((_v, el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Sync active with hash on load + back/forward
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash;
      const key = keyFromHash(hash);
      setActive(key);
      if (hash === "#projects" || hash === "#about") {
        // ensure we land precisely on the section if the page height changed
        scrollToId(hash.substring(1));
      }
    };
    // On mount
    applyHash();

    // On hash change / popstate
    const onHash = () => applyHash();
    const onPop = () => applyHash();
    window.addEventListener("hashchange", onHash);
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  const linkClass = (key: SectionKey) =>
    `header-link ${active === key ? "is-active" : ""}`;

  return (
    <header
      className="glass"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        border: "1px solid rgba(255,255,255,0.06)",
        margin: "0 auto",
        maxWidth: "1100px",
        marginTop: "1rem",
        padding: "0.5rem 0.75rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          justifyContent: "space-between",
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          className="glow-title"
          style={{ fontSize: "1rem", letterSpacing: "0.05em" }}
          aria-label="Home"
          onClick={() => setActive("home")}
        >
          Hector&nbsp;Virrey
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          style={{ display: "none", gap: "0.25rem" }}
          className="nav-desktop"
        >
          <Magnetic as="span">
            <a
              href="/#projects"
              className={linkClass("projects")}
              onClick={() => setActive("projects")}
            >
              Projects
            </a>
          </Magnetic>

          <Magnetic as="span">
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="header-link">
              Resume
            </a>
          </Magnetic>

          <Magnetic as="span">
            <a
              href="mailto:hv.fin25@gmail.com"
              className="btn"
              style={{ padding: "0.45rem 0.75rem" }}
            >
              Contact
            </a>
          </Magnetic>
        </nav>

        {/* Mobile menu button */}
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 38,
            height: 34,
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "transparent",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 18,
              height: 2,
              background: "var(--text)",
              position: "relative",
              display: "inline-block",
            }}
          >
            <span
              style={{
                content: '""',
                position: "absolute",
                left: 0,
                top: -6,
                width: 18,
                height: 2,
                background: "var(--text)",
              }}
            />
            <span
              style={{
                content: '""',
                position: "absolute",
                left: 0,
                top: 6,
                width: 18,
                height: 2,
                background: "var(--text)",
              }}
            />
          </span>
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div
          className="glass"
          style={{
            marginTop: "0.5rem",
            padding: "0.5rem",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ display: "grid", gap: "0.35rem" }}>
            <a
              href="/#projects"
              onClick={() => {
                setOpen(false);
                setActive("projects");
              }}
              className={`header-link ${active === "projects" ? "is-active" : ""}`}
              style={{ width: "fit-content" }}
            >
              Projects
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="header-link"
              style={{ width: "fit-content" }}
            >
              Resume
            </a>
            <a
              href="mailto:hv.fin25@gmail.com"
              onClick={() => setOpen(false)}
              className="btn"
              style={{ padding: "0.6rem 0.75rem", width: "fit-content" }}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

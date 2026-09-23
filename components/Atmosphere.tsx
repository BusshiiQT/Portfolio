"use client";

import { useEffect, useRef } from "react";

const stops = [
  { id: "home", x: 12, y: 88 },
  { id: "projects", x: 12, y: 12 },
  { id: "products", x: 88, y: 12 },
  { id: "about", x: 88, y: 88 },
  { id: "contact", x: 12, y: 88 },
];

export default function Atmosphere() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = root.current;
    if (!layer) return;
    const header = document.querySelector<HTMLElement>(".site-header");
    const nav = header?.querySelector("nav");
    const sections = stops.map((stop) => document.getElementById(stop.id)!);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let anchors: number[] = [];
    let sectionTops: number[] = [];
    let observer: IntersectionObserver | undefined;
    const animations = new Set<Animation>();

    const update = () => {
      frame = 0;
      const scroll = window.scrollY;
      header?.toggleAttribute("data-floating", scroll > 110);
      const focusLine = scroll + window.innerHeight * 0.4;
      let active = "";
      sectionTops.forEach((top, index) => {
        if (top <= focusLine) {
          active = index === 0 ? "" : index < 3 ? "projects" : stops[index].id;
        }
      });
      nav?.querySelectorAll("a").forEach((link) => {
        if (active && link.hash === `#${active}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      if (preference.matches) return;
      let index = 0;
      while (index < anchors.length - 2 && scroll > anchors[index + 1]) index++;
      const progress = Math.max(0, Math.min(1,
        (scroll - anchors[index]) / Math.max(1, anchors[index + 1] - anchors[index])));
      // Smoothstep joins the section waypoints without a position jump.
      const blend = progress * progress * (3 - 2 * progress);
      const start = stops[index];
      const end = stops[index + 1];
      layer.style.setProperty("--light-x", `${start.x + (end.x - start.x) * blend}%`);
      layer.style.setProperty("--light-y", `${start.y + (end.y - start.y) * blend}%`);
    };
    const schedule = () => {
      if (!frame && !document.hidden) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      sectionTops = sections.map((section) => section.getBoundingClientRect().top + window.scrollY);
      anchors = sectionTops.map((top, index) => index === 0 ? 0 :
        Math.min(maxScroll, top - window.innerHeight * 0.25));
      schedule();
    };
    const configureReveals = () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      if (preference.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          observer?.unobserve(element);
          if (element.dataset.revealed) return;
          element.dataset.revealed = "true";
          const heroIndex = Array.from(document.querySelectorAll(".hero-copy > *, .hero-visual")).indexOf(element);
          // No hidden CSS state: failed/disabled JavaScript leaves server content visible.
          const animation = element.animate([
            { opacity: 0, transform: "translateY(24px)" },
            { opacity: 1, transform: "translateY(0)" },
          ], { duration: 650, delay: heroIndex >= 0 ? heroIndex * 65 : 0,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" });
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        });
      }, { threshold: 0.08 });
      document.querySelectorAll(".hero-copy > *, .hero-visual, .home-section > .eyebrow, .featured-heading, .featured-image, #products > h2, .product-story, .about-teaser > div, #contact > h2, .contact-bottom")
        .forEach((element) => observer?.observe(element));
    };
    const onPreference = () => {
      configureReveals();
      layer.style.removeProperty("--light-x");
      layer.style.removeProperty("--light-y");
      schedule();
    };
    const onVisibility = () => {
      layer.toggleAttribute("data-paused", document.hidden);
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
      else measure();
    };
    const onFocus = (event: FocusEvent) => {
      // Keyboard focus should never land inside a temporarily transparent entrance.
      animations.forEach((animation) => {
        const target = (animation.effect as KeyframeEffect).target;
        if (target instanceof Element && target.contains(event.target as Node)) animation.finish();
      });
    };
    const resize = new ResizeObserver(measure);
    sections.forEach((section) => resize.observe(section));
    measure();
    configureReveals();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("focusin", onFocus);
    preference.addEventListener("change", onPreference);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      resize.disconnect();
      animations.forEach((animation) => animation.cancel());
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("focusin", onFocus);
      preference.removeEventListener("change", onPreference);
      header?.removeAttribute("data-floating");
      nav?.querySelectorAll("a").forEach((link) => link.removeAttribute("aria-current"));
    };
  }, []);

  return <div ref={root} className="atmosphere" aria-hidden="true">
    <div className="atmosphere-position"><div className="atmosphere-light" /></div>
    <div className="atmosphere-grain" />
  </div>;
}

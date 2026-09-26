import type { Metadata } from "next";
import Image from "next/image";
import Atmosphere from "@/components/Atmosphere";
import { sharedOpenGraph, sharedTwitter } from "../../lib/seo";

const description = "Learn about Hector Virrey, a full-stack developer building thoughtful web products and currently pursuing a B.S. in Computer Science at Western Governors University.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: { ...sharedOpenGraph, title: "About | Hector Virrey", description, url: "/about" },
  twitter: { ...sharedTwitter, title: "About | Hector Virrey", description },
};

const approach = [
  { title: "Product + UI", copy: "Turning a problem into a clear interface and usable product experience." },
  { title: "Full-stack engineering", copy: "Connecting frontend behavior with application logic, authentication, APIs, databases, and data flows." },
  { title: "Ship + improve", copy: "Testing, debugging, deploying, reviewing the real product, and iterating." },
];

const technologies = [
  { label: "Interface", items: ["JavaScript", "TypeScript", "React", "Next.js", "HTML", "CSS", "Tailwind CSS"] },
  { label: "Systems + data", items: ["Supabase", "PostgreSQL", "REST APIs", "Authentication"] },
  { label: "Delivery + craft", items: ["Git", "GitHub", "Vercel", "Responsive Design", "Accessibility"] },
];

const products = [
  { name: "PetCare Hub", description: "Service marketplace / booking platform" },
  { name: "GigMate", description: "Gig-work earnings tracker" },
  { name: "NeighborLink", description: "Local marketplace" },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function AboutPage() {
  return (
    <div className="about-page">
      <Atmosphere mode="about" />
      <section className="about-intro content-width" aria-labelledby="about-intro-title">
        <div className="about-intro-copy">
          <p className="eyebrow" data-reveal>ABOUT / HECTOR VIRREY</p>
          <h1 id="about-intro-title" data-reveal>I build software from problem to product.</h1>
          <p className="hero-description" data-reveal>I&apos;m a full-stack developer who enjoys taking an idea from the first interface through the backend logic, database, and deployment.</p>
          <p data-reveal>Currently pursuing a B.S. in Computer Science at Western Governors University.</p>
        </div>
        <div className="about-portrait" data-reveal>
          <Image src="/images/hector-portrait.png" alt="Hector Virrey, full-stack developer" fill sizes="(max-width: 700px) min(92vw, 448px), (max-width: 1300px) 42vw, 500px" priority />
        </div>
      </section>

      <section className="home-section about-story content-width" aria-labelledby="story-title">
        <div data-reveal>
          <p className="eyebrow">01 / THE STORY SO FAR</p>
          <h2 id="story-title">Building things taught me how much I wanted to understand what was underneath them.</h2>
        </div>
        <div className="about-prose" data-reveal>
          <p>I&apos;m Hector Virrey, a full-stack developer and software engineer in the Chicago, Illinois area.</p>
          <p>Building PetCare Hub, GigMate, and NeighborLink has taken me across the full stack: from interfaces and application logic to authentication, databases, APIs, and deployment.</p>
          <p>Working through those connections, and debugging when they don&apos;t behave as expected, is what keeps me interested. I want to understand how each part supports the experience someone actually uses.</p>
          <p>Building these products has also pushed me to strengthen my programming fundamentals and deepen my understanding of the systems behind the code. I&apos;m constantly working to become more independent as an engineer—not just knowing what works, but understanding why it works.</p>
        </div>
      </section>

      <section className="home-section content-width" aria-labelledby="approach-title">
        <div data-reveal>
          <p className="eyebrow">02 / HOW I BUILD</p>
          <h2 id="approach-title">From the first question<br />to the next improvement.</h2>
        </div>
        <ol className="about-approach">
          {approach.map((step, index) => (
            <li key={step.title} data-reveal>
              <span className="about-step-number" aria-hidden="true">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-section about-tools content-width" aria-labelledby="tools-title">
        <div data-reveal>
          <p className="eyebrow">03 / TECHNOLOGIES</p>
          <h2 id="tools-title">Tools I work with.</h2>
        </div>
        <div className="about-tool-groups">
          {technologies.map((group) => (
            <div key={group.label} data-reveal>
              <h3>{group.label}</h3>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section about-products content-width" aria-labelledby="selected-title">
        <div data-reveal>
          <p className="eyebrow">04 / SELECTED PRODUCTS</p>
          <h2 id="selected-title">Ideas put into practice.</h2>
        </div>
        <ul className="about-product-list">
          {products.map((product) => (
            <li key={product.name} data-reveal>
              <a href="/#work" aria-label={`${product.name}: view selected work on the homepage`}>
                <span className="about-product-name">{product.name}</span>
                <span className="about-product-description">{product.description}</span>
                <Arrow />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-section about-closing content-width" aria-labelledby="opportunity-title">
        <p className="eyebrow" data-reveal>05 / WHAT&apos;S NEXT</p>
        <h2 id="opportunity-title" data-reveal>I&apos;m looking for the next<br />problem worth solving.</h2>
        <p data-reveal>I&apos;m currently open to junior and full-stack software development opportunities where I can contribute, learn quickly, and keep building useful products.</p>
        <div className="hero-actions" data-reveal>
          <a className="editorial-button" href="/#work">VIEW MY WORK <Arrow /></a>
          <a className="text-link" href="mailto:hv.fin25@gmail.com">GET IN TOUCH <Arrow /></a>
          <a className="text-link" href="/resume.pdf">RESUME <Arrow /></a>
        </div>
      </section>
    </div>
  );
}

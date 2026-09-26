import Image from "next/image";
import type { Metadata } from "next";
import { sharedOpenGraph, siteTitle, siteDescription } from "../lib/seo";
import Atmosphere from "@/components/Atmosphere";
import HeroPhotoStack from "@/components/HeroPhotoStack";
import { projects, type Project } from "@/data/projects";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...sharedOpenGraph, title: siteTitle, description: siteDescription, url: "/" },
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function ProjectLinks({ project }: { project: Project }) {
  if (!project.liveUrl && !project.repoUrl) return null;
  return (
    <div className="project-links">
      {project.liveUrl && <a className="text-link" href={project.liveUrl} aria-label={`Live product: ${project.title}`}>LIVE PRODUCT <Arrow /></a>}
      {project.repoUrl && <a className="text-link" href={project.repoUrl} aria-label={`GitHub: ${project.title}`}>GITHUB <Arrow /></a>}
    </div>
  );
}

export default function Page() {
  const [petCare, ...moreProjects] = projects;

  return (
    <div className="homepage">
      <Atmosphere />
      <section id="home" className="home-hero content-width" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">HECTOR VIRREY / FULL-STACK DEVELOPER</p>
          <h1 id="hero-title"><span>I build software</span><span>that turns ideas</span><span>into products.</span></h1>
          <p className="hero-description">Full-stack developer building thoughtful, useful products across the frontend, backend, and everything in between.</p>
          <p className="hero-education">Currently pursuing a B.S. in Computer Science at Western Governors University.</p>
          <div className="hero-actions">
            <a className="editorial-button" href="#projects">VIEW MY WORK <Arrow /></a>
            <a className="text-link" href="/resume.pdf">RESUME <Arrow /></a>
          </div>
        </div>
        <HeroPhotoStack />
      </section>

      <section id="projects" className="home-section featured-product content-width" aria-labelledby="petcare-title">
        <span id="work" className="work-anchor" aria-hidden="true" />
        <p className="eyebrow">01 / FEATURED PRODUCT</p>
        <div className="featured-heading">
          <h2 id="petcare-title">{petCare.title}</h2>
          <div>
            <p className="project-description">{petCare.summary}</p>
            <p className="tech-stack"><span className="sr-only">Technology stack: </span>{petCare.tech.join(" · ")}</p>
            <ProjectLinks project={petCare} />
          </div>
        </div>
        <div className="featured-image">
          <Image src={petCare.image!} alt={petCare.imageAlt!} fill sizes="(max-width: 1300px) 92vw, 1200px" />
        </div>
      </section>

      <section id="products" className="home-section content-width" aria-labelledby="products-title">
        <p className="eyebrow">02 / PRODUCTS</p>
        <h2 id="products-title">More Things I&apos;ve Built</h2>
        <div className="product-composition">
          {moreProjects.map((project) => (
            <article key={project.slug} className={`product-story product-story-${project.slug}`} aria-labelledby={`${project.slug}-title`}>
              <div className="product-image">
                <Image src={project.image!} alt={project.imageAlt ?? `${project.title} preview`} fill sizes="(max-width: 700px) 92vw, 44vw" />
              </div>
              <div className="product-copy">
                <h3 id={`${project.slug}-title`}>{project.title}</h3>
                {project.tagline && <p className="product-tagline">{project.tagline}</p>}
                <p>{project.summary}</p>
                <p className="tech-stack"><span className="sr-only">Technology stack: </span>{project.tech.join(" · ")}</p>
                <ProjectLinks project={project} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="home-section about-teaser content-width" aria-labelledby="about-title">
        <p className="eyebrow">03 / ABOUT</p>
        <div>
          <h2 id="about-title">I like building software that makes complicated things feel simple.</h2>
          <p>I&apos;m a full-stack developer focused on turning practical ideas into useful, polished products — from interface design through backend logic and deployment.</p>
          <a className="text-link" href="/about">MORE ABOUT ME <Arrow /></a>
        </div>
      </section>

      <section id="contact" className="home-section contact-section content-width" aria-labelledby="contact-title">
        <p className="eyebrow">04 / CONTACT</p>
        <h2 id="contact-title">Have an opportunity<br />or idea in mind?</h2>
        <div className="contact-bottom">
          <p>I&apos;m open to junior and full-stack software development opportunities, collaborations, and conversations about useful products.</p>
          <a className="editorial-button" href="mailto:hv.fin25@gmail.com">LET&apos;S TALK <Arrow /></a>
        </div>
      </section>
    </div>
  );
}

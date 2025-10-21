import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import Magnetic from "@/components/Magnetic";

export default function Page() {
  return (
    <main>
      {/* HERO */}
      <section className="beam-container hero" style={{ marginBottom: "3rem" }}>
        <h1 className="glow-title" style={{ marginBottom: "1rem" }}>
          Hi, I&apos;m Hector Virrey — Full-stack Developer
        </h1>

        <p className="muted" style={{ maxWidth: "70ch", margin: "0 auto" }}>
          I’m a self-taught full-stack developer with a passion for turning ideas
          into fully functional web applications. Through projects like
          <strong> NeighborLink</strong>, <strong>Personal CRM</strong>, and
          <strong> WatchWise</strong>, I’ve built a strong foundation in both
          front-end and back-end development. My ultimate goal is to master every
          stage of app development—from concept to deployment—so I can launch and
          grow my own product one day. I bring an entrepreneurial mindset, a love
          for clean code, and an obsession with learning something new every day.
        </p>

        <div className="actions" style={{ justifyContent: "center" }}>
          <Magnetic as="span">
            <a className="btn primary" href="/resume.pdf" download>
              Download résumé
            </a>
          </Magnetic>
          <Magnetic as="span">
            <a className="btn" href="mailto:you@example.com">
              Get in touch
            </a>
          </Magnetic>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h2 className="glow-title center" style={{ marginBottom: "1.5rem" }}>
          Selected Projects
        </h2>

        <div className="projects-grid">
          {[...projects]
            .sort((a, b) => Number(!!a.comingSoon) - Number(!!b.comingSoon))
            .map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
        </div>
      </section>

      {/* ABOUT anchor for header highlighting */}
      <section id="about" className="section" style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h2 className="glow-title center">About</h2>
        <p className="muted center" style={{ maxWidth: "60ch", margin: "0.75rem auto 0" }}>
          I build fast, accessible web apps — taking ideas from 0→1 with a cinematic visual language.
          Currently focused on Next.js, React, WebGL, and motion.
        </p>
      </section>
    </main>
  );
}

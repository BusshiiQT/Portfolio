'use client';

type Project = {
  title: string;
  summary: string;
  stack: string[];
  demo?: string;
  code?: string;
};

const projects: Project[] = [
  {
    title: "PetCare Hub",
    summary:
      "A full-stack pet care marketplace where owners can discover providers, manage bookings, and schedule services based on real availability. Includes role-based dashboards, server-side booking validation, and authentication.",
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "Vercel",
    ],
    demo: "https://petcare-hub-gilt.vercel.app/",
    code: "https://github.com/BusshiiQT/petcare-hub",
  },
  {
    title: "Habit Tracker (WIP)",
    summary: "Daily habit tracker with streaks.",
    stack: ["Next.js", "SQLite", "Tailwind"],
    demo: "#",
    code: "#",
  },
  {
    title: "Verse of the Day (WIP)",
    summary: "Daily verse from a public API.",
    stack: ["Next.js", "API Routes", "Tailwind"],
    demo: "#",
    code: "#",
  },
];

export default function Page() {
  return (
    <main>
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b bg-white/75 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-[hsl(var(--primary))]/10">
              <span className="text-[hsl(var(--primary))] text-xs font-bold">◎</span>
            </div>
            <span className="font-semibold tracking-tight">Your Name</span>
            <span className="mx-2 hidden text-neutral-500 md:inline">
              — Full-Stack Developer
            </span>
          </div>
          <nav className="hidden gap-3 text-sm md:flex">
            <a href="#projects" className="hover:text-[hsl(var(--primary))]">
              Projects
            </a>
            <a href="#skills" className="hover:text-[hsl(var(--primary))]">
              Skills
            </a>
            <a href="#about" className="hover:text-[hsl(var(--primary))]">
              About
            </a>
            <a href="#contact" className="hover:text-[hsl(var(--primary))]">
              Contact
            </a>
            <a
              href="/resume.pdf"
              className="inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm hover:bg-[hsl(var(--muted))]"
            >
              Resume
            </a>
          </nav>
          <a
            href="/resume.pdf"
            className="inline-flex items-center justify-center rounded-lg border px-3 py-1.5 text-sm md:hidden"
          >
            Resume
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b bg-[hsl(var(--muted))]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Building useful products with TypeScript, React & Next.js.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-600">
            I design, build, and ship full-stack apps end-to-end — from idea to production.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="inline-flex items-center justify-center rounded-lg bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--primary-fg))] hover:opacity-90"
              href="#projects"
            >
              View Projects
            </a>
            <a
              className="inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm hover:bg-[hsl(var(--muted))]"
              href="/resume.pdf"
            >
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Featured Projects
          </h2>
          <p className="mt-2 max-w-2xl text-neutral-600">
            A selection of apps showing product thinking, engineering, and UX.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.title}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <div className="hidden gap-2 md:flex">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border px-3 py-1 text-xs text-neutral-600"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-2 text-sm text-neutral-600">{p.summary}</p>

              <img
  src={`/images/${p.title === "PetCare Hub" ? "petcare-hub1.png" : ""}`}
  alt={`${p.title} screenshot`}
  className="mt-4 aspect-video w-full rounded-xl border object-cover"
/>


              <div className="mt-4 flex flex-wrap gap-2">
                {p.demo && (
                  <a
                    className="inline-flex items-center justify-center rounded-lg bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--primary-fg))] hover:opacity-90"
                    href={p.demo}
                    target="_blank"
                  >
                    Live Demo
                  </a>
                )}
                {p.code && (
                  <a
                    className="inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm hover:bg-[hsl(var(--muted))]"
                    href={p.code}
                    target="_blank"
                  >
                    GitHub
                  </a>
                )}
              </div>

              <div className="mt-3 flex gap-2 md:hidden">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border px-3 py-1 text-xs text-neutral-600"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="border-y bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Skills
          </h2>
          <ul className="mt-6 grid gap-3 text-sm md:grid-cols-3">
            <li className="rounded-full border px-3 py-1 text-xs text-neutral-600">
              TypeScript
            </li>
            <li className="rounded-full border px-3 py-1 text-xs text-neutral-600">
              React / Next.js
            </li>
            <li className="rounded-full border px-3 py-1 text-xs text-neutral-600">
              Node.js
            </li>
            <li className="rounded-full border px-3 py-1 text-xs text-neutral-600">
              PostgreSQL
            </li>
            <li className="rounded-full border px-3 py-1 text-xs text-neutral-600">
              Tailwind CSS
            </li>
            <li className="rounded-full border px-3 py-1 text-xs text-neutral-600">
              Supabase
            </li>
          </ul>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          About Me
        </h2>
        <p className="mt-4 max-w-3xl leading-7 text-neutral-700">
          I’m a full-stack developer who enjoys turning ideas into polished,
          real-world products using TypeScript, Next.js, and modern tooling.
        </p>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t bg-[hsl(var(--muted))]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Contact
          </h2>
          <p className="mt-2 max-w-2xl text-neutral-700">
            Email me at{" "}
            <a className="underline" href="mailto:you@example.com">
             hv.fin25@gmail.com
            </a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-500">
          © {new Date().getFullYear()}Hector Virrey. Built with Next.js + Tailwind.
        </div>
      </footer>
    </main>
  );
}

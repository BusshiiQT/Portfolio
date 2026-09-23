import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header content-width">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Link href="/" className="site-brand" aria-label="Hector Virrey home">HV<span aria-hidden="true">.</span></Link>
      <nav aria-label="Primary" className="site-nav">
        <a href="/#work">Work</a>
        <Link href="/about">About</Link>
        <a href="/resume.pdf">Resume</a>
        <a href="/#contact">Let&apos;s Talk <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}

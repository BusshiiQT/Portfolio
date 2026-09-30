import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import { siteUrl, siteTitle as title, siteDescription as description, sharedOpenGraph, sharedTwitter } from "../lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s | Hector Virrey" },
  description,
  openGraph: { ...sharedOpenGraph, title, description, url: siteUrl },
  twitter: { ...sharedTwitter, title, description },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Hector Virrey",
      url: siteUrl,
      jobTitle: "Full-Stack Developer",
      email: "hv.fin25@gmail.com",
      sameAs: ["https://github.com/BusshiiQT"],
      image: `${siteUrl}/images/hector-portrait.png`,
      homeLocation: { "@type": "Place", name: "Chicago, Illinois area" },
      description,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Hector Virrey",
      url: siteUrl,
      author: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        <Header />
        <main id="main-content" className="site-content" tabIndex={-1}>{children}</main>
        <footer id="footer" className="footer">
          <div className="content-width footer-content">
            <span>© {new Date().getFullYear()} Hector Virrey</span>
            <a href="https://github.com/BusshiiQT">GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </footer>
      </body>
    </html>
  );
}

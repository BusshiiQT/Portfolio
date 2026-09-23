import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header";

const title = "Hector Virrey | Full-Stack Developer";
const description =
  "The portfolio of Hector Virrey, Full-Stack Developer. Explore selected web projects and get in touch.";

export const metadata: Metadata = {
  title: { default: title, template: "%s | Hector Virrey" },
  description,
  openGraph: { title, description, type: "website", siteName: "Hector Virrey" },
  twitter: { card: "summary", title, description },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
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

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
        <main className="site-content">{children}</main>
        <footer className="footer">
          <div className="content-width">
            <span>© {new Date().getFullYear()} Hector Virrey</span>
          </div>
        </footer>
      </body>
    </html>
  );
}

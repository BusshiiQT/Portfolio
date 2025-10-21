import "./globals.css";
import type { ReactNode } from "react";
import CursorGlow from "@/components/CursorGlow";
import Header from "@/components/Header"; // stays as your client Header

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "var(--bg)",
          color: "var(--text)",
          // match globals.css font stack (readable + modern)
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        {/* Site-wide cursor-follow glow */}
        <CursorGlow />

        {/* Header (Client Component) */}
        <Header />

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            maxWidth: "1100px",
            margin: "2rem auto",
            width: "100%",
            padding: "0 1rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          {children}
        </main>

        {/* Footer (uses .footer styles from globals.css) */}
        <footer className="footer">
          <span>© {new Date().getFullYear()} Hector Virrey</span>
        </footer>
      </body>
    </html>
  );
}

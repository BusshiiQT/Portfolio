import { ImageResponse } from "next/og";

export const alt = "Hector Virrey — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 76px", backgroundColor: "#0B0F14", backgroundImage: "radial-gradient(ellipse at 95% 15%, #5A172A 0%, #0B0F14 65%)", color: "#F5F2EE", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", fontSize: 24, letterSpacing: 4 }}>
        <span style={{ color: "#6ABCB8", marginRight: 16 }}>HV.</span>
        <span>SOFTWARE / PRODUCTS</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ width: 64, height: 4, backgroundColor: "#6ABCB8", marginBottom: 28 }} />
        <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -4 }}>Hector Virrey</div>
        <div style={{ fontSize: 38, color: "#D5D0CE", marginTop: 12 }}>Full-Stack Developer</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #3D343B", paddingTop: 24, fontSize: 21, color: "#B8B4B4" }}>
        <span>Chicago, Illinois area</span>
        <span>hectorvirrey.com</span>
      </div>
    </div>,
    size,
  );
}

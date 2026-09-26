import { ImageResponse } from "next/og";

export function brandIcon(size: number) {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0B0F14", color: "#F5F2EE", borderBottom: `${size / 12}px solid #5A172A`, fontFamily: "sans-serif", fontSize: size * 0.46, fontWeight: 700, letterSpacing: -size * 0.035 }}>
      <span>HV</span><span style={{ color: "#6ABCB8" }}>.</span>
    </div>,
    { width: size, height: size },
  );
}

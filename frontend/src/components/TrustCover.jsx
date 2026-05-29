import { useRef } from "react";

const GOLD = "#d4a017";
const DARK = "#0a0a0a";

export default function TrustCover() {
  const ref = useRef();

  return (
    <div
      ref={ref}
      style={{
        width: "816px",
        minHeight: "1056px",
        background: DARK,
        color: "#e8e8e8",
        fontFamily: "Georgia, serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "80px 60px",
        position: "relative",
        overflow: "hidden",
        border: `2px solid ${GOLD}`,
        margin: "0 auto",
      }}
    >
      {/* Corner accents */}
      {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
        <div key={i} style={{
          position: "absolute",
          top: pos.includes("top") ? 16 : "auto",
          bottom: pos.includes("bottom") ? 16 : "auto",
          left: pos.includes("left") ? 16 : "auto",
          right: pos.includes("right") ? 16 : "auto",
          width: 48, height: 48,
          borderTop: pos.includes("top") ? `2px solid ${GOLD}` : "none",
          borderBottom: pos.includes("bottom") ? `2px solid ${GOLD}` : "none",
          borderLeft: pos.includes("left") ? `2px solid ${GOLD}` : "none",
          borderRight: pos.includes("right") ? `2px solid ${GOLD}` : "none",
        }} />
      ))}

      {/* Top seal area */}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <div style={{
          width: 100, height: 100, borderRadius: "50%",
          border: `3px solid ${GOLD}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px",
          background: "rgba(212,160,23,0.08)",
        }}>
          <span style={{ fontSize: 40, letterSpacing: 2, color: GOLD, fontWeight: "bold" }}>M</span>
        </div>
        <div style={{
          fontSize: 11, letterSpacing: 8, color: GOLD,
          textTransform: "uppercase", marginBottom: 8,
        }}>
          Moor Essential Community
        </div>
        <div style={{ width: 120, height: 1, background: GOLD, margin: "0 auto" }} />
      </div>

      {/* Main title */}
      <div style={{ textAlign: "center", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <div style={{ fontSize: 13, letterSpacing: 6, color: GOLD, textTransform: "uppercase" }}>
          Declaration of
        </div>
        <div style={{
          fontSize: 52, fontWeight: "bold", color: "#fff",
          lineHeight: 1.1, letterSpacing: 2, textAlign: "center",
        }}>
          MECCA<br />
          <span style={{ color: GOLD }}>TRUST</span>
        </div>
        <div style={{ width: 200, height: 1, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`, margin: "8px auto" }} />
        <div style={{ fontSize: 14, color: "#aaa", letterSpacing: 3, textTransform: "uppercase" }}>
          Deed of Trust
        </div>

        <div style={{ marginTop: 40, padding: "20px 40px", border: `1px solid rgba(212,160,23,0.3)`, borderRadius: 4, maxWidth: 480, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "#bbb", lineHeight: 1.8, fontStyle: "italic", margin: 0 }}>
            "Established for the purpose of producing, promoting, and protecting
            the generational wealth and sovereign prosperity of the
            Moor Essential Community and humanity at large."
          </p>
        </div>
      </div>

      {/* Bottom info */}
      <div style={{ textAlign: "center", width: "100%" }}>
        <div style={{ width: "100%", height: 1, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`, marginBottom: 24 }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#666", letterSpacing: 2, textTransform: "uppercase" }}>
          <span>MECCA.DAO</span>
          <span>Confidential &amp; Proprietary</span>
          <span>Version 1.0</span>
        </div>
      </div>
    </div>
  );
}

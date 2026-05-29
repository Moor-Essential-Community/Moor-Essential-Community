const GOLD = "#d4a017";
const DARK = "#0a0a0a";

export default function NGOCover() {
  return (
    <div style={{
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
    }}>
      {/* Corner accents */}
      {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => (
        <div key={pos} style={{
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

      {/* Background watermark */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: 300, fontWeight: "bold", color: "rgba(212,160,23,0.03)",
        pointerEvents: "none", userSelect: "none", letterSpacing: -10,
      }}>
        DAO
      </div>

      {/* Top */}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 16,
          padding: "8px 32px", border: `1px solid rgba(212,160,23,0.4)`,
          borderRadius: 2, marginBottom: 32,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD }} />
          <span style={{ fontSize: 10, letterSpacing: 6, color: GOLD, textTransform: "uppercase" }}>
            Non-Governmental Organisation
          </span>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD }} />
        </div>

        <div style={{
          width: 120, height: 120, borderRadius: "50%",
          border: `2px solid ${GOLD}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto",
          background: "rgba(212,160,23,0.06)",
          flexDirection: "column", gap: 2,
        }}>
          <span style={{ fontSize: 36, color: GOLD, fontWeight: "bold" }}>M</span>
          <span style={{ fontSize: 8, letterSpacing: 3, color: GOLD, textTransform: "uppercase" }}>MECCA</span>
        </div>
      </div>

      {/* Main title */}
      <div style={{ textAlign: "center", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: 8, color: "#888", textTransform: "uppercase" }}>
          Articles of Association
        </div>
        <div style={{
          fontSize: 46, fontWeight: "bold", lineHeight: 1.15, textAlign: "center",
        }}>
          MOOR ESSENTIAL<br />
          <span style={{ color: GOLD }}>COMMUNITY</span>
        </div>
        <div style={{ fontSize: 18, color: "#aaa", letterSpacing: 4, textTransform: "uppercase" }}>
          MECCA.DAO
        </div>
        <div style={{ width: 240, height: 1, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`, margin: "4px auto" }} />

        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, width: "100%" }}>
          {[
            { label: "Purpose", value: "Philanthropic" },
            { label: "Structure", value: "DAO Governed" },
            { label: "Registry", value: "On-Chain" },
          ].map(({ label, value }) => (
            <div key={label} style={{
              border: `1px solid rgba(212,160,23,0.25)`,
              borderRadius: 4, padding: "16px 12px", textAlign: "center",
              background: "rgba(212,160,23,0.04)",
            }}>
              <div style={{ fontSize: 16, fontWeight: "bold", color: GOLD, marginBottom: 4 }}>{value}</div>
              <div style={{ fontSize: 10, color: "#666", letterSpacing: 3, textTransform: "uppercase" }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, padding: "20px 40px", border: `1px solid rgba(212,160,23,0.2)`, borderRadius: 4, maxWidth: 480, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "#bbb", lineHeight: 1.8, fontStyle: "italic", margin: 0 }}>
            "Committed to the upliftment, education, and sovereign advancement
            of the Moor Essential Community through decentralized,
            transparent, and immutable governance."
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ textAlign: "center", width: "100%" }}>
        <div style={{ width: "100%", height: 1, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`, marginBottom: 24 }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#666", letterSpacing: 2, textTransform: "uppercase" }}>
          <span>MECCA.DAO</span>
          <span>Articles of Association — V1.0</span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
}

// Replace trustCoverImage with your actual image import once uploaded
// e.g. import trustCoverImage from "../assets/trust-cover.jpg";
const trustCoverImage = null; // set to your imported image

const GOLD = "#d4a017";
const GOLD2 = "#f5a623";

export default function TrustCover() {
  return (
    <div style={{
      width: "100%",
      maxWidth: "816px",
      minHeight: "1056px",
      background: "#0a0a0a",
      color: "#e8e8e8",
      fontFamily: "Georgia, serif",
      display: "flex",
      flexDirection: "column",
      margin: "0 auto",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
    }}>

      {/* ── HERO IMAGE AREA ── */}
      <div style={{
        width: "100%",
        height: 380,
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}>
        {trustCoverImage ? (
          <img
            src={trustCoverImage}
            alt="MECCA Trust"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          />
        ) : (
          /* Placeholder shown until you upload your photo */
          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(135deg, #1a1400 0%, #2a1f00 40%, #111 100%)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 12,
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              border: `2px dashed rgba(212,160,23,0.4)`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 28, opacity: 0.4 }}>📷</span>
            </div>
            <span style={{ fontSize: 12, color: "rgba(212,160,23,0.4)", letterSpacing: 3, textTransform: "uppercase" }}>
              Your Photo Here
            </span>
          </div>
        )}

        {/* Gold overlay gradient at bottom of image */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "60%",
          background: "linear-gradient(to bottom, transparent, #0a0a0a)",
        }} />

        {/* Top bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          padding: "20px 32px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
        }}>
          <span style={{ fontSize: 10, letterSpacing: 5, color: GOLD, textTransform: "uppercase" }}>
            Moor Essential Community
          </span>
          <div style={{
            padding: "4px 14px",
            border: `1px solid rgba(212,160,23,0.5)`,
            borderRadius: 2,
            fontSize: 9, letterSpacing: 3, color: GOLD, textTransform: "uppercase",
          }}>
            Est. 2022
          </div>
        </div>

        {/* Overlaid title on image */}
        <div style={{
          position: "absolute", bottom: 28, left: 32, right: 32,
        }}>
          <div style={{
            fontSize: 10, letterSpacing: 6, color: GOLD,
            textTransform: "uppercase", marginBottom: 6,
          }}>
            Declaration of
          </div>
          <div style={{
            fontSize: 52, fontWeight: "bold", lineHeight: 1,
            color: "#fff", textShadow: "0 2px 20px rgba(0,0,0,0.9)",
          }}>
            MECCA <span style={{ color: GOLD }}>TRUST</span>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        padding: "32px 40px 40px",
        borderLeft: `3px solid ${GOLD}`,
        borderRight: `3px solid ${GOLD}`,
        gap: 28,
      }}>

        {/* Gold rule */}
        <div style={{
          height: 1,
          background: `linear-gradient(to right, ${GOLD}, ${GOLD2}, ${GOLD})`,
        }} />

        {/* Subtitle row */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <div style={{ fontSize: 18, letterSpacing: 4, color: "#ccc", textTransform: "uppercase" }}>
              Deed of Trust
            </div>
            <div style={{ fontSize: 11, color: "#555", letterSpacing: 2, marginTop: 4, textTransform: "uppercase" }}>
              Sovereign Instrument of Record
            </div>
          </div>
          {/* Seal circle */}
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            border: `2px solid ${GOLD}`,
            background: "rgba(212,160,23,0.08)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 26, color: GOLD, fontWeight: "bold", lineHeight: 1 }}>M</span>
            <span style={{ fontSize: 7, color: GOLD, letterSpacing: 2, textTransform: "uppercase" }}>Seal</span>
          </div>
        </div>

        {/* Quote block */}
        <div style={{
          padding: "24px 32px",
          borderLeft: `3px solid ${GOLD}`,
          background: "rgba(212,160,23,0.04)",
        }}>
          <p style={{
            fontSize: 14, color: "#ccc", lineHeight: 1.9,
            fontStyle: "italic", margin: 0,
          }}>
            "Established for the purpose of producing, promoting, and protecting
            the generational wealth and sovereign prosperity of the Moor Essential
            Community and humanity at large — preserved on-chain, forever."
          </p>
        </div>

        {/* Info grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { label: "Trust Type", value: "Sovereign Private Trust" },
            { label: "Governed By", value: "MECCA.DAO — On-Chain" },
            { label: "Beneficiaries", value: "Moor Essential Community" },
            { label: "Document Version", value: "Version 1.0" },
          ].map(({ label, value }) => (
            <div key={label} style={{
              padding: "14px 18px",
              border: `1px solid rgba(212,160,23,0.2)`,
              borderRadius: 3,
              background: "rgba(255,255,255,0.02)",
            }}>
              <div style={{ fontSize: 10, color: "#555", letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>
                {label}
              </div>
              <div style={{ fontSize: 14, color: "#e0e0e0", fontWeight: "bold" }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* Footer */}
        <div>
          <div style={{ height: 1, background: `linear-gradient(to right, ${GOLD}, transparent)`, marginBottom: 16 }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#444", letterSpacing: 2, textTransform: "uppercase" }}>
            <span>MECCA.DAO</span>
            <span>Confidential &amp; Proprietary</span>
            <span>{new Date().getFullYear()}</span>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div style={{ height: 6, background: `linear-gradient(to right, ${GOLD}, ${GOLD2}, ${GOLD})` }} />
    </div>
  );
}

import { weddingConfig } from "@/config/wedding";
import { formatDotDate } from "@/lib/date";

export function buildOgImageElement() {
  const { bride, groom, weddingDate, location } = weddingConfig;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#F8F4EC",
        color: "#2D211B",
        fontFamily: "Georgia, serif",
        padding: 80,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          right: 40,
          bottom: 40,
          border: "1px solid #B89A5A",
          display: "flex",
        }}
      />
      <div style={{ display: "flex", fontSize: 22, letterSpacing: 8, color: "#B89A5A" }}>
        WE&apos;RE GETTING MARRIED
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 36, marginTop: 28 }}>
        <div style={{ display: "flex", fontSize: 76 }}>{bride.name}</div>
        <div style={{ display: "flex", fontSize: 44, color: "#B89A5A" }}>&amp;</div>
        <div style={{ display: "flex", fontSize: 76 }}>{groom.name}</div>
      </div>
      <div style={{ display: "flex", marginTop: 30, fontSize: 26, color: "#4A3A30" }}>
        {formatDotDate(weddingDate)} &nbsp;·&nbsp; {location.venue}, {location.city}
      </div>
    </div>
  );
}

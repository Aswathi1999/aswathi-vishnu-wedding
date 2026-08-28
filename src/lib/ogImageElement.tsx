import fs from "node:fs";
import path from "node:path";
import { weddingConfig } from "@/config/wedding";
import { formatDotDate } from "@/lib/date";

const FONT_FAMILY = "Playfair Display";

function readImageAsDataUri(publicPath: string): string {
  const filePath = path.join(process.cwd(), "public", publicPath);
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).slice(1);
  const mime = ext === "svg" ? "image/svg+xml" : `image/${ext === "jpg" ? "jpeg" : ext}`;
  return `data:${mime};base64,${buffer.toString("base64")}`;
}

/** Same typeface used for headings across the site (Hero's `font-serif`). */
export function getOgFonts() {
  const fontsDir = path.join(process.cwd(), "src", "assets", "fonts");
  return [
    {
      name: FONT_FAMILY,
      data: fs.readFileSync(path.join(fontsDir, "PlayfairDisplay-Regular.ttf")),
      style: "normal" as const,
      weight: 400 as const,
    },
    {
      name: FONT_FAMILY,
      data: fs.readFileSync(path.join(fontsDir, "PlayfairDisplay-Italic.ttf")),
      style: "italic" as const,
      weight: 400 as const,
    },
  ];
}

export function buildOgImageElement() {
  const { bride, groom, weddingDate, location, hero } = weddingConfig;
  const photoSrc = readImageAsDataUri(hero.image);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#F8F4EC",
        fontFamily: FONT_FAMILY,
      }}
    >
      <div style={{ display: "flex", width: 460, height: "100%", position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt=""
          width={460}
          height={630}
          style={{ width: 460, height: 630, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(45,33,27,0) 60%, rgba(248,244,236,0.9) 100%)",
            display: "flex",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          flex: 1,
          color: "#2D211B",
          padding: "0 64px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 24,
            right: 40,
            bottom: 40,
            border: "1px solid #B89A5A",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", fontSize: 20, letterSpacing: 6, color: "#B89A5A" }}>
          WE&apos;RE GETTING MARRIED
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 22, fontSize: 62, lineHeight: 1.05 }}>
          <div style={{ display: "flex" }}>{bride.name}</div>
          <div style={{ display: "flex", fontSize: 36, fontStyle: "italic", color: "#B89A5A", margin: "6px 0" }}>
            &amp;
          </div>
          <div style={{ display: "flex" }}>{groom.name}</div>
        </div>
        <div style={{ display: "flex", marginTop: 26, fontSize: 22, color: "#4A3A30" }}>
          {formatDotDate(weddingDate)} &nbsp;·&nbsp; {location.venue}, {location.city}
        </div>
      </div>
    </div>
  );
}

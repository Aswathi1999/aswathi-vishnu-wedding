import { ImageResponse } from "next/og";
import { weddingConfig } from "@/config/wedding";
import { buildOgImageElement } from "@/lib/ogImageElement";

export const runtime = "nodejs";
export const alt = `${weddingConfig.bride.name} & ${weddingConfig.groom.name} — Wedding Invitation`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(buildOgImageElement(), { ...size });
}

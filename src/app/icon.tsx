import { ImageResponse } from "next/og";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2D211B",
          color: "#B89A5A",
          fontSize: 22,
          fontFamily: "Georgia, serif",
          letterSpacing: 1,
        }}
      >
        A&V
      </div>
    ),
    { ...size }
  );
}

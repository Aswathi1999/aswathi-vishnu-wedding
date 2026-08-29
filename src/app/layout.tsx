import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { weddingConfig } from "@/config/wedding";
import { formatLongDate } from "@/lib/date";
import { MusicPlayer } from "@/components/MusicPlayer";
import { MotionProvider } from "@/components/ui/MotionProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const { bride, groom, weddingDate, location } = weddingConfig;
const weddingDateLabel = formatLongDate(weddingDate);
const title = `${bride.name} & ${groom.name} — Wedding Invitation`;
const description = `Join ${bride.name} and ${groom.name} as they begin their beautiful journey together on ${weddingDateLabel} in ${location.city}, ${location.state}.`;
const shareTitle = `You're Invited — ${bride.name} & ${groom.name}'s Wedding`;
const shareDescription = `We're getting married on ${weddingDateLabel} at ${location.venue}, ${location.city}. We'd love for you to join us!`;

export const metadata: Metadata = {
  metadataBase: new URL(weddingConfig.siteUrl),
  title,
  description,
  keywords: [
    `${bride.name} ${groom.name} wedding`,
    "Kerala wedding invitation",
    "Hindu wedding",
    location.city,
  ],
  openGraph: {
    title: shareTitle,
    description: shareDescription,
    url: weddingConfig.siteUrl,
    siteName: `${bride.name} & ${groom.name} Wedding`,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f4ec",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-ivory text-brown font-sans antialiased overflow-x-hidden selection:bg-gold selection:text-ivory">
        <MotionProvider>
          {children}
          <MusicPlayer />
        </MotionProvider>
      </body>
    </html>
  );
}

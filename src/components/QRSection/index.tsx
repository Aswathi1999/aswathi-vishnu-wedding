import QRCode from "qrcode";
import { weddingConfig } from "@/config/wedding";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export async function QRSection() {
  const { qr, siteUrl } = weddingConfig;

  if (!qr.enabled) return null;

  const dataUrl = await QRCode.toDataURL(siteUrl, {
    margin: 2,
    width: 480,
    color: { dark: "#2D211B", light: "#F8F4EC00" },
  });

  return (
    <section className="bg-ivory px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto flex max-w-md flex-col items-center gap-8 text-center">
        <SectionHeading eyebrow="Print &amp; Share" title="Scan to Open Our Invitation" />

        <Reveal delay={0.15} className="border border-gold/30 bg-ivory p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={dataUrl} alt="QR code linking to our wedding invitation website" width={220} height={220} />
        </Reveal>
      </div>
    </section>
  );
}

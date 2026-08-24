"use client";

import { useState } from "react";
import { Share2, MessageCircle, Link as LinkIcon, Check } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function ShareSection() {
  const { bride, groom, siteUrl } = weddingConfig;
  const [copied, setCopied] = useState(false);
  const shareText = `You're invited to ${bride.name} & ${groom.name}'s wedding!`;

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: shareText, text: shareText, url: siteUrl });
      } catch {
        // user cancelled the native share sheet
      }
      return;
    }
    await handleCopy();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="bg-ivory px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto flex max-w-lg flex-col items-center gap-8 text-center">
        <SectionHeading eyebrow="Share the Love" title="Share Our Invitation" />

        <Reveal delay={0.15} className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 bg-brown px-6 py-3 text-xs tracking-[0.25em] uppercase text-ivory transition-colors hover:bg-maroon"
          >
            <Share2 size={15} aria-hidden="true" />
            Share Invitation
          </button>

          <a
            href={buildWhatsAppUrl("", `${shareText} ${siteUrl}`)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-gold px-6 py-3 text-xs tracking-[0.25em] uppercase text-brown transition-colors hover:bg-gold hover:text-ivory"
          >
            <MessageCircle size={15} aria-hidden="true" />
            WhatsApp
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 border border-gold px-6 py-3 text-xs tracking-[0.25em] uppercase text-brown transition-colors hover:bg-gold hover:text-ivory"
          >
            {copied ? <Check size={15} aria-hidden="true" /> : <LinkIcon size={15} aria-hidden="true" />}
            {copied ? "Link Copied!" : "Copy Link"}
          </button>
        </Reveal>
      </div>
    </section>
  );
}

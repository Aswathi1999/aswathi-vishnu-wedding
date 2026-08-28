"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionFloralAccent } from "@/components/ui/SectionFloralAccent";

export function VideoSection() {
  const { video, bride, groom } = weddingConfig;
  const [playing, setPlaying] = useState(false);

  if (!video.enabled) return null;

  return (
    <section className="relative overflow-hidden bg-ivory px-5 py-16 sm:px-8 sm:py-24">
      <SectionFloralAccent id="video" tone="blush" corners="tl-br" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHeading eyebrow="In Motion" title="A Little Glimpse of Us" />

        <Reveal delay={0.15} className="mt-12">
          <div className="relative aspect-video w-full overflow-hidden bg-brown">
            {video.url ? (
              playing ? (
                <video
                  src={video.url}
                  poster={video.poster}
                  controls
                  autoPlay
                  className="h-full w-full object-cover"
                >
                  <track kind="captions" />
                </video>
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group relative block h-full w-full"
                  aria-label="Play wedding video"
                >
                  <Image src={video.poster} alt="Wedding film preview" fill sizes="100vw" className="object-cover opacity-80" />
                  <span className="absolute inset-0 bg-brown/30 transition-colors group-hover:bg-brown/40" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-ivory/70 text-ivory transition-transform duration-300 group-hover:scale-110 group-hover:bg-ivory/10 sm:h-20 sm:w-20">
                      <Play size={26} fill="currentColor" aria-hidden="true" />
                    </span>
                  </span>
                </button>
              )
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center text-ivory">
                <Image src={video.poster} alt="" fill sizes="100vw" className="object-cover opacity-40" />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-ivory/50">
                  <Play size={24} aria-hidden="true" />
                </span>
                <p className="relative font-serif text-lg italic text-ivory/90">Our film is on its way</p>
                <p className="relative text-xs tracking-[0.25em] uppercase text-ivory/60">
                  {bride.name} &amp; {groom.name}
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

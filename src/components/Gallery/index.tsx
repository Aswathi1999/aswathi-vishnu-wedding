"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionFloralAccent } from "@/components/ui/SectionFloralAccent";

export function Gallery() {
  const { gallery } = weddingConfig;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i - 1 + gallery.images.length) % gallery.images.length));
  }, [gallery.images.length]);
  const showNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i + 1) % gallery.images.length));
  }, [gallery.images.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, showPrev, showNext]);

  if (!gallery.enabled || gallery.images.length === 0) return null;

  const active = activeIndex !== null ? gallery.images[activeIndex] : null;

  return (
    <section id="gallery" className="relative overflow-hidden bg-ivory px-5 py-16 sm:px-8 sm:py-24">
      <SectionFloralAccent id="gallery" tone="blush" corners="tr-bl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading eyebrow="Captured Moments" title="Our Moments" />

        <div className="mt-12 columns-2 gap-3 sm:columns-3 sm:gap-4">
          {gallery.images.map((image, index) => (
            <Reveal key={image.src} delay={0.04 * (index % 6)} className="mb-3 break-inside-avoid sm:mb-4">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative block w-full overflow-hidden bg-sand focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label={`Open image: ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1000}
                  height={1250}
                  loading="lazy"
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-brown/0 transition-colors duration-500 group-hover:bg-brown/10" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image viewer"
            className="fixed inset-0 z-50 flex items-center justify-center bg-brown/95 px-4 py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const delta = e.changedTouches[0].clientX - touchStartX.current;
              if (delta > 50) showPrev();
              if (delta < -50) showNext();
              touchStartX.current = null;
            }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close image viewer"
              className="absolute right-5 top-5 text-ivory transition-colors hover:text-gold-light"
            >
              <X size={28} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory transition-colors hover:text-gold-light sm:left-6"
            >
              <ChevronLeft size={32} />
            </button>

            <motion.div
              key={active.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="relative max-h-[85vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.src}
                alt={active.alt}
                width={1400}
                height={1400}
                sizes="90vw"
                className="mx-auto max-h-[85vh] w-auto object-contain"
              />
            </motion.div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory transition-colors hover:text-gold-light sm:right-6"
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

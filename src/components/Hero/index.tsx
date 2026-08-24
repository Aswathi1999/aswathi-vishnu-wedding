"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { formatLongDate } from "@/lib/date";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const { bride, groom, weddingDate, images } = weddingConfig;

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex h-[100svh] w-full items-end justify-center overflow-hidden bg-brown text-ivory"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={images.hero}
          alt={`${bride.name} and ${groom.name}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown/40 via-brown/20 to-brown/85" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex w-full flex-col items-center gap-5 px-6 pb-20 text-center sm:pb-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-xs sm:text-sm tracking-[0.4em] uppercase text-gold-light"
        >
          We&apos;re Getting Married
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl leading-tight tracking-wide"
        >
          {bride.name}
          <span className="mx-4 italic text-gold-light">&amp;</span>
          {groom.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-sm sm:text-base tracking-[0.3em] uppercase"
        >
          {formatLongDate(weddingDate)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-6 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-ivory/80"
        >
          <span>Scroll to discover our story</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={18} aria-hidden="true" />
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}

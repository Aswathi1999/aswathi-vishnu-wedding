"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { weddingConfig } from "@/config/wedding";
import { formatDotDate } from "@/lib/date";

interface IntroScreenProps {
  onEnter: () => void;
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export function IntroScreen({ onEnter }: IntroScreenProps) {
  const { bride, groom, weddingDate, location, images } = weddingConfig;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-brown text-ivory"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 0.45, scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      >
        <Image
          src={images.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown/80 via-brown/60 to-brown" />
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 px-6 text-center"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.35, delayChildren: 0.5 }}
      >
        <motion.p variants={item} className="text-xs sm:text-sm tracking-[0.5em] uppercase text-gold-light">
          A Beautiful Beginning
        </motion.p>

        <h1 className="flex flex-col items-center gap-6">
          <motion.span
            variants={item}
            className="font-serif text-5xl sm:text-6xl md:text-7xl tracking-[0.08em] uppercase"
          >
            {bride.name}
          </motion.span>

          <motion.span variants={item} className="font-serif text-2xl sm:text-3xl italic text-gold-light">
            &amp;
          </motion.span>

          <motion.span
            variants={item}
            className="font-serif text-5xl sm:text-6xl md:text-7xl tracking-[0.08em] uppercase"
          >
            {groom.name}
          </motion.span>
        </h1>

        <motion.p variants={item} className="mt-2 text-sm sm:text-base tracking-[0.35em]">
          {formatDotDate(weddingDate)}
        </motion.p>

        <motion.p variants={item} className="text-xs sm:text-sm tracking-[0.3em] uppercase text-ivory/70">
          {location.city}, {location.state}
        </motion.p>

        <motion.button
          variants={item}
          type="button"
          onClick={onEnter}
          className="mt-8 flex flex-col items-center gap-2 text-xs sm:text-sm tracking-[0.3em] uppercase text-ivory transition-colors hover:text-gold-light"
        >
          <span>Open Our Invitation</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} aria-hidden="true" />
          </motion.span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

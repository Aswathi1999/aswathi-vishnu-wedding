"use client";

import { useEffect, useRef, useState } from "react";
import { Music } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { START_MUSIC_EVENT } from "@/lib/musicBus";

export function MusicPlayer() {
  const { music } = weddingConfig;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.play().catch(() => setAvailable(false));
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  useEffect(() => {
    const onStart = () => setPlaying(true);
    window.addEventListener(START_MUSIC_EVENT, onStart);
    return () => window.removeEventListener(START_MUSIC_EVENT, onStart);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => setAvailable(false));
    };
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, []);

  if (!music.enabled || !music.src) return null;

  return (
    <>
      <audio ref={audioRef} src={music.src} loop preload="auto" onError={() => setAvailable(false)} />
      <button
        type="button"
        onClick={() => setPlaying((v) => !v)}
        disabled={!available}
        aria-label={playing ? "Music On, tap to turn off" : "Music Off, tap to turn on"}
        aria-pressed={playing}
        title={music.title}
        className="fixed bottom-5 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-gold bg-ivory/90 text-brown shadow-lg backdrop-blur transition-transform hover:scale-105 disabled:opacity-40 sm:bottom-8 sm:right-8"
      >
        <Music size={18} className={playing ? "animate-pulse" : "opacity-40"} aria-hidden="true" />
      </button>
    </>
  );
}

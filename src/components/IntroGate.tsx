"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { IntroScreen } from "@/components/IntroScreen";
import { requestMusicStart } from "@/lib/musicBus";

export function IntroGate({ children }: { children: ReactNode }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    document.body.style.overflow = entered ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [entered]);

  const handleEnter = () => {
    setEntered(true);
    requestMusicStart();
  };

  return (
    <>
      <AnimatePresence>
        {!entered ? <IntroScreen key="intro" onEnter={handleEnter} /> : null}
      </AnimatePresence>
      <div
        aria-hidden={!entered}
        className={entered ? "" : "pointer-events-none select-none"}
      >
        {children}
      </div>
    </>
  );
}

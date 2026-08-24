"use client";

import { useEffect, useState } from "react";

export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function computeCountdown(targetIso: string): CountdownValue {
  const target = new Date(`${targetIso}T00:00:00`).getTime();
  const diff = target - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isPast: false };
}

export function useCountdown(targetIso: string): CountdownValue {
  const [value, setValue] = useState<CountdownValue>(() => computeCountdown(targetIso));

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(computeCountdown(targetIso));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetIso]);

  return value;
}

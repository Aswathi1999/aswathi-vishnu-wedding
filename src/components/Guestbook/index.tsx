"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Loader2, Quote } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

interface GuestbookEntry {
  name: string;
  message: string;
  submittedAt: string;
}

type Status = "idle" | "loading" | "error";

export function Guestbook() {
  const { guestbook } = weddingConfig;
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!guestbook.enabled) return;
    fetch("/api/guestbook")
      .then((res) => res.json())
      .then((data) => setEntries(data.entries ?? []))
      .catch(() => setEntries([]));
  }, [guestbook.enabled]);

  if (!guestbook.enabled) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong.");
      }

      const data = await res.json();
      setEntries((prev) => [data.entry, ...prev]);
      setStatus("idle");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-sand/40 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Words of Love" title="Leave Us a Little Love" />

        <Reveal delay={0.15} className="mx-auto mt-14 max-w-lg">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="guestbook-name" className="text-xs tracking-[0.25em] uppercase text-brown-soft">
                Your Name
              </label>
              <input
                id="guestbook-name"
                name="name"
                type="text"
                required
                maxLength={80}
                className="border-b border-gold/40 bg-transparent py-2 text-brown outline-none transition-colors focus:border-gold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="guestbook-message" className="text-xs tracking-[0.25em] uppercase text-brown-soft">
                Your Message
              </label>
              <textarea
                id="guestbook-message"
                name="message"
                required
                maxLength={500}
                rows={3}
                className="resize-none border-b border-gold/40 bg-transparent py-2 text-brown outline-none transition-colors focus:border-gold"
              />
            </div>

            {status === "error" ? <p className="text-sm text-maroon">{errorMessage}</p> : null}

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 self-start bg-brown px-7 py-3 text-xs tracking-[0.3em] uppercase text-ivory transition-colors hover:bg-maroon disabled:opacity-60"
            >
              {status === "loading" ? <Loader2 className="animate-spin" size={16} aria-hidden="true" /> : null}
              Leave a Message
            </button>
          </form>
        </Reveal>

        {entries.length > 0 ? (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry, index) => (
              <Reveal
                key={`${entry.name}-${entry.submittedAt}`}
                delay={0.05 * (index % 6)}
                className="flex flex-col gap-4 border border-gold/25 bg-ivory p-6"
              >
                <Quote className="text-gold/60" size={20} aria-hidden="true" />
                <p className="font-serif text-lg italic leading-relaxed text-brown">&ldquo;{entry.message}&rdquo;</p>
                <p className="text-xs tracking-[0.2em] uppercase text-brown-soft/70">— {entry.name}</p>
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

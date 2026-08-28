"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Mail } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionFloralAccent } from "@/components/ui/SectionFloralAccent";

type Status = "idle" | "loading" | "success" | "error";

export function BlessingsSection() {
  const { blessings, bride, groom } = weddingConfig;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!blessings.enabled) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", blessings.web3formsAccessKey);
    formData.append("subject", `A Blessing for ${bride.name} & ${groom.name}`);
    formData.append("from_name", `${bride.name} & ${groom.name}'s Wedding Site`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data?.message ?? "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="relative overflow-hidden bg-sand/40 px-5 py-16 sm:px-8 sm:py-24">
      <SectionFloralAccent id="blessings" tone="blush" corners="tl-br" />

      <div className="relative z-10 mx-auto max-w-lg text-center">
        <SectionHeading
          eyebrow="Blessings"
          title="Write Your Blessing"
          subtitle="A few kind words to carry us into forever."
        />

        <Reveal delay={0.15} className="mx-auto mt-10 max-w-md text-left">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 border border-gold/30 px-8 py-14 text-center">
              <p className="text-xs tracking-[0.35em] uppercase text-gold">Thank You</p>
              <p className="font-serif text-xl text-brown">Your blessing has been sent.</p>
              <p className="max-w-sm text-sm leading-relaxed text-brown-soft/85">
                We can&apos;t wait to read your kind words.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-2 text-xs tracking-[0.25em] uppercase text-gold underline underline-offset-4 hover:text-brown"
              >
                Write another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="blessing-name" className="text-xs tracking-[0.25em] uppercase text-brown-soft">
                  Your Name
                </label>
                <input
                  id="blessing-name"
                  name="name"
                  type="text"
                  required
                  maxLength={80}
                  className="border-b border-gold/40 bg-transparent py-2 text-brown outline-none transition-colors focus:border-gold"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="blessing-message" className="text-xs tracking-[0.25em] uppercase text-brown-soft">
                  Your Blessing
                </label>
                <textarea
                  id="blessing-message"
                  name="message"
                  required
                  maxLength={800}
                  rows={4}
                  className="resize-none border-b border-gold/40 bg-transparent py-2 text-brown outline-none transition-colors focus:border-gold"
                />
              </div>

              {status === "error" ? <p className="text-sm text-maroon">{errorMessage}</p> : null}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 inline-flex items-center justify-center gap-2 self-start bg-brown px-7 py-3 text-xs tracking-[0.3em] uppercase text-ivory transition-colors hover:bg-maroon disabled:opacity-60"
              >
                {status === "loading" ? (
                  <Loader2 className="animate-spin" size={15} aria-hidden="true" />
                ) : (
                  <Mail size={15} aria-hidden="true" />
                )}
                Send Your Blessing
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

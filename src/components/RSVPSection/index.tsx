"use client";

import { useState, type FormEvent } from "react";
import { Loader2, MessageCircle } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { formatLongDate } from "@/lib/date";
import { buildWhatsAppUrl, rsvpWhatsAppMessage } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

type Status = "idle" | "loading" | "success" | "error";

export function RSVPSection() {
  const { rsvp, bride, groom, weddingDate, contact } = weddingConfig;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");

  if (!rsvp.enabled) return null;

  const weddingDateLabel = formatLongDate(weddingDate);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      attending: String(formData.get("attending") ?? "yes") as "yes" | "no",
      guests: Number(formData.get("guests") ?? 1),
      message: String(formData.get("message") ?? "").trim(),
    };

    if (!payload.name || !payload.phone) {
      setStatus("error");
      setErrorMessage("Please share your name and phone number.");
      return;
    }

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="rsvp" className="bg-ivory px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-xl">
        <SectionHeading title="We Would Love to Celebrate With You" />

        <Reveal delay={0.15} className="mt-16">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-4 border border-gold/30 px-8 py-16 text-center">
              <p className="text-xs tracking-[0.35em] uppercase text-gold">Thank You</p>
              <p className="font-serif text-2xl text-brown">Your response has been received.</p>
              <p className="max-w-sm text-sm leading-relaxed text-brown-soft/85">
                We can&apos;t wait to celebrate this beautiful day with you.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="rsvp-name" className="text-xs tracking-[0.25em] uppercase text-brown-soft">
                  Name
                </label>
                <input
                  id="rsvp-name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-b border-gold/40 bg-transparent py-2 text-brown outline-none transition-colors focus:border-gold"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="rsvp-phone" className="text-xs tracking-[0.25em] uppercase text-brown-soft">
                  Phone Number
                </label>
                <input
                  id="rsvp-phone"
                  name="phone"
                  type="tel"
                  required
                  className="border-b border-gold/40 bg-transparent py-2 text-brown outline-none transition-colors focus:border-gold"
                />
              </div>

              <fieldset className="flex flex-col gap-3">
                <legend className="text-xs tracking-[0.25em] uppercase text-brown-soft">
                  Will You Be Joining Us?
                </legend>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
                  {[
                    { value: "yes", label: "Joyfully Accept" },
                    { value: "no", label: "Regretfully Decline" },
                  ].map((option) => (
                    <label key={option.value} className="flex cursor-pointer items-center gap-3 text-sm text-brown">
                      <input
                        type="radio"
                        name="attending"
                        value={option.value}
                        checked={attending === option.value}
                        onChange={() => setAttending(option.value as "yes" | "no")}
                        className="h-4 w-4 accent-gold"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              {attending === "yes" ? (
                <div className="flex flex-col gap-2">
                  <label htmlFor="rsvp-guests" className="text-xs tracking-[0.25em] uppercase text-brown-soft">
                    Number of Guests
                  </label>
                  <input
                    id="rsvp-guests"
                    name="guests"
                    type="number"
                    min={1}
                    max={20}
                    defaultValue={1}
                    className="w-24 border-b border-gold/40 bg-transparent py-2 text-brown outline-none transition-colors focus:border-gold"
                  />
                </div>
              ) : (
                <input type="hidden" name="guests" defaultValue={0} />
              )}

              <div className="flex flex-col gap-2">
                <label htmlFor="rsvp-message" className="text-xs tracking-[0.25em] uppercase text-brown-soft">
                  Message
                </label>
                <textarea
                  id="rsvp-message"
                  name="message"
                  rows={3}
                  className="resize-none border-b border-gold/40 bg-transparent py-2 text-brown outline-none transition-colors focus:border-gold"
                />
              </div>

              {status === "error" ? <p className="text-sm text-maroon">{errorMessage}</p> : null}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-4 inline-flex items-center justify-center gap-2 bg-brown px-8 py-4 text-xs tracking-[0.3em] uppercase text-ivory transition-colors hover:bg-maroon disabled:opacity-60"
              >
                {status === "loading" ? <Loader2 className="animate-spin" size={16} aria-hidden="true" /> : null}
                Send RSVP
              </button>

              {contact.whatsapp ? (
                <a
                  href={buildWhatsAppUrl(
                    contact.whatsapp,
                    rsvpWhatsAppMessage(bride.name, groom.name, weddingDateLabel, name || undefined)
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-gold px-8 py-4 text-xs tracking-[0.3em] uppercase text-brown transition-colors hover:bg-gold hover:text-ivory"
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  RSVP via WhatsApp
                </a>
              ) : null}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

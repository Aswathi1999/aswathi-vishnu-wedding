import { weddingConfig } from "@/config/wedding";
import { formatDotDate } from "@/lib/date";
import { GoldDivider } from "@/components/ui/GoldDivider";

export function Footer() {
  const { bride, groom, weddingDate } = weddingConfig;

  return (
    <footer className="bg-ivory px-5 py-12 pb-24 text-center sm:px-8 md:pb-12">
      <div className="mx-auto flex max-w-md flex-col items-center gap-4">
        <p className="font-serif text-lg tracking-[0.15em] text-brown">
          {bride.name} &amp; {groom.name}
        </p>
        <GoldDivider width="w-12" />
        <p className="text-xs tracking-[0.25em] uppercase text-brown-soft/70">{formatDotDate(weddingDate)}</p>
        <p className="mt-4 text-[11px] tracking-[0.15em] text-brown-soft/50">
          Made with love for our wedding day
        </p>
      </div>
    </footer>
  );
}

import { weddingConfig } from "@/config/wedding";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionFloralAccent } from "@/components/ui/SectionFloralAccent";
import { formatDotDate } from "@/lib/date";

export function StoryTimeline() {
  const { story, weddingDate } = weddingConfig;

  if (!story.enabled) return null;

  const items = [...story.milestones, { title: "Forever Begins", description: formatDotDate(weddingDate) }];

  return (
    <section id="story" className="relative overflow-hidden bg-ivory px-5 pt-10 pb-24 sm:px-8 sm:pt-14 sm:pb-32">
      <SectionFloralAccent id="story" tone="blush" corners="tl-br" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <SectionHeading eyebrow="Our Story" title="Our Story" subtitle={story.intro} />

        <ol className="relative mt-12 flex flex-col gap-12 border-l border-gold/40 pl-8 sm:pl-12">
          {items.map((item, index) => (
            <li key={item.title} className="relative">
              <span
                className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full border border-gold bg-ivory sm:-left-[calc(3rem+5px)]"
                aria-hidden="true"
              />
              <Reveal delay={0.05 * index}>
                <p className="text-xs tracking-[0.3em] uppercase text-gold">{item.title}</p>
                <p className="mt-2 font-serif text-xl sm:text-2xl leading-snug text-brown">{item.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

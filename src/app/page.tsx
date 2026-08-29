import { IntroGate } from "@/components/IntroGate";
import { Hero } from "@/components/Hero";
import { CoupleSection } from "@/components/CoupleSection";
import { StoryTimeline } from "@/components/StoryTimeline";
import { Countdown } from "@/components/Countdown";
import { EventsSection } from "@/components/EventsSection";
import { SacredSection } from "@/components/SacredSection";
import { Gallery } from "@/components/Gallery";
import { VideoSection } from "@/components/VideoSection";
import { TravelSection } from "@/components/TravelSection";
import { RSVPSection } from "@/components/RSVPSection";
import { BlessingsSection } from "@/components/BlessingsSection";
import { QRSection } from "@/components/QRSection";
import { ClosingSection } from "@/components/ClosingSection";

export default function Home() {
  return (
    <IntroGate>
      <main>
        <Hero />
        <CoupleSection />
        <StoryTimeline />
        <Countdown />
        <EventsSection />
        <SacredSection />
        <Gallery />
        <VideoSection />
        <TravelSection />
        <RSVPSection />
        <BlessingsSection />
        <QRSection />
        <ClosingSection />
      </main>
    </IntroGate>
  );
}

import { IntroGate } from "@/components/IntroGate";
import { Hero } from "@/components/Hero";
import { CoupleSection } from "@/components/CoupleSection";
import { StoryTimeline } from "@/components/StoryTimeline";
import { Countdown } from "@/components/Countdown";
import { EventsSection } from "@/components/EventsSection";
import { SacredSection } from "@/components/SacredSection";
import { Gallery } from "@/components/Gallery";
import { VideoSection } from "@/components/VideoSection";
import { VenueSection } from "@/components/VenueSection";
import { TravelSection } from "@/components/TravelSection";
import { SaveTheDate } from "@/components/SaveTheDate";
import { RSVPSection } from "@/components/RSVPSection";
import { Guestbook } from "@/components/Guestbook";
import { ShareSection } from "@/components/ShareSection";
import { QRSection } from "@/components/QRSection";
import { ClosingSection } from "@/components/ClosingSection";
import { Footer } from "@/components/Footer";

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
        <VenueSection />
        <TravelSection />
        <SaveTheDate />
        <RSVPSection />
        <Guestbook />
        <ShareSection />
        <QRSection />
        <ClosingSection />
      </main>
      <Footer />
    </IntroGate>
  );
}

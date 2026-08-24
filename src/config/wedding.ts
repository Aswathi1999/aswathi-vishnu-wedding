import type { WeddingConfig } from "@/types/wedding";

/**
 * Single source of truth for the invitation.
 * Update names, dates, venues, copy and media paths here —
 * every component reads from this file instead of hardcoding content.
 */
export const weddingConfig: WeddingConfig = {
  bride: {
    name: "Aswathi",
    fullName: "Aswathi",
    about:
      "Warm-hearted and full of quiet joy, Aswathi brings light to every room she enters.",
    image: "/images/aswathi.jpg",
  },
  groom: {
    name: "Vishnu",
    fullName: "Vishnu",
    about:
      "Grounded and easygoing, Vishnu finds the best in every moment and every person.",
    image: "/images/vishnu.jpg",
  },

  weddingDate: "2026-09-13",
  weddingType: "Hindu",
  tagline: "A Beautiful Beginning",

  location: {
    venue: "Amrutham Auditorium",
    address: "Amrutham Auditorium, Calicut",
    city: "Calicut",
    state: "Kerala",
    country: "India",
    mapsUrl: "",
  },

  contact: {
    whatsapp: "",
  },

  siteUrl: "https://aswathi-and-vishnu.wedding",

  hero: {
    image: "/images/hero.jpg",
  },

  story: {
    enabled: true,
    intro:
      "Some stories are written in moments. Ours is written in memories.",
    milestones: [
      {
        title: "The First Hello",
        description: "A simple beginning that became something beautiful.",
      },
      {
        title: "The Journey",
        description:
          "Conversations, laughter, memories and countless moments together.",
      },
      {
        title: "The Promise",
        description: "A promise to walk through life together.",
      },
    ],
  },

  events: [
    {
      id: "wedding",
      name: "The Wedding",
      date: "2026-09-13",
      time: "10:00-10:30",
      timeLabel: "Muhurtham",
      venue: "Amrutham Auditorium",
      address: "Calicut, Kerala",
      dressCode: "Traditional Attire",
      description:
        "Join us as we take our vows in a sacred Hindu ceremony, blessed by our families.",
      mapsUrl: "",
    },
  ],

  travel: {
    enabled: false,
    gettingThere: {
      airport: "",
      railway: "",
      nearby: "",
    },
    stay: [],
  },

  gallery: {
    enabled: true,
    images: [
      { src: "/images/gallery-01.jpg", alt: "Aswathi and Vishnu walking hand in hand by the sea" },
      { src: "/images/gallery-02.jpg", alt: "Aswathi and Vishnu strolling along the shoreline" },
      { src: "/images/gallery-03.jpg", alt: "Aswathi and Vishnu sharing a quiet moment by the sea" },
      { src: "/images/gallery-04.jpg", alt: "Aswathi and Vishnu smiling together" },
      { src: "/images/gallery-05.jpg", alt: "Aswathi and Vishnu in traditional attire" },
      { src: "/images/gallery-06.jpg", alt: "Aswathi and Vishnu embracing at the entrance" },
    ],
  },

  video: {
    enabled: true,
    url: "",
    poster: "/images/hero.jpg",
  },

  music: {
    enabled: true,
    // Placeholder demo track (synthesized pentatonic melody + drone) — replace with a licensed
    // Kerala/Carnatic instrumental before going live.
    src: "/audio/wedding-theme.wav",
    title: "A Kerala Wedding Instrumental (Demo)",
  },

  guestbook: {
    enabled: true,
  },

  rsvp: {
    enabled: false,
  },

  qr: {
    enabled: true,
  },

  images: {
    hero: "/images/hero.jpg",
    coupleAlt: "/images/couple-alt.svg",
    venue: "/images/venue.svg",
  },
};

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
    location: "Calicut",
    image: "/images/aswathi.jpg",
  },
  groom: {
    name: "Vishnu",
    fullName: "Vishnu",
    location: "Guruvayoor",
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

  siteUrl: "https://aswathi-vishnu-wedding.vercel.app",

  hero: {
    image: "/images/hero.jpg",
  },

  story: {
    enabled: false,
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
      { src: "/images/gallery-04.jpg", alt: "Aswathi and Vishnu smiling together" },
      { src: "/images/gallery-03.jpg", alt: "Aswathi and Vishnu sharing a quiet moment by the sea" },
      { src: "/images/gallery-06.jpg", alt: "Aswathi and Vishnu embracing at the entrance" },
      { src: "/images/gallery-02.jpg", alt: "Aswathi and Vishnu strolling along the shoreline" },
      { src: "/images/460e8068-dce4-4620-9d69-4d52f46f182d.jpeg", alt: "Aswathi and Vishnu in traditional attire" },
    ],
  },

  video: {
    enabled: false,
    url: "",
    poster: "/images/hero.jpg",
  },

  music: {
    enabled: true,
    src: "/audio/the-final-year_6XNgsKYY.mp3",
    title: "The Final Year",
  },

  blessings: {
    enabled: true,
    web3formsAccessKey: "4811e38d-b7fa-4531-a803-9f973f90b43c",
  },

  rsvp: {
    enabled: false,
  },

  qr: {
    enabled: false,
  },

  images: {
    hero: "/images/hero.jpg",
    coupleAlt: "/images/couple-alt.svg",
    venue: "/images/venue.svg",
  },
};

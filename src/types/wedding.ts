export interface PersonInfo {
  name: string;
  fullName: string;
  about: string;
  image: string;
  parents?: string;
}

export interface LocationInfo {
  venue: string;
  address: string;
  city: string;
  state: string;
  country: string;
  mapsUrl: string;
}

export interface StoryMilestone {
  title: string;
  description: string;
}

export interface WeddingEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  /** Optional label shown before the time, e.g. "Muhurtham" */
  timeLabel?: string;
  venue: string;
  address?: string;
  dressCode?: string;
  description?: string;
  mapsUrl?: string;
}

export interface HotelInfo {
  name: string;
  distance: string;
  mapsUrl: string;
}

export interface TravelInfo {
  enabled: boolean;
  gettingThere: {
    airport?: string;
    railway?: string;
    nearby?: string;
  };
  stay: HotelInfo[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
}

export interface WeddingConfig {
  bride: PersonInfo;
  groom: PersonInfo;
  weddingDate: string;
  weddingType: string;
  tagline: string;

  location: LocationInfo;

  contact: {
    whatsapp: string;
  };

  siteUrl: string;

  hero: {
    image: string;
  };

  story: {
    enabled: boolean;
    intro: string;
    milestones: StoryMilestone[];
  };

  events: WeddingEvent[];

  travel: TravelInfo;

  gallery: {
    enabled: boolean;
    images: GalleryImage[];
  };

  video: {
    enabled: boolean;
    url: string;
    poster: string;
  };

  music: {
    enabled: boolean;
    src: string;
    title: string;
  };

  guestbook: {
    enabled: boolean;
  };

  rsvp: {
    enabled: boolean;
  };

  qr: {
    enabled: boolean;
  };

  images: {
    hero: string;
    coupleAlt: string;
    venue: string;
  };
}

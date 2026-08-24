import type { LocationInfo } from "@/types/wedding";

export function getMapsUrl(location: Pick<LocationInfo, "mapsUrl" | "venue" | "address" | "city" | "state" | "country">): string {
  if (location.mapsUrl) return location.mapsUrl;
  const query = [location.venue, location.address, location.city, location.state, location.country]
    .filter(Boolean)
    .join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

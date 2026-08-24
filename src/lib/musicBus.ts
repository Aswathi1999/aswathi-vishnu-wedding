export const START_MUSIC_EVENT = "wedding:start-music";

/** Signals the music player to start — call this only from within a real user gesture
 *  (e.g. a click handler), so the browser's autoplay policy allows audio to begin. */
export function requestMusicStart(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(START_MUSIC_EVENT));
  }
}

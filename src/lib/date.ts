export function formatLongDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatWeekday(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString("en-IN", { weekday: "long" });
}

export function formatDotDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${day} · ${month} · ${year}`;
}

function formatClock(value: string): { label: string; period: "AM" | "PM" } {
  const [hourStr, minuteStr] = value.split(":");
  const hour = Number(hourStr);
  const minute = Number(minuteStr ?? "0");
  const period: "AM" | "PM" = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return { label: `${displayHour}:${minute.toString().padStart(2, "0")}`, period };
}

/** Formats "HH:MM" as "10:00 AM", or a range like "10:00-10:30" as "10:00 – 10:30 AM". */
export function formatTime(time: string): string {
  if (!time) return "[TIME TO BE UPDATED]";
  const parts = time.split("-").map((part) => part.trim()).filter(Boolean);

  if (parts.length === 1) {
    const { label, period } = formatClock(parts[0]);
    return `${label} ${period}`;
  }

  const [start, end] = parts.map(formatClock);
  return start.period === end.period
    ? `${start.label} – ${end.label} ${end.period}`
    : `${start.label} ${start.period} – ${end.label} ${end.period}`;
}

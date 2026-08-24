interface CalendarEventInput {
  title: string;
  description: string;
  location: string;
  isoDate: string;
  time?: string;
  durationHours?: number;
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function toGoogleDate(isoDate: string, time?: string, addHours = 0): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!time) {
    const d = new Date(Date.UTC(year, month - 1, day));
    d.setUTCDate(d.getUTCDate() + addHours);
    return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;
  }
  const [hour, minute] = time.split(":").map(Number);
  const d = new Date(year, month - 1, day, hour, minute);
  d.setHours(d.getHours() + addHours);
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
}

export function buildGoogleCalendarUrl(event: CalendarEventInput): string {
  const isAllDay = !event.time;
  const start = toGoogleDate(event.isoDate, event.time);
  const end = isAllDay
    ? toGoogleDate(event.isoDate, undefined, 1)
    : toGoogleDate(event.isoDate, event.time, event.durationHours ?? 3);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    details: event.description,
    location: event.location,
    dates: `${start}/${end}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcsContent(event: CalendarEventInput): string {
  const isAllDay = !event.time;
  const start = toGoogleDate(event.isoDate, event.time);
  const end = isAllDay
    ? toGoogleDate(event.isoDate, undefined, 1)
    : toGoogleDate(event.isoDate, event.time, event.durationHours ?? 3);

  const dtStart = isAllDay ? `DTSTART;VALUE=DATE:${start}` : `DTSTART:${start}`;
  const dtEnd = isAllDay ? `DTEND;VALUE=DATE:${end}` : `DTEND:${end}`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Aswathi & Vishnu//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    dtStart,
    dtEnd,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${event.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(event: CalendarEventInput, filename: string): void {
  const content = buildIcsContent(event);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

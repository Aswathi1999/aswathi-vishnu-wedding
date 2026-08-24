export function buildWhatsAppUrl(phone: string, message: string): string {
  const digits = phone.replace(/[^\d]/g, "");
  const base = digits ? `https://wa.me/${digits}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function rsvpWhatsAppMessage(
  brideName: string,
  groomName: string,
  weddingDateLabel: string,
  guestName?: string
): string {
  const greeting = guestName ? `Hi ${brideName} & ${groomName}! This is ${guestName}.` : `Hi ${brideName} & ${groomName}!`;
  return `${greeting}\n\nI'm happy to confirm my presence at your wedding on ${weddingDateLabel}.\n\nLooking forward to celebrating with you!`;
}

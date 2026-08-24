import { NextResponse } from "next/server";
import { mkdir, appendFile } from "node:fs/promises";
import { join } from "node:path";
import { sql, ensureSchema } from "@/lib/db";

interface RsvpPayload {
  name: string;
  phone: string;
  attending: "yes" | "no";
  guests: number;
  message?: string;
}

function isValidPayload(body: unknown): body is RsvpPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.phone === "string" &&
    b.phone.trim().length >= 7 &&
    (b.attending === "yes" || b.attending === "no") &&
    typeof b.guests === "number" &&
    b.guests >= 0 &&
    b.guests <= 20
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  const name = body.name.trim();
  const phone = body.phone.trim();
  const message = body.message?.trim() ?? "";

  try {
    if (sql) {
      await ensureSchema();
      await sql`
        INSERT INTO rsvps (name, phone, attending, guests, message)
        VALUES (${name}, ${phone}, ${body.attending}, ${body.guests}, ${message})
      `;
    } else {
      const dataDir = join(process.cwd(), "data");
      await mkdir(dataDir, { recursive: true });
      const entry = { name, phone, attending: body.attending, guests: body.guests, message, submittedAt: new Date().toISOString() };
      await appendFile(join(dataDir, "rsvps.jsonl"), `${JSON.stringify(entry)}\n`, "utf8");
    }
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

import { NextResponse } from "next/server";
import { mkdir, appendFile, readFile } from "node:fs/promises";
import { join } from "node:path";
import { sql, ensureSchema } from "@/lib/db";

interface GuestbookEntry {
  name: string;
  message: string;
  submittedAt: string;
}

const DATA_DIR = join(process.cwd(), "data");
const DATA_FILE = join(DATA_DIR, "guestbook.jsonl");

function isValidPayload(body: unknown): body is { name: string; message: string } {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    b.name.trim().length <= 80 &&
    typeof b.message === "string" &&
    b.message.trim().length > 0 &&
    b.message.trim().length <= 500
  );
}

export async function GET() {
  try {
    if (sql) {
      await ensureSchema();
      const rows = await sql`
        SELECT name, message, submitted_at AS "submittedAt"
        FROM guestbook_entries
        ORDER BY submitted_at DESC
      `;
      return NextResponse.json({ entries: rows });
    }

    const raw = await readFile(DATA_FILE, "utf8");
    const entries: GuestbookEntry[] = raw
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line))
      .reverse();
    return NextResponse.json({ entries });
  } catch {
    return NextResponse.json({ entries: [] });
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Please share your name and a short message." }, { status: 400 });
  }

  const name = body.name.trim();
  const message = body.message.trim();

  try {
    if (sql) {
      await ensureSchema();
      const [row] = await sql`
        INSERT INTO guestbook_entries (name, message)
        VALUES (${name}, ${message})
        RETURNING name, message, submitted_at AS "submittedAt"
      `;
      return NextResponse.json({ success: true, entry: row });
    }

    const entry: GuestbookEntry = { name, message, submittedAt: new Date().toISOString() };
    await mkdir(DATA_DIR, { recursive: true });
    await appendFile(DATA_FILE, `${JSON.stringify(entry)}\n`, "utf8");
    return NextResponse.json({ success: true, entry });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

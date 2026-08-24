import { neon } from "@neondatabase/serverless";

const connectionString =
  process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL;

/** Neon/Vercel Postgres client, or null when no database is configured (falls back to local files). */
export const sql = connectionString ? neon(connectionString) : null;

let schemaReady: Promise<void> | null = null;

/** Creates the tables on first use. Cheap no-op once they already exist. */
export function ensureSchema(): Promise<void> {
  if (!sql) return Promise.resolve();
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS rsvps (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          attending TEXT NOT NULL,
          guests INTEGER NOT NULL DEFAULT 0,
          message TEXT NOT NULL DEFAULT '',
          submitted_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS guestbook_entries (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          message TEXT NOT NULL,
          submitted_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
    })();
  }
  return schemaReady;
}

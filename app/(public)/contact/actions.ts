"use server";

import { createHash } from "crypto";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Note: a "use server" file may only export async functions, so this list
// stays module-private; type-only exports are erased at compile time.
const CONTACT_TOPICS = [
  "vendor-listing",
  "review-submission",
  "correction",
  "partnership",
  "general",
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string; mailtoFallback?: boolean };

export async function sendContactMessage(input: {
  name: string;
  email: string;
  topic: string;
  message: string;
  /** Honeypot — humans never see this field; bots fill it. */
  website?: string;
  source: string;
}): Promise<ContactResult> {
  // Silently accept honeypot submissions so bots think they succeeded.
  if (input.website && input.website.trim() !== "") return { ok: true };

  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const message = input.message.trim();
  const topic = (CONTACT_TOPICS as readonly string[]).includes(input.topic)
    ? input.topic
    : "general";

  if (!name) return { ok: false, error: "Tell us your name." };
  if (name.length > 100) return { ok: false, error: "That name looks too long." };
  if (!email) return { ok: false, error: "Enter your email address." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Enter a valid email address." };
  if (message.length < 10) {
    return { ok: false, error: "Give us a little more detail — at least 10 characters." };
  }
  if (message.length > 2000) {
    return { ok: false, error: "Please keep your message under 2,000 characters." };
  }

  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";
  const ipHash = createHash("sha256").update(ip).digest("hex");

  const supabase = createAdminClient();
  const { error } = await supabase.from("contact_messages").insert({
    name,
    email,
    topic,
    message,
    ip_hash: ipHash,
    user_agent: headersList.get("user-agent"),
    page_source: input.source || "/contact",
  });

  if (error) {
    // Table missing (migration 007 not run yet): PostgREST reports PGRST205,
    // raw Postgres reports 42P01 — either way let the client fall back to a
    // prefilled mailto link so the message still reaches us.
    if (error.code === "PGRST205" || error.code === "42P01") {
      return { ok: false, error: "Our message inbox is briefly unavailable.", mailtoFallback: true };
    }
    return { ok: false, error: "Something went wrong sending your message. Please try again." };
  }

  return { ok: true };
}

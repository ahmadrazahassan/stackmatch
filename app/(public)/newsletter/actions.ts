"use server";

import { createHash } from "crypto";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SubscribeResult =
  | { ok: true; status: "new" | "resubscribed" | "already" }
  | { ok: false; error: string };

export async function subscribeToNewsletter(input: {
  email: string;
  interests: string[];
  consent: boolean;
  source: string;
}): Promise<SubscribeResult> {
  const email = input.email.trim().toLowerCase();

  if (!email) return { ok: false, error: "Enter your email address." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Enter a valid email address." };
  if (!input.consent) {
    return { ok: false, error: "You need to agree to receive emails before subscribing." };
  }

  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";
  const consentIpHash = createHash("sha256").update(ip).digest("hex");
  const userAgent = headersList.get("user-agent");

  const supabase = createAdminClient();

  const { data: existing, error: lookupError } = await supabase
    .from("newsletter_subscribers")
    .select("id, status")
    .eq("email", email)
    .maybeSingle();

  if (lookupError) return { ok: false, error: lookupError.message };

  if (existing?.status === "confirmed" || existing?.status === "pending") {
    return { ok: true, status: "already" };
  }

  const consentValues = {
    interests: input.interests,
    consent_ip_hash: consentIpHash,
    consent_source: input.source || "/",
    user_agent: userAgent,
  };

  if (existing) {
    // Row exists but was previously unsubscribed — welcome them back.
    const { error } = await supabase
      .from("newsletter_subscribers")
      .update({
        status: "confirmed",
        confirmed_at: new Date().toISOString(),
        unsubscribed_at: null,
        ...consentValues,
      })
      .eq("id", existing.id);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/admin/newsletter");
    return { ok: true, status: "resubscribed" };
  }

  const { error: insertError } = await supabase.from("newsletter_subscribers").insert({
    email,
    status: "confirmed",
    confirmed_at: new Date().toISOString(),
    ...consentValues,
  });

  if (insertError) {
    // Unique-constraint race: two submits for the same email landed together.
    if (insertError.code === "23505") return { ok: true, status: "already" };
    return { ok: false, error: insertError.message };
  }

  revalidatePath("/admin/newsletter");
  return { ok: true, status: "new" };
}

export type UnsubscribeResult =
  | { ok: true; alreadyUnsubscribed: boolean }
  | { ok: false; error: string };

export async function unsubscribeFromNewsletter(rawEmail: string): Promise<UnsubscribeResult> {
  const email = rawEmail.trim().toLowerCase();
  if (!email) return { ok: false, error: "Enter your email address." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Enter a valid email address." };

  const supabase = createAdminClient();
  const { data: existing, error: lookupError } = await supabase
    .from("newsletter_subscribers")
    .select("id, status")
    .eq("email", email)
    .maybeSingle();

  if (lookupError) return { ok: false, error: lookupError.message };
  if (!existing) {
    return { ok: false, error: "We couldn't find that email on our list." };
  }
  if (existing.status === "unsubscribed") {
    return { ok: true, alreadyUnsubscribed: true };
  }

  const { error } = await supabase
    .from("newsletter_subscribers")
    .update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString() })
    .eq("id", existing.id);

  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/newsletter");
  return { ok: true, alreadyUnsubscribed: false };
}

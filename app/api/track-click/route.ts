import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/**
 * Affiliate click tracker.
 * GET /api/track-click?id=<software_id>
 * Records the click (anonymised IP hash) and 302-redirects to the affiliate
 * URL, falling back to the vendor website, then the homepage.
 */
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const home = new URL("/", request.nextUrl.origin);
  if (!id) return NextResponse.redirect(home, 302);

  try {
    const supabase = createAdminClient();
    const { data: software } = await supabase
      .from("software")
      .select("id, name, affiliate_url, vendor_website")
      .eq("id", id)
      .maybeSingle();

    if (!software) return NextResponse.redirect(home, 302);

    const destination = software.affiliate_url || software.vendor_website;
    if (!destination) return NextResponse.redirect(home, 302);

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";
    const ipHash = createHash("sha256").update(ip).digest("hex");

    // Vercel populates this header with the visitor's country.
    const countryCode = request.headers.get("x-vercel-ip-country");

    await supabase.from("affiliate_clicks").insert({
      software_id: software.id,
      software_name: software.name,
      affiliate_url: destination,
      ip_hash: ipHash,
      user_agent: request.headers.get("user-agent"),
      referrer: request.headers.get("referer"),
      country_code: countryCode,
    });

    return NextResponse.redirect(destination, 302);
  } catch {
    return NextResponse.redirect(home, 302);
  }
}

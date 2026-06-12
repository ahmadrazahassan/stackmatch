import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

/** GET /api/og?title=&subtitle= → branded 1200x630 OG image */
export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title") ?? "CloudPayZA";
  const subtitle =
    request.nextUrl.searchParams.get("subtitle") ??
    "South Africa's #1 Business Software Reviews Platform";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#1B1F3B",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: 36, fontWeight: 700, color: "#FFFFFF" }}>CloudPay</span>
          <span style={{ fontSize: 36, fontWeight: 700, color: "#00A86B" }}>ZA</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span
            style={{
              fontSize: title.length > 40 ? 52 : 64,
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.15,
            }}
          >
            {title}
          </span>
          <span style={{ fontSize: 28, color: "#9CA3AF" }}>{subtitle}</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 22, color: "#6B7280" }}>cloudpayza.com</span>
          <div
            style={{
              display: "flex",
              backgroundColor: "#00A86B",
              borderRadius: 8,
              padding: "10px 24px",
            }}
          >
            <span style={{ fontSize: 22, fontWeight: 600, color: "#FFFFFF" }}>
              Verified Reviews
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

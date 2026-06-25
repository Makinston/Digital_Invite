import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const origin = request.headers.get("origin") ?? request.nextUrl.origin;
  const url = `${origin}/invite/${token}`;

  const svg = await QRCode.toString(url, {
    type: "svg",
    margin: 2,
    color: {
      dark: "#C9A227",
      light: "#0D0B08",
    },
  });

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

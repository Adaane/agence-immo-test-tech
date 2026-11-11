import { type NextRequest, NextResponse } from "next/server";
import { getProperty } from "@/lib/properties/data";

// An unknown bien must answer 404. The Fiche streams, so a notFound() thrown
// while rendering would keep the 200 status: reject it before rendering.
export function proxy(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/")[2] ?? "";
  // Identifiers are ASCII slugs: no decoding needed (and none that can throw).
  if (getProperty(id)) return NextResponse.next();
  // No route matches this path, so Next.js serves its not-found page with a 404.
  return NextResponse.rewrite(new URL("/_bien-introuvable", request.url));
}

export const config = {
  matcher: "/biens/:id",
};

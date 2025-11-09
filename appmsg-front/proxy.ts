import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token");

  if (!token?.value) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}
export const config = {
  matcher: ["/"],
};

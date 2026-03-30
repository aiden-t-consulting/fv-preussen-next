import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "admin_session";

/** Verify an HMAC-signed session token using the Web Crypto API (Edge-safe) */
async function verifySession(token: string, secret: string): Promise<boolean> {
  try {
    const [payloadB64, sig] = token.split(".");
    if (!payloadB64 || !sig) return false;

    const payload = JSON.parse(atob(payloadB64));
    if (!payload.exp || Date.now() > payload.exp) return false;

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const expected = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(payloadB64)
    );
    const expectedHex = Array.from(new Uint8Array(expected))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return expectedHex === sig;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pass the pathname to the layout via header (used to hide Header/Footer)
  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);

  // Allow login page through without auth check
  if (pathname === "/admin/login") return response;

  // Protect all /admin/* routes
  if (pathname.startsWith("/admin")) {
    const secret = process.env.ADMIN_SESSION_SECRET ?? "";
    const sessionCookie = request.cookies.get(SESSION_COOKIE);

    if (!sessionCookie?.value || !secret || !(await verifySession(sessionCookie.value, secret))) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Add security headers to all admin responses
    response.headers.set("x-frame-options", "DENY");
    response.headers.set("x-content-type-options", "nosniff");
    response.headers.set("referrer-policy", "no-referrer");
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};

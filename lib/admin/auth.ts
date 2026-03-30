import { cookies } from "next/headers";

export const SESSION_COOKIE = "admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// ── HMAC signing (Node.js crypto — used in Server Actions/API routes only) ───

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

async function sign(payload: string, secret: string): Promise<string> {
  const key = await getKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Create a signed session token string */
export async function createSessionToken(): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET ?? "";
  const payload = btoa(JSON.stringify({ loggedIn: true, exp: Date.now() + SESSION_TTL_MS }));
  const sig = await sign(payload, secret);
  return `${payload}.${sig}`;
}

/** Verify the session token and check expiry */
export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const secret = process.env.ADMIN_SESSION_SECRET ?? "";
    const [payloadB64, sig] = token.split(".");
    if (!payloadB64 || !sig) return false;

    const payload = JSON.parse(atob(payloadB64));
    if (!payload.exp || Date.now() > payload.exp) return false;

    const expected = await sign(payloadB64, secret);
    return expected === sig;
  } catch {
    return false;
  }
}

/** Verify password against env var using constant-time comparison */
export function verifyPassword(input: string): boolean {
  const stored = process.env.ADMIN_PASSWORD ?? "";
  if (!stored || !input) return false;
  // constant-time compare to prevent timing attacks
  if (input.length !== stored.length) return false;
  let diff = 0;
  for (let i = 0; i < input.length; i++) {
    diff |= input.charCodeAt(i) ^ stored.charCodeAt(i);
  }
  return diff === 0;
}

/** Cookie options for the session cookie */
export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/admin",
    maxAge: SESSION_TTL_MS / 1000,
  };
}

/** Read and verify the current session from the cookie store */
export async function getSessionFromCookies(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

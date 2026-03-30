"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  verifyPassword,
  createSessionToken,
  sessionCookieOptions,
  SESSION_COOKIE,
} from "@/lib/admin/auth";

export async function loginAction(formData: FormData) {
  const password = formData.get("password");
  if (typeof password !== "string" || !password) return;

  if (!verifyPassword(password)) {
    redirect("/admin/login?error=1");
  }

  const token = await createSessionToken();
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, sessionCookieOptions());
  redirect("/admin");
}

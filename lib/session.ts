"use server";

import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { verifyAuthToken } from "./auth";
import { AUTH_COOKIE_NAME } from "./constants";

const baseCookieSettings = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export async function setAuthCookie(value: string) {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, value, {
    ...baseCookieSettings,
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, "", {
    ...baseCookieSettings,
    maxAge: 0,
  });
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }

  const payload = await verifyAuthToken(token);
  if (!payload?.sub) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id: payload.sub },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      createdAt: true,
    },
  });
}

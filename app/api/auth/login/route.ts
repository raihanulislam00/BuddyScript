import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validation";
import { createAuthToken } from "@/lib/auth";
import { setAuthCookie } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const result = loginSchema.safeParse(payload);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message ?? "Invalid credentials" },
        { status: 400 },
      );
    }

    const { email, password } = result.data;
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);

    if (!passwordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await createAuthToken({ sub: user.id, email: user.email });
    await setAuthCookie(token);

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
    };

    return NextResponse.json({ user: safeUser });
  } catch (error) {
    console.error("Login error", error);
    return NextResponse.json({ error: "Unable to login" }, { status: 500 });
  }
}

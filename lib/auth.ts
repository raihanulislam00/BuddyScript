import { SignJWT, jwtVerify, JWTPayload } from "jose";

const encoder = new TextEncoder();
const secret = encoder.encode(process.env.JWT_SECRET || "change-me");

export interface AuthTokenPayload extends JWTPayload {
  sub: string;
  email: string;
}

export async function createAuthToken(payload: AuthTokenPayload) {
  return new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyAuthToken(token: string) {
  try {
    const result = await jwtVerify<AuthTokenPayload>(token, secret);
    return result.payload;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Invalid auth token", error);
    }
    return null;
  }
}

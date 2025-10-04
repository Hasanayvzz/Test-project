"use server";

import { cookies } from "next/headers";
import { SignJWT } from "jose";

interface AuthCredentials {
  email: any;
  accessToken: any;
  refreshToken: any;
  expiresAt: any;
  refreshExpiresAt: any;
}

export async function authenticateUser(credentials: AuthCredentials) {
  try {
    const { email, accessToken, refreshToken, expiresAt, refreshExpiresAt } =
      credentials;

    if (!accessToken || !email) {
      return {
        success: false,
        error: "Email ve access token gerekli",
      };
    }

    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

    const token = await new SignJWT({
      email,
      accessToken,
      refreshToken,
      expiresAt,
      refreshExpiresAt,
      sub: email,
      iat: Math.floor(Date.now() / 1000),
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("10h")
      .sign(secret);

    const cookieStore = cookies();

    const isProduction = process.env.NODE_ENV === "production";

    cookieStore.set("next-auth.session-token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 36000,
      path: "/",
    });

    if (!isProduction) {
      cookieStore.set("__Secure-next-auth.session-token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 36000,
        path: "/",
      });
    }

    return {
      success: true,
      user: {
        email,
        accessToken,
      },
    };
  } catch (error) {
    console.error("❌ Authentication error:", error);
    return {
      success: false,
      error: "Kimlik doğrulama başarısız oldu",
    };
  }
}

export async function signOutUser() {
  try {
    const cookieStore = cookies();

    cookieStore.delete("next-auth.session-token");
    cookieStore.delete("__Secure-next-auth.session-token");

    return { success: true };
  } catch (error) {
    console.error("❌ Sign out error:", error);
    return { success: false };
  }
}

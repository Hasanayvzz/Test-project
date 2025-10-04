import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        accessToken: { label: "Access Token", type: "text" },
        refreshToken: { label: "Refresh Token", type: "text" },
        expiresAt: { label: "Expires At", type: "text" },
        refreshExpiresAt: { label: "Refresh Expires At", type: "text" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.accessToken) {
            console.error("No access token provided");
            return null;
          }

          return {
            id: credentials.email,
            email: credentials.email,
            accessToken: credentials.accessToken,
            refreshToken: credentials.refreshToken,
            expiresAt: parseInt(credentials.expiresAt),
            refreshExpiresAt: parseInt(credentials.refreshExpiresAt),
          } as any;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.refreshToken = (user as any).refreshToken;
        token.expiresAt = (user as any).expiresAt;
        token.refreshExpiresAt = (user as any).refreshExpiresAt;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 36000,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

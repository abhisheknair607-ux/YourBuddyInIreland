import NextAuth from "next-auth";
import type { Account, User } from "next-auth";
import Apple from "next-auth/providers/apple";
import Google from "next-auth/providers/google";

import { saveAuthUser } from "@/lib/authUserStore";

const providers = [];
const authSecret =
  process.env.AUTH_SECRET || "replace-this-auth-secret-before-production";

if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    })
  );
}

if (process.env.AUTH_APPLE_ID && process.env.AUTH_APPLE_SECRET) {
  providers.push(
    Apple({
      clientId: process.env.AUTH_APPLE_ID,
      clientSecret: process.env.AUTH_APPLE_SECRET
    })
  );
}

export const authConfig = {
  secret: authSecret,
  trustHost: true,
  session: {
    strategy: "jwt" as const
  },
  pages: {
    signIn: "/login"
  },
  providers,
  events: {
    async signIn({
      user,
      account
    }: {
      user: User;
      account?: Account | null;
    }) {
      if (!account?.provider || !account.providerAccountId) {
        return;
      }

      await saveAuthUser({
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        name: user.name,
        email: user.email,
        image: user.image,
        privacyAccepted: true
      });
    }
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

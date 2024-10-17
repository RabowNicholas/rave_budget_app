import { getAPIBaseURL } from "@/utils/ApiHelper";
import NextAuth, { DefaultSession } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

export type ExtenderUser = DefaultSession["user"] & {
  id: string | undefined;
};

declare module "next-auth" {
  interface Session {
    user: ExtenderUser;
  }
}

const handler = NextAuth({
  pages: { signIn: "/signIn" },
  session: {
    strategy: "jwt",
  },
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      session.user.id = token.sub;
      return session;
    },
    async jwt({ user, trigger, token }) {
      if (trigger === "signIn" || trigger == "signUp") {
        const apiBaseUrl = getAPIBaseURL();
        if (apiBaseUrl !== "demo") {
          const response = await fetch(
            `${getAPIBaseURL()}/users/${user.name}`,
            {
              method: "POST",
            }
          );
          const data = await response.json();
          token.sub = data.id;
        }
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

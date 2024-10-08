import { getAPIBaseURL } from "@/utils/ApiHelper";
import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

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

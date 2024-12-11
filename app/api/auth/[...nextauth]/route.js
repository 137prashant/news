import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  // Add session strategy to prevent hydration issues
  session: {
    strategy: "jwt",
  },
  // Optional: Add callbacks for more control
  callbacks: {
    async session({ session, token }) {
      // Pass user ID to the session
      session.user.id = token.sub;
      return session;
    },
  },
});

export { handler as GET, handler as POST };

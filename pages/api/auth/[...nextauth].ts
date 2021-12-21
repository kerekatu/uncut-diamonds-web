import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: 'identify' } },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    session: async ({ token, session }: any) => {
      session.user.id = token.sub
      session.user.image = token.picture
      return session
    },
  },
})

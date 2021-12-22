import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import { faunaClient } from '@/libs/fauna'
import { FaunaAdapter } from '@next-auth/fauna-adapter'
import { query as q } from 'faunadb'

export default NextAuth({
  adapter: FaunaAdapter(faunaClient),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: 'identify' } },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: { strategy: 'jwt' },
  callbacks: {
    session: async ({ token, session }: any) => {
      const userDiscordId = await faunaClient.query(
        q.Get(q.Match(q.Index('account_by_id'), token.sub))
      )

      session.user.image = token.picture
      session.user.id = userDiscordId
        ? userDiscordId.data.providerAccountId
        : token.sub
      return session
    },
  },
})

import NextAuth, { Account } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import { faunaClient } from '@/libs/fauna'
import { FaunaAdapter } from '@next-auth/fauna-adapter'
import { parseJSON, query as q } from 'faunadb'

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
    session: async ({ token, session }) => {
      if (token.sub && token.picture) {
        const userDiscordId: { ref: string; ts: number; data: Account } =
          await faunaClient.query(
            q.Get(q.Match(q.Index('account_by_id'), token.sub))
          )

        session.user.ref = token.sub
        session.user.image = token.picture
        session.user.id = userDiscordId?.data
          ? userDiscordId.data.providerAccountId
          : ''
      }

      return session
    },
  },
})

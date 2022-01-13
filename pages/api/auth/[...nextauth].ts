import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import { faunaClient } from '@/libs/fauna'
import { FaunaAdapter } from '@next-auth/fauna-adapter'
import { query as q } from 'faunadb'
import { UserDiscord } from 'types'

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
    jwt: async ({ token, profile, account }) => {
      if (profile) {
        token = {
          ...token,
          id: profile?.id,
          access_token: account?.access_token,
        }
      }

      return token
    },
    session: async ({ token, session }) => {
      const discordImageResponse = await fetch(
        `https://discord.com/api/users/@me`,
        {
          headers: {
            Authorization: 'Bearer ' + token.access_token,
          },
        }
      )
      const discordImage: UserDiscord = await discordImageResponse.json()

      if (token && token?.id) {
        const image = discordImage?.avatar
          ? `https://cdn.discordapp.com/avatars/${token.id}/${discordImage.avatar}`
          : 'https://cdn.discordapp.com/embed/avatars/0.png'

        await faunaClient.query(
          q.Update(q.Ref(q.Collection('users'), token?.sub), {
            data: {
              name: token.name,
              image,
              id: token.id,
            },
          })
        )

        session.user.ref = token.sub ?? ''
        session.user.image = image
        session.user.id = token.id as string
      }

      return session
    },
  },
})

import { faunaClient } from '@/libs/fauna'
import { query as q } from 'faunadb'
import { User, UserBalance } from 'types'

export const getUsers = async () => {
  try {
    const response = await fetch(
      `https://unbelievaboat.com/api/v1/guilds/${process.env.DISCORD_SERVER_ID}/users`,
      {
        headers: {
          Authorization: process.env.UNBELIEVABOAT_TOKEN,
        },
      }
    )
    const users: User[] = await response.json()

    if (!users) return { status: '404', error: 'No users found' }

    return { status: '200', data: users }
  } catch (error) {
    return { status: '400', error }
  }
}

export const getUserById = async (id: string) => {
  try {
    const userInfo: { name: string; image: string } = await faunaClient.query(
      q.Let(
        { doc: q.Get(q.Match(q.Index('user_by_id'), id)) },
        {
          name: q.Select(['data', 'name'], q.Var('doc')),
          image: q.Select(['data', 'image'], q.Var('doc')),
        }
      )
    )

    const userBalance = await fetch(
      `https://unbelievaboat.com/api/v1/guilds/${process.env.DISCORD_SERVER_ID}/users/${id}`,
      {
        headers: {
          Authorization: process.env.UNBELIEVABOAT_TOKEN,
        },
      }
    )
    const responseUserBalance: UserBalance = await userBalance.json()

    if (!responseUserBalance || !userInfo)
      return { status: '404', error: 'No user found' }

    const user: User = { ...responseUserBalance, ...userInfo }

    return { status: '200', data: user }
  } catch (error) {
    return { status: '400', error }
  }
}

export const patchUserOnPurchase = async (
  id: string,
  ref: string,
  price: number
) => {
  try {
    const checkUser = await faunaClient.query(
      q.Get(q.Match(q.Index('account_by_id'), ref))
    )

    const userBalance = await getUserById(id)

    if (userBalance.data && userBalance.data.bank < price)
      return {
        status: '401',
        error: "You don't have enough money to buy it",
      }

    if (!checkUser)
      return {
        status: '401',
        error: 'No permission to perform this action',
      }

    const response = await fetch(
      `https://unbelievaboat.com/api/v1/guilds/${process.env.DISCORD_SERVER_ID}/users/${id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: process.env.UNBELIEVABOAT_TOKEN,
        },
        body: JSON.stringify({ bank: -price }),
      }
    )
    const user = await response.json()

    if (!user) return { status: '404', error: 'No users found' }

    return { status: '200', data: user }
  } catch (error) {
    return { status: '400', error }
  }
}

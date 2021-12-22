import { faunaClient } from '@/libs/fauna'
import { query as q } from 'faunadb'

export const getShopItems = async () => {
  try {
    const response = await faunaClient.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('shop'))),
        q.Lambda('ref', q.Get(q.Var('ref')))
      )
    )

    if (!response) return { status: '404', error: 'No shop items found' }

    const { data } = response

    return { status: '200', data }
  } catch (error) {
    return { status: '400', error }
  }
}

export const createShopItem = async ({
  title,
  description,
  price,
  stock,
  image,
}) => {
  try {
    const response = await faunaClient.query(
      q.Create(q.Collection('shop'), {
        data: { title, description, price, stock, image },
      })
    )

    if (!response) return { status: '404', error: 'Could not create shop item' }

    return { status: '200', data: response }
  } catch (error) {
    return { status: '400', error }
  }
}

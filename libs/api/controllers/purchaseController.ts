import { patchUserOnPurchase } from '@/libs/api/controllers/userController'
import { faunaClient } from '@/libs/fauna'
import { query as q } from 'faunadb'
import { getShopItemByRef } from '@/libs/api/controllers/shopControllers'

export const handlePurchase = async ({
  id,
  ref,
  item,
}: {
  id: string
  ref: string
  item: string
}) => {
  try {
    const shopItem = await getShopItemByRef(item)

    if (!shopItem)
      return {
        status: '404',
        error: 'No shop item found',
      }

    const updateUser = await patchUserOnPurchase(id, ref, shopItem.data.price)

    if (!updateUser || updateUser.status !== '200')
      return {
        status: updateUser.status,
        error: 'No permission to perform this action',
      }

    const response = await faunaClient.query(
      q.Create(q.Collection('purchases'), {
        data: { user_id: id, item: shopItem.data },
      })
    )

    if (!response) return { status: '404', error: 'No users found' }

    return { status: '200', data: response }
  } catch (error) {
    return { status: '400', error }
  }
}

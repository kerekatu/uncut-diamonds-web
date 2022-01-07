import { patchUserOnPurchase } from '@/libs/api/controllers/userController'
import { faunaClient } from '@/libs/fauna'
import { query as q } from 'faunadb'
import {
  getShopItemByRef,
  updateShopItem,
} from '@/libs/api/controllers/shopControllers'
import logPurchase from '@/libs/webhook'

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

    if (!shopItem || shopItem.data.stock === '0')
      return {
        status: '404',
        error: 'No shop item found or it has expired',
      }

    const updateUser = await patchUserOnPurchase(id, ref, shopItem.data.price)

    if (!updateUser || updateUser.status !== '200')
      return {
        status: updateUser.status,
        error: updateUser?.error,
      }

    if (shopItem.data.stock !== 'Infinite') {
      const updatedShopItem = await updateShopItem({
        stock: parseInt(shopItem.data.stock),
        ref: item,
      })

      if (!updatedShopItem || updatedShopItem.status !== '200') {
        return {
          status: updatedShopItem.status,
          error: updatedShopItem?.error,
        }
      }
    }

    const response = await faunaClient.query(
      q.Create(q.Collection('purchases'), {
        data: { user_id: id, item: shopItem.data },
      })
    )

    if (!response)
      return { status: '404', error: 'Could not purchase the item' }

    logPurchase(id, shopItem.data)

    return { status: '200', data: response }
  } catch (error) {
    return { status: '400', error }
  }
}

export const getPurchases = async () => {
  try {
    const response: any = await faunaClient.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('purchases'))),
        q.Lambda('ref', q.Get(q.Var('ref')))
      )
    )

    if (!response) return { status: '404', error: 'No purchases found' }

    const { data } = response

    return { status: '200', data }
  } catch (error) {
    return { status: '400', error }
  }
}

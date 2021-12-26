import type { NextApiRequest, NextApiResponse } from 'next'
import cors from 'cors'
import nc from 'next-connect'
import {
  createShopItem,
  getShopItems,
} from '@/libs/api/controllers/shopControllers'
import { handlePurchase } from '@/libs/api/controllers/purchaseController'

const handler = nc<NextApiRequest, NextApiResponse>().use(cors())

handler.get(async (req, res) => {
  try {
    const items = await getShopItems()
    res.status(200).json(items)
  } catch (error) {
    res.status(400).send({ status: '400', error })
  }
})

handler.patch(async (req, res) => {
  try {
    const purchase = await handlePurchase({
      id: req.body.id,
      ref: req.body.ref,
      item: req.body.item,
    })
    res.status(200).json(purchase)
  } catch (error) {
    res.status(400).send({ status: '400', error })
  }
})

// handler.post(async (req, res) => {
//   try {
//     const item = await createShopItem({
//       title: req.body.title,
//       description: req.body.description,
//       price: req.body.price,
//       stock: req.body.stock,
//       image: req.body.image,
//     })
//     res.status(200).json(item)
//   } catch (error) {
//     res.status(400).send({ status: '400', error })
//   }
// })

export default handler

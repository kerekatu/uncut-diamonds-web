import type { NextApiRequest, NextApiResponse } from 'next'
import cors from 'cors'
import nc from 'next-connect'
import { getPurchases } from '@/libs/api/controllers/purchaseController'

const handler = nc<NextApiRequest, NextApiResponse>().use(cors())

handler.get(async (req, res) => {
  try {
    const purchases = await getPurchases()
    res.status(200).json(purchases)
  } catch (error) {
    res.status(400).send({ status: '400', error })
  }
})

export default handler

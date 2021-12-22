import type { NextApiRequest, NextApiResponse } from 'next'
import cors from 'cors'
import nc from 'next-connect'
import { getUserById } from '@/libs/api/controllers/userController'

const handler = nc<NextApiRequest, NextApiResponse>().use(cors())

handler.get(async (req, res) => {
  const { id } = req.query

  try {
    const user = await getUserById(id.toString())
    res.status(200).json(user)
  } catch (error) {
    res.status(400).send({ status: '400', error })
  }
})

export default handler

import type { NextApiRequest, NextApiResponse } from 'next'
import cors from 'cors'
import nc from 'next-connect'
import { getUsers } from '@/libs/api/controllers/userController'

const handler = nc<NextApiRequest, NextApiResponse>().use(cors())

handler.get(async (req, res) => {
  try {
    const users = await getUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(400).send({ status: '400', error })
  }
})

export default handler

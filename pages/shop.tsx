import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const Shop = () => {
  const { data: users, error } = useSWR('/api/users/')
  const { data: session, status } = useSession()
  const router = useRouter()

  if (!users) return <></>

  console.log(users)

  return <div></div>
}

export default Shop

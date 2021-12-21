import Layout from '@/components/Layout'
import { getUsers } from '@/libsapi/controllers/userController'
import { useSession, getSession } from 'next-auth/react'

import type { GetServerSideProps } from 'next'
import type { Session } from 'next-auth'

interface Users {
  users: {
    status: string
    data: {
      rank: string
      user_id: string
      cash: number
      bank: number
      total: number
    }
  }
}

export default function Home({ users }: Users) {
  const { data: session, status } = useSession()
  console.log(session)
  return <Layout pageTitle="Strona Główna"></Layout>
}

export const getServerSideProps: GetServerSideProps<{
  session: Session | null
}> = async (context) => {
  return {
    props: {
      session: await getSession(context),
      users: await getUsers(),
    },
  }
}

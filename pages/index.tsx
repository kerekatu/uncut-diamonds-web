import Layout from '@/components/Layout'
import Image from 'next/image'
import Link from 'next/link'
// import { getUsers } from '@/libsapi/controllers/userController'
// import { useSession, getSession } from 'next-auth/react'
// import type { GetServerSideProps } from 'next'
// import type { Session } from 'next-auth'

const TAGS = ['🇵🇱 Społeczność', '🕹️ Gry', '👋 Rozmowy', '🎉 Wydarzenia']

export default function Home() {
  return (
    <Layout showHeader={false} pageTitle="Strona Główna">
      <section className="flex flex-col w-full h-screen items-center justify-center gap-2">
        <Image
          src="/static/logo.svg"
          alt="Uncut Diamonds Logo"
          height={190}
          width={540}
          className="pointer-events-none"
        />
        <div className="w-[600px] text-center mb-8">
          <ul className="flex gap-4 items-center justify-center mb-6">
            {TAGS.map((tag, index) => (
              <li
                className="px-4 py-2 bg-zinc-900 rounded-xl text-xl font-semibold"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>

          <h3 className="text-xl">
            U nas poznasz masę unikalnych i zarazem otwartych ludzi na nowe
            znajomości. Aktywni za dnia, a nocą tym bardziej!
          </h3>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 via-indigo-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 animate-tilt transition duration-200"></div>
            <a
              href="https://discord.gg/HYsRmJVjSW"
              target="_blank"
              rel="noreferrer"
              className="relative block tracking-widest bg-gradient-to-tr from-cyan-500 via-indigo-500 to-pink-500 px-16 py-4 rounded-full text-white font-bold text-xl"
            >
              <span className="drop-shadow-md uppercase">Dołącz</span>
            </a>
          </div>
          <Link href="/shop">
            <a className="block border-4 border-gray-100 px-16 py-3 rounded-full text-gray-100 font-bold text-xl uppercase hover:bg-gray-100 hover:text-black shadow-md transition-all duration-200">
              Sklep
            </a>
          </Link>
        </div>
      </section>
    </Layout>
  )
}

// export const getServerSideProps: GetServerSideProps<{
//   session: Session | null
// }> = async (context) => {
//   return {
//     props: {
//       session: await getSession(context),
//       users: await getUsers(),
//     },
//   }
// }

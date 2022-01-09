import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import useSWR from 'swr'
import UserNav from '@/components/UserNav'

const Header = () => {
  const { data: session } = useSession()
  const { data: user } = useSWR(`/api/users/${session?.user.id}`)

  return (
    <header className="flex container mx-auto px-4 md:px-10">
      <nav className="min-w-full">
        <ul className="items-center flex gap-6 h-full">
          <li className="mr-auto self-center">
            <Link href="/">
              <a
                className="block leading-none transition-opacity hover:opacity-50"
                title="Powrót na stronę główną"
              >
                <img
                  src="/static/logo.svg"
                  alt="Uncut Diamonds Logo"
                  className="h-16"
                />
              </a>
            </Link>
          </li>
          {!session ? (
            <li>
              <a
                href="/api/auth/signin"
                className="bg-zinc-900 bg-opacity-20 py-2 px-6 flex items-center rounded-xl h-16 transition-all  hover:bg-opacity-100"
                onClick={(e) => {
                  e.preventDefault()
                  signIn('discord')
                }}
              >
                Zaloguj
              </a>
            </li>
          ) : (
            user && <UserNav user={user.data} session={session} />
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header

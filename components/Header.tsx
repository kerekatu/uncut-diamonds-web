import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import useSWR from 'swr'
import UserNav from '@/components/UserNav'
import Button from '@/components/ui/Button'
import { User } from 'types'

const Header = () => {
  const { data: session } = useSession()
  const { data: user } = useSWR<{ status: string; data: User }>(
    `/api/users/${session?.user.id}`
  )

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
                  className="h-16 hidden sm:block"
                />
                <img
                  src="/static/logo-compact.svg"
                  alt="Uncut Diamonds Logo"
                  className="h-16 block sm:hidden"
                />
              </a>
            </Link>
          </li>
          {!session ? (
            <li>
              <Button variant="secondary" onClick={() => signIn('discord')}>
                Zaloguj się
              </Button>
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

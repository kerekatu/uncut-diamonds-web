import { addSpaceEveryCharacter } from '@/libshelpers'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import useSWR from 'swr'

const Header = () => {
  const { data: session } = useSession()
  const { data: user } = useSWR(`/api/users/${session?.user.id}`)
  const [showNav, setShowNav] = useState(false)

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
                Zaloguj się
              </a>
            </li>
          ) : (
            user && (
              <>
                <li className="flex items-center gap-2 bg-zinc-900 py-2 px-6 rounded-xl h-16">
                  <div className="flex flex-col justify-center items-end leading-6">
                    <span>{session.user.name}</span>
                    <span className="flex items-center gap-1 font-bold">
                      {user.data.bank > 0
                        ? addSpaceEveryCharacter(user.data.bank)
                        : 0}
                      <Image
                        src="/static/diament.png"
                        alt="Uncut Diamonds Currency Symbol"
                        width={16}
                        height={16}
                        quality={100}
                      />
                    </span>
                  </div>
                  <Image
                    src={session.user.image}
                    alt="Profile Picture"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </li>
                <li className="md:block hidden">
                  <a
                    href="/api/auth/signout"
                    className="bg-zinc-900 bg-opacity-20 py-2 px-6 flex items-center rounded-xl h-16 transition-all  hover:bg-opacity-100"
                    onClick={(e) => {
                      e.preventDefault()
                      signOut()
                    }}
                  >
                    Wyloguj się
                  </a>
                </li>
              </>
            )
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header

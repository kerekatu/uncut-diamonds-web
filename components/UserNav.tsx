import { addSpaceEveryCharacter } from '@/libs/helpers'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useRef, useState } from 'react'

import type { Session } from 'next-auth'
import { IUser } from 'types/types'
import useOnClickOutside from '@/hooks/useOnClickOutside'

const UserNav = ({ user, session }: { user: IUser; session: Session }) => {
  const dropdownRef = useRef(null)
  const [showNav, setShowNav] = useState<boolean>(false)

  useOnClickOutside(dropdownRef, () => {
    setShowNav(false)
  })

  return (
    <>
      <li className="items-center gap-2 bg-zinc-900 py-2 px-6 rounded-xl h-16 hidden sm:flex">
        <div className="flex flex-col justify-center items-end leading-6">
          <span>{session.user.name}</span>
          <span className="flex items-center gap-1 font-bold">
            {user.data.bank > 0 ? addSpaceEveryCharacter(user.data.bank) : 0}
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
      <li className="hidden sm:block">
        <a
          href="/api/auth/signout"
          className="bg-zinc-900 bg-opacity-20 py-2 px-6 flex items-center rounded-xl h-16 transition-all hover:bg-opacity-100"
          onClick={(e) => {
            e.preventDefault()
            signOut()
          }}
        >
          Wyloguj się
        </a>
      </li>

      <li className="relative sm:hidden" ref={dropdownRef}>
        <button
          className="flex items-center gap-2 py-2 px-4 bg-zinc-900 rounded-xl h-16 "
          onClick={() => setShowNav(!showNav)}
        >
          <Image
            src={session.user.image}
            alt="Profile Picture"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="block">
            {showNav ? (
              <ChevronUpIcon className="h-6" />
            ) : (
              <ChevronDownIcon className="h-6" />
            )}
          </div>
        </button>

        {showNav && (
          <div className="absolute top-20 right-0 bg-zinc-900/80 rounded-xl z-10 w-max">
            <ul className="flex flex-col justify-center items-center gap-2 py-4 px-6">
              <li className="flex flex-col leading-6 items-center">
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
              </li>
              <li>
                <a
                  href="/api/auth/signout"
                  className="text-red-500 font-semibold"
                  onClick={(e) => {
                    e.preventDefault()
                    signOut()
                  }}
                >
                  Wyloguj się
                </a>
              </li>
            </ul>
          </div>
        )}
      </li>
    </>
  )
}

export default UserNav

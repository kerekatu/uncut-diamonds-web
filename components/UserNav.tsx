import { addSpaceEveryCharacter } from '@/libs/helpers'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useRef, useState } from 'react'

import type { Session } from 'next-auth'
import type { User } from 'types'
import useOnClickOutside from '@/hooks/useOnClickOutside'
import Button from '@/components/ui/Button'

const UserNav = ({ user, session }: { user: User; session: Session }) => {
  const dropdownRef = useRef<HTMLLIElement>(null)
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
            {user.bank > 0 ? addSpaceEveryCharacter(user.bank) : 0}
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
        <Button variant="secondary" onClick={() => signOut()}>
          Wyloguj się
        </Button>
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
          /* MOBILE VIEW */
          <div className="absolute top-20 right-0 bg-zinc-900/90 rounded-xl z-10 w-max">
            <ul className="flex flex-col justify-center items-center gap-2 py-4 px-6">
              <li className="flex flex-col leading-6 items-center">
                <span>{session.user.name}</span>
                <span className="flex items-center gap-1 font-bold">
                  {user.bank > 0 ? addSpaceEveryCharacter(user.bank) : 0}
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
                <Button
                  variant="secondary"
                  className="text-red-500 font-bold"
                  onClick={() => signOut()}
                >
                  Wyloguj się
                </Button>
              </li>
            </ul>
          </div>
        )}
      </li>
    </>
  )
}

export default UserNav

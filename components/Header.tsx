import { signIn, signOut, useSession } from 'next-auth/react'

const Header = () => {
  const { data: session, status } = useSession()

  return (
    <header>
      {!session ? (
        <a
          href="/api/auth/signin"
          onClick={(e) => {
            e.preventDefault()
            signIn('discord')
          }}
        >
          Zaloguj się
        </a>
      ) : (
        <div>
          <a
            href="/api/auth/signout"
            onClick={(e) => {
              e.preventDefault()
              signOut()
            }}
          >
            Wyloguj się
          </a>
          <div>
            {session.user.name}
            <img src={session.user.image} alt="Profile Picture" />
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

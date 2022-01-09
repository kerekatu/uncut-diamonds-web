import Layout from '@/components/Layout'
import { MagicButton, BUTTON_STYLES } from '@/components/ui/Button'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const TAGS = ['🇵🇱 Społeczność', '🕹️ Gry', '👋 Rozmowy', '🎉 Wydarzenia']

const Home: NextPage = () => {
  return (
    <Layout showHeader={false} customMeta={{ title: 'Strona Główna' }}>
      <section className="flex flex-col w-full items-center justify-center gap-2">
        <Image
          src="/static/logo.svg"
          alt="Uncut Diamonds Logo"
          height={190}
          width={540}
          className="pointer-events-none"
        />
        <div className="text-center mb-8">
          <ul className="flex-wrap flex gap-4 items-center justify-center mb-6">
            {TAGS.map((tag, index) => (
              <li
                className="px-4 py-2 bg-zinc-900 rounded-xl text-xl font-semibold"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>

          <h3 className="text-xl md:w-[600px]">
            U nas poznasz masę unikalnych i zarazem otwartych ludzi na nowe
            znajomości. Aktywni za dnia, a nocą tym bardziej!
          </h3>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6">
          <MagicButton />
          <Link href="/shop">
            <a className={BUTTON_STYLES.ctaSecondary}>Sklep</a>
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export default Home

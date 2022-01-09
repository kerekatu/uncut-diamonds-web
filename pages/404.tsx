import Layout from '@/components/Layout'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const NotFound: NextPage = () => {
  return (
    <Layout>
      <section className="flex flex-col justify-center items-center container gap-8 text-center">
        <Image
          src="https://cdn.discordapp.com/emojis/913174352189603851.webp?size=96&quality=lossless"
          alt="Dog Emote"
          height={150}
          width={150}
        />
        <h1 className="text-5xl font-bold">404 | Strona nie znaleziona</h1>

        <Link href="/">
          <a className="px-12 py-4 bg-zinc-900 rounded-xl font-bold text-xl transition-all hover:opacity-75">
            Wróć na stronę główną
          </a>
        </Link>
      </section>
    </Layout>
  )
}

export default NotFound

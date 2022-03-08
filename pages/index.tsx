import Layout from '@/components/Layout'
import { MagicButton, BUTTON_STYLES } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const TAGS = ['🇵🇱 Społeczność', '🕹️ Gry', '👋 Rozmowy', '🎉 Wydarzenia']
const COMMENTS = [
  { author: 'Patka', text: 'Super Miejsce', coordinates: { x: 15, y: 75 } },
  {
    author: 'Rosolino',
    text: 'Humoru nie brakuje!',
    coordinates: { x: 6, y: 45 },
  },
  {
    author: 'Matrannae',
    text: 'Minął rok i jeszcze nie wyszłam',
    coordinates: { x: 10, y: 15 },
  },
  {
    author: 'PolishDywan',
    text: 'Najlepszy jaki znam!',
    coordinates: { x: 75, y: 60 },
  },
  {
    author: 'Marianooos',
    text: 'Wspaniały serwer, jeszcze lepsza społeczność ',
    coordinates: { x: 65, y: 15 },
  },
]

const commentsVariants = {
  hidden: { opacity: 0, translateY: -20 },
  show: {
    opacity: 1,
    translateY: 0,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 1.5,
    },
  },
}

const Home: NextPage = () => {
  return (
    <Layout showHeader={false} customMeta={{ title: 'Strona Główna' }}>
      <section className="flex flex-col w-full items-center justify-center gap-2 relative overflow-hidden">
        <motion.div
          className="hidden xl:block pointer-events-none"
          variants={commentsVariants}
          initial="hidden"
          animate="show"
        >
          {COMMENTS.map((comment, index) => (
            <motion.div
              className={`absolute -z-10`}
              style={{
                left: comment.coordinates.x + '%',
                top: comment.coordinates.y + '%',
              }}
              variants={commentsVariants}
              key={index}
            >
              <div className="absolute inset-0 bg-gradient-to-tr blur from-zinc-800 to-zinc-700 rounded-full"></div>
              <div className="relative block px-8 py-3 rounded-xl leading-6">
                <h4 className="font-bold tracking-tight">{comment.author}</h4>
                <p className="text-base">{comment.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ translateY: -150, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Image
            src="/static/logo.svg"
            alt="Uncut Diamonds Logo"
            height={190}
            width={540}
            className="pointer-events-none animate-float"
          />
        </motion.div>

        <motion.div
          className="text-center mb-8"
          initial={{ translateY: 150, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
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
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center items-center gap-6"
          initial={{ translateY: 150, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <MagicButton />
          <Link href="/shop">
            <a className={BUTTON_STYLES.ctaSecondary}>Sklep</a>
          </Link>
        </motion.div>
      </section>
    </Layout>
  )
}

export default Home

import Header from '@/components/Header'
import Head from 'next/head'
import Footer from '@/components/Footer'
import { useRouter } from 'next/router'
import type { Meta } from 'types'

interface LayoutProps {
  children?: React.ReactNode
  showHeader?: boolean
  customMeta?: Partial<Meta>
}

const Layout = ({ children, showHeader = true, customMeta }: LayoutProps) => {
  const router = useRouter()
  const meta = {
    title: 'Strona',
    subtitle: 'Uncut Diamonds',
    description:
      'Dołącz do naszej społeczności "Uncut Diamonds" znajdującej się na discordzie. Łączymy przyjemną atmosferę z ciągłą zabawą. Gadamy, gramy i wspólnie bierzemy udział w wydarzeniach z nagrodami! U nas na pewno się odnajdziesz!',
    url: 'https://uncutdiamonds.top/',
    type: 'website',
    image: 'https://uncutdiamonds.top/static/banner.png',
    ...customMeta,
  }

  return (
    <>
      <Head>
        <title>
          {meta.title} - {meta.subtitle}
        </title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`${meta.url}${router.asPath}`} />
        <link rel="canonical" href={`${meta.url}${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Uncut Diamonds" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@uncutdiamonds" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div
        className={`min-h-screen ${
          showHeader
            ? 'grid grid-rows-layout gap-6'
            : 'grid grid-rows-layoutAlt gap-6'
        }`}
      >
        {showHeader && <Header />}
        <main className="flex container mx-auto px-4 md:px-10">{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout

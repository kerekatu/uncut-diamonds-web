import React from 'react'
import Header from '@/components/Header'
import Head from 'next/head'

interface LayoutProps {
  children?: React.ReactNode
  showHeader?: boolean
  pageTitle: string
}

const Layout = ({ children, showHeader = true, pageTitle }: LayoutProps) => {
  return (
    <div
      className={`min-h-screen ${
        showHeader ? 'grid grid-rows-layout gap-6' : ''
      }`}
    >
      <Head>
        <title>{pageTitle} - Uncut Diamonds</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {showHeader && <Header />}
      <main className="flex container mx-auto px-10">{children}</main>
    </div>
  )
}

export default Layout

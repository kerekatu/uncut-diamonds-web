import React from 'react'
import Header from '@/components/Header'
import Head from 'next/head'

interface LayoutProps {
  children?: React.ReactNode
  pageTitle: string
}

const Layout = ({ children, pageTitle }: LayoutProps) => {
  return (
    <div className="grid grid-rows-layout min-h-screen">
      <Head>
        <title>{pageTitle} - Uncut Diamonds</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <main className="flex container mx-auto p-10">{children}</main>
    </div>
  )
}

export default Layout

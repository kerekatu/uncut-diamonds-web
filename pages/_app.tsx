import useLoader from '@/hooks/useLoader'
import '@/styles/global.css'
import '../styles/nprogress.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

function App({ Component, pageProps }: AppProps) {
  const loading = useLoader()

  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        {loading ? <></> : <Component {...pageProps} />}
      </SWRConfig>
    </SessionProvider>
  )
}

export default App

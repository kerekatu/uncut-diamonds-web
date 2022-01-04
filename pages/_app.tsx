import '@/styles/global.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'
import useLoader from '@/hooks/useLoader'

function MyApp({ Component, pageProps }: AppProps) {
  const loading = useLoader()

  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        {loading ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img
              src="/static/diament-loader.svg"
              alt="Loader Icon"
              className="animate-zoom h-28"
            />
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </SWRConfig>
    </SessionProvider>
  )
}

export default MyApp

import useLoader from '@/hooks/useLoader'
import '@/styles/global.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps }: AppProps) {
  const loading = useLoader()

  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json())
        }}
      >
        {loading ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg
              width="197"
              height="182"
              viewBox="0 0 197 182"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-zoom h-28"
            >
              <path
                d="M121.78 153.506L60.6967 69.025L112.629 49.6578L121.78 153.506Z"
                fill="white"
              />
              <path
                d="M76.7044 32.6394L110.532 44.0375L58.6006 63.4047L76.7044 32.6394Z"
                fill="white"
              />
              <path
                d="M68.5126 33.562L31.2437 47.4609L9.43742 81.2079L49.5848 66.2355L68.5126 33.562Z"
                fill="white"
              />
              <path
                d="M112.429 148.459L52.4526 71.8359L12.5581 86.7139L112.429 148.459Z"
                fill="white"
                fillOpacity="0.49"
              />
              <path
                d="M83.4978 27.9714L120.767 14.0725L159.345 25.2998L119.198 40.2722L83.4978 27.9714Z"
                fill="white"
              />
              <path
                d="M125.541 143.567L120.698 46.3827L160.592 31.5047L125.541 143.567Z"
                fill="white"
                fillOpacity="0.49"
              />
            </svg>
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </SWRConfig>
    </SessionProvider>
  )
}

export default MyApp

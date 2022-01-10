import { useRouter } from 'next/router'
import nProgress from 'nprogress'
import { useEffect, useState } from 'react'

const useLoader = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const handleStart = () => {
      nProgress.start()
      setLoading(true)
    }
    const handleComplete = () => {
      nProgress.done()
      setLoading(false)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  return loading
}

export default useLoader

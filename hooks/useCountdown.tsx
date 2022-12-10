import { useEffect, useState } from 'react'

const calculateTimeLeft = (date: Date) => {
  const currDate = new Date()

  const difference = +new Date(date) - +currDate

  let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  return timeLeft
}

const useCountdown = (date: Date) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date))

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(date))
    }, 1000)
  }, [date])

  return timeLeft
}

export default useCountdown

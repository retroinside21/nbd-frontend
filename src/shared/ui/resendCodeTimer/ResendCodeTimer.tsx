'use client'

import {
  useEffect, useState,
} from 'react'
import {
  Typography,
} from '@mui/material'

interface ResendCodeTimerProps {
  initialSeconds?: number
  onRepeatCode: () => void
}

const ResendCodeTimer = ({
  initialSeconds = 300,
  onRepeatCode,
}: ResendCodeTimerProps) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)

  useEffect(() => {
    setSecondsLeft(initialSeconds)

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [initialSeconds])

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  return secondsLeft > 0
    ? (
      <Typography variant="body2" color="text.secondary" mb={3}>

        Получить новый код можно через
        {' '}
        {' '}
        {formatTime(secondsLeft)}

      </Typography>
    ) : (
      <Typography
        sx={{
          color: 'var(--color-blue)',
          textTransform: 'uppercase',
          fontWeight: 400,
          mb: 7,
          cursor: 'pointer',
        }}
        onClick={onRepeatCode}
      >
        повторно выслать код
      </Typography>
    )
}

export default ResendCodeTimer

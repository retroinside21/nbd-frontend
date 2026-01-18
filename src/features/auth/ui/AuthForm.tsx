/* eslint-disable id-length */

'use client'

import {
  Box, Button, Stack, TextField, Typography,
} from '@mui/material'
import React, {
  ChangeEvent,
  Dispatch, SetStateAction,
  useState,
} from 'react'
import TelegramIcon from '@mui/icons-material/Telegram'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
// import api from '@/shared/api/api'
import api from '@/shared/api/api'
import {
  useRouter,
} from 'next/navigation'
import {
  TAuthStepType,
} from '../models/types'
import {
  useAuth,
} from '../providers/AuthProvider'

interface IProps {
  onClickStep: Dispatch<SetStateAction<TAuthStepType>>
  onSetEmail?: Dispatch<SetStateAction<string>>
}
const AuthForm = ({
  onClickStep,
  onSetEmail,
}: IProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [emailInput, setEmailInput] = useState<string>('')
  const [emailError, setEmailError] = useState(false)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  // const botId = '8136879376' // ← твой bot_id
  // const origin = encodeURIComponent('http://localhost:3000/') // ← твой домен
  // const returnTo = encodeURIComponent('http://localhost:3000/admin/subscribe')

  //  'https://oauth.telegram.org/auth?bot_id=8273816146
  //   &origin=https%3A%2F%2Fcdn.proxy-liberty.com
  //   &return_to=https%3A%2F%2Fcdn.proxy-liberty.com%2Fwebui%2Fauth%2Ftelegram%2Fcallback
  //   &embed=0&request_access=write'

  // {
  //   tg_id: 599471865,
  //   username: 'aristov_andrey',
  //   first_name: 'Andrew',
  //   last_name: 'Aristocracy',
  // }

  // const loginUrl = `https://oauth.telegram.org/auth?bot_id=${botId}
  //  &origin=${encodeURIComponent('http://localhost:3000')}
  //  &return_to=${encodeURIComponent('http://localhost:3000/admin/subscribe')}`
  // const loginUrl = `https://oauth.telegram.org/auth?bot_id=${botId}
  //  &origin=${encodeURIComponent('https://testbot.nobaddays.site')}
  //  &return_to=${encodeURIComponent('https://testbot.nobaddays.site/api/auth/telegram')}`
  // const handleGetEmail = () => {
  //   onClickStep(3)
  // }
  // const loginUrl = 'https://oauth.telegram.org/auth?bot_id=8136879376&origin=https://testbot.nobaddays.site&embed=1'

  // const fetchPosts = async () => {
  //   const response = await api.get('/ping', {})
  //   console.log(response)
  //   return response.data
  // }

  const {
    login,
    // user,
  } = useAuth()

  const handleEmail = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmailInput(event.target.value)
    setEmailError(!emailRegex.test(event.target.value))
  }

  const sendCode = async () => {
    if (!emailInput.trim()) {
      setEmailError(true)
      return
    }
    setLoading(true)
    try {
      await api.post('/auth/email/send', {
        email: emailInput,
      })
      setLoading(false)
      if (onSetEmail) {
        onSetEmail(emailInput)
      }

      onClickStep(3)
    } catch (err: any) {
      if (onSetEmail) {
        onSetEmail('')
      }
      throw new Error(`Error ${err.message}`)
    } finally {
      setLoading(false)
    }

    setLoading(false)
    onClickStep(3)
  }

  // const verifyCode = async () => {
  //   const res = await api.post('/auth/email/verify', {
  //     email: api,
  //     code: '123456',
  //   })
  //   localStorage.setItem('token', res.data.token)
  //   localStorage.setItem('user', JSON.stringify(res.data.user))
  //   alert('Успешный вход!')
  //   window.location.reload()
  // }
  // const handleTelegramLogin = async () => {
  //   // Проверка, что запущено в Telegram
  //   if (!window.Telegram?.WebApp) {
  //     alert('Открой это в Telegram!')
  //     return
  //   }

  //   // Включаем WebApp
  //   window.Telegram.WebApp.ready()
  //   window.Telegram.WebApp.expand()

  //   setLoading(true)

  //   try {
  //     // Берём все данные от Telegram
  //     const initData = window.Telegram.WebApp.initDataUnsafe

  //     // Отправляем на твой бэкенд
  //     const response = await api.post('/auth/telegram', initData, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })

  //     if (response.data.success) {
  //       // Сохраняем токен
  //       localStorage.setItem('token', response.data.token)
  //       localStorage.setItem('user', JSON.stringify(response.data.user))

  //       alert(`Привет, ${response.data.user.first_name || 'друг'}! Ты в шопе!`)

  //       // Обнови состояние или редиректни куда нужно
  //       window.location.reload() // или setUser(response.data.user)
  //     } else {
  //       alert(`Ошибка: ${response.data.error}`)
  //     }
  //   } catch (error: any) {
  //     console.error('Telegram login error:', error)
  //     alert(`Ошибка авторизации: ${error.response?.data?.error || error.message}`)
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  // useEffect(() => {
  //   fetchPosts()
  // }, [])

  const handleAuthTelegram = async () => {
    try {
      const res = await api.post('/auth/telegram', {
        tg_id: 599471865,
        username: 'aristov_andrey',
        first_name: 'Andrew',
        last_name: 'Aristocracy',
      })

      const {
        data,
      } = res

      if (data.success) {
        login(data.user)
        router.push('/admin/subscribe')
      } else {
        console.error('Auth failed:', data)
      }
    } catch (err) {
      console.error('Request error:', err)
    }
  }
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 556,
        mx: 'auto',
        textAlign: 'center',
        p: 4,
      }}
    >
      <Typography variant="h5" fontWeight={400} mb={1}>
        Добро пожаловать!
      </Typography>

      <Typography
        variant="body2"
        color="var(--color-secondary)"
        mb={3}
      >
        Для входа используйте email или telegram.
      </Typography>

      <form
    //   onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Stack spacing={2}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={emailInput}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
            }}
            error={emailError}
            helperText={emailError ? 'Введите корректный email' : ''}
            onChange={handleEmail}
          />

          <Button
            loading={loading}
            onClick={sendCode}
            variant="contained"
            fullWidth
            sx={{
              bgcolor: 'var(--color-pink)',
              color: 'white',
              borderRadius: '12px',
              py: 1.5,
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'var(--color-pink-hover)',
              },
            }}
          >
            ПОЛУЧИТЬ КОД
          </Button>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<TelegramIcon />}
            onClick={() => {
              handleAuthTelegram()
              // window.location.href = loginUrl
            }}
            sx={{
              color: 'var(--color-blue)',
              borderColor: 'var(--color-blue)',
              fontWeight: 500,
              borderRadius: '12px',
              py: 1,
              px: 3,
              '&:hover': {
                borderColor: 'var(--color-blue-hover)',
                bgcolor: 'rgba(0, 123, 255, 0.04)',
              },
            }}
          >
            ВОЙТИ ЧЕРЕЗ TELEGRAM
          </Button>
        </Stack>
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={() => onClickStep(1)}
          sx={{
            color: 'var(--color-blue)',
            textTransform: 'none',
            fontWeight: 600,
            mt: 7,
          }}
        >
          НА ГЛАВНУЮ
        </Button>

      </form>
    </Box>
  )
}

export default AuthForm

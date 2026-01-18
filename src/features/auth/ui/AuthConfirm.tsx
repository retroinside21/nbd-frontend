/* eslint-disable id-length */

'use client'

import React, {
  Dispatch,
  SetStateAction,
  useRef, useState,
} from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import api from '@/shared/api/api'
import {
  useRouter,
} from 'next/navigation'
import ResendCodeTimer from '@/shared/ui/resendCodeTimer/ResendCodeTimer'
import {
  useSnackbar,
} from '@/features/notify/model/strores/useSnackbar'
import {
  useAuth,
} from '../providers/AuthProvider'
import {
  TAuthStepType,
} from '../models/types'

const CODE_LENGTH = 6

interface IProps {
  emailLogin?: string
  onClickStep: Dispatch<SetStateAction<TAuthStepType>>
}
const AuthConfirm = ({
  emailLogin,
  onClickStep,
}: IProps) => {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''))
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()
  const {
    login,
    // user,
  } = useAuth()
  const {
    show,
  } = useSnackbar()
  // при изменении символа
  const handleSubmit = async (newCode:string[]) => {
    const fullCode = newCode.join('')
    try {
      const res = await api.post('/auth/email/verify', {
        email: emailLogin,
        code: fullCode,
      })

      const {
        data,
      } = res

      if (data.success) {
        login(data.user)
        router.push('/admin/subscribe')
      } else {
        console.log('✅ Код подтверждения:', fullCode)
        console.error('Auth failed:', data)
      }
    } catch (err) {
      console.error('Request error:', err)
    }
  }
  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]*$/.test(value)) return // только цифры
    const newCode = [...code]
    newCode[index] = value.slice(-1) // берем только последний символ
    setCode(newCode)

    // переход к следующему полю
    if (value && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus()
    }

    // Если заполнили ВСЕ поля → сразу отправляем
    if (newCode.every((char) => char !== '') && newCode.length === CODE_LENGTH) {
    // Даём небольшую задержку, чтобы последний символ успел отобразиться
      handleSubmit(newCode)
    }
  }

  // обработка Backspace
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').trim()
    if (!/^[0-9]+$/.test(pasted)) return
    const digits = pasted.slice(0, CODE_LENGTH).split('')
    const newCode = [...code]
    digits.forEach((d, i) => {
      newCode[i] = d
      if (inputsRef.current[i]) {
        inputsRef.current[i]!.value = d
      }
    })
    setCode(newCode)
    inputsRef.current[Math.min(digits.length, CODE_LENGTH - 1)]?.focus()

    if (newCode.every((char) => char !== '') && newCode.length === CODE_LENGTH) {
    // Даём небольшую задержку, чтобы последний символ успел отобразиться
      handleSubmit(newCode)
    }
  }

  const sendCode = async () => {
    try {
      const response: any = await api.post('/auth/email/send', {
        email: emailLogin,
      })
      console.log(response)
      show(response?.data?.message)
    } catch (err: any) {
      show('Что-то пошло не так', 'error')
      throw new Error(`Error ${err.message}`)
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 480,
        mx: 'auto',
        textAlign: 'center',
        p: 4,
      }}
    >
      <Typography variant="h5" fontWeight={600} mb={1}>
        Код подтверждения
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        Пожалуйста, введите код подтверждения, отправленный на
        {' '}
        <Typography
          component="span"
          color="var(--color-pink)"
        >
          {emailLogin}
        </Typography>
        . Не забудьте проверить папку Спам.
      </Typography>

      <Stack direction="row" justifyContent="center" spacing={1.5} mb={3}>
        {Array.from({
          length: CODE_LENGTH,
        }).map((_, index) => (
          <TextField
            key={index}
            inputRef={(el) => {
              inputsRef.current[index] = el
            }}
            value={code[index]}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            placeholder="#"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
            }}
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: 'center',
                fontSize: '1.5rem',
                width: '3rem',
                height: '3rem',
                borderRadius: '12px',
              },
            }}
          />
        ))}
      </Stack>

      <ResendCodeTimer initialSeconds={300} onRepeatCode={sendCode} />

      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        sx={{
          color: 'var(--color-blue)',
          textTransform: 'none',
          fontWeight: 500,
        }}
        onClick={() => onClickStep(2)}
      >
        НАЗАД
      </Button>
    </Box>
  )
}

export default AuthConfirm

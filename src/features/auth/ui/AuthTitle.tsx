import {
  Box,
  Button,
  Typography,
} from '@mui/material'
import React, {
  Dispatch, SetStateAction,
} from 'react'
import {
  TAuthStepType,
} from '../models/types'

interface IProps {
  onClickStep: Dispatch<SetStateAction<TAuthStepType>>
}
const AuthTitle = ({
  onClickStep,
}: IProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // центрирует по вертикали
        alignItems: 'center', // центрирует по горизонтали
        textAlign: 'center',
        px: {
          xs: 3,
          md: 4,
        },
        pt: {
          xs: 20,
          md: 0,
        }, // отступ сверху только на мобиле
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Unbounded',
          fontSize: {
            xs: '2rem',
            md: '4.375rem',
          },
          mb: 2,

          lineHeight: 0.9,
        }}
        variant="h2"
      >
        Цифровая безопасность
        <br />
        начинается здесь
      </Typography>

      <Typography
        sx={{
          fontSize: '1.25rem',
          color: 'var(--color-gray)',
          mb: 8,
        }}
        variant="body2"
      >
        Максимальная защита и скорость — без сложных настроек и рекламы
      </Typography>

      <Button
        variant="contained"
        onClick={() => onClickStep(2)}
        sx={{
          backgroundColor: 'var(--color-pink)', // розовый как на скрине
          color: '#fff',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          borderRadius: '.5rem',
          px: 4,
          py: 1.5,
          mb: 10,
          '&:hover': {
            backgroundColor: '#e6007e', // чуть темнее при hover
          },
        }}
      >
        Получить защиту
      </Button>
    </Box>
  )
}

export default AuthTitle

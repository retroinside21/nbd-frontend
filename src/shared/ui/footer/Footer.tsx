'use client'

import {
  Box, Link, Stack, Typography,
} from '@mui/material'

import {
  usePathname,
} from 'next/navigation'

const Footer = () => {
  const pathname = usePathname()

  const hideFooter = pathname.startsWith('/admin')

  return hideFooter ? null : (
    <Box
      component="footer"
      sx={{
        py: 2.5,
        px: {
          xs: 2,
          sm: 4,
        },
      }}
    >
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{
          xs: 'flex-start',
          sm: 'center',
        }}
      >
        {/* Левый блок с авторскими правами */}
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Typography variant="body2">
            © 2025 NBDVPN. Все права защищены.
          </Typography>

          <Link
            href="https://telegra.ph/Polzovatelskoe-soglashenie-dlya-VPN-servisa-cherez-Telegram-bot-VPNGuard-Bot-03-11"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              typography: 'body2',
              color: 'text.primary',
              transition: 'color 0.2s',
              '&:hover': {
                color: 'var(--color-blue)',
              },
            }}
          >
            Пользовательское соглашение
          </Link>

          <Link
            href="https://telegra.ph/Politika-konfidencialnosti-dlya-servisa-VPNGuard-03-11"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              typography: 'body2',
              color: 'text.primary',
              transition: 'color 0.2s',
              '&:hover': {
                color: 'var(--color-blue)',
              },
            }}
          >
            Политика конфиденциальности
          </Link>
        </Stack>

        {/* Правый блок с ссылками */}
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Link
            href="https://t.me/Not_Bad_Supp"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              typography: 'body2',
              color: 'text.primary',
              transition: 'color 0.2s',
              '&:hover': {
                color: 'var(--color-blue)',
              },
            }}
          >
            Техническая поддержка
          </Link>

          <Link
            href="https://t.me/NB_Days"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              typography: 'body2',
              color: 'text.primary',
              transition: 'color 0.2s',
              '&:hover': {
                color: 'var(--color-blue)',
              },
            }}
          >
            Телеграм канал
          </Link>

          <Link
            href="https://t.me/VPN_GBOT"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              typography: 'body2',
              color: 'text.primary',
              transition: 'color 0.2s',
              '&:hover': {
                color: 'var(--color-blue)',
              },
            }}
          >
            Телеграм бот
          </Link>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Footer

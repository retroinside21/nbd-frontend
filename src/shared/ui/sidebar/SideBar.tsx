'use client'

/* eslint-disable id-length */

import {
  Box, Grid, List, ListItemIcon, Divider,
  Typography,
  ListItemButton,
  Link,
} from '@mui/material'
import React from 'react'

import {
  usePathname,
  useRouter,
} from 'next/navigation'

import {
  FAQIcon,
  // KeyIcon,
  // PlusIcon,
  WalletIcon,
  Home,
} from '@/shared/assets/iconsReact'

const SideBar = () => {
  const pathname = usePathname()

  const menuItems = [
    // {
    //   text: 'Купить подписку',
    //   icon: <PlusIcon />,
    //   active: true,
    //   href: '/admin/buys',
    // },
    {
      text: 'Главная',
      icon: <Home />,
      active: true,
      href: '/admin/subscribe',
    },
    {
      text: 'История оплат',
      icon: <WalletIcon />,
      href: '/admin/history',
    },
    // {
    //   text: 'Рефералы',
    //   icon: <PremiumUserIcon />,
    //   href: '/admin/referrals',
    // },
    {
      text: 'FAQ',
      icon: <FAQIcon />,
      href: '/admin/faq',
    },
    // {
    //   text: 'Подарки',
    //   icon: <GiftIcon />,
    //   href: '/admin/gifts',
    // },
  ]

  const router = useRouter()
  const handleClick = (route: string) => {
    router.push(route)
  }
  return (
    <Grid sx={{
      flex: '0 0 218px',
      maxWidth: '218px',
      borderRight: '1px solid rgba(0, 0, 0, 0.12)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 'calc(100vh - 10vh)',
    }}
    >
      <Box
        sx={{
          py: 1,
          height: 'fit-content',
        }}
      >
        <List component="nav">
          {menuItems.map(({
            text, href, icon,
          }) => (
            <ListItemButton
              key={text}
              selected={pathname === href}
              onClick={() => handleClick(href)}
              sx={{
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                width: 210,
                gap: 2,
                mb: 1,
                '&.Mui-selected': {
                  bgcolor: 'var(--color-bg)',
                  color: 'var(--color-blue)',
                  '& .MuiListItemIcon-root': {
                    color: 'var(--color-blue)',
                  },
                },
              }}
            >
              <ListItemIcon sx={{
                minWidth: 24,
              }}
              >
                {icon}
              </ListItemIcon>
              <Typography variant="body1">
                {text}
              </Typography>

            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Footer Links */}
      <Box sx={{
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
      }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          py: 3,
        }}
        >
          <Link
            href="https://t.me/Not_Bad_Supp"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              typography: 'caption',
              color: 'text.secondary',
              transition: 'color 0.2s',
              '&:hover': {
                color: 'var(--color-blue)',
              },
            }}
          >
            Техническая поддержка
          </Link>
          <Link
            href="https://t.me/VPN_GBOT"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              typography: 'caption',
              color: 'text.secondary',
              transition: 'color 0.2s',
              '&:hover': {
                color: 'var(--color-blue)',
              },
            }}
          >
            Телеграм канал
          </Link>
          <Link
            href="https://t.me/NB_Days"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              typography: 'caption',
              color: 'text.secondary',
              transition: 'color 0.2s',
              '&:hover': {
                color: 'var(--color-blue)',
              },
            }}
          >
            Телеграм бот
          </Link>
        </Box>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            py: 3,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Все права защищены.
          </Typography>
          <Link
            href="https://telegra.ph/Polzovatelskoe-soglashenie-dlya-VPN-servisa-cherez-Telegram-bot-VPNGuard-Bot-03-11"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              typography: 'caption',
              color: 'text.secondary',
              transition: 'color 0.2s',
              '&:hover': {
                color: 'var(--color-blue)',
              },
            }}
          >
            Пользовательское соглашение.
          </Link>
          <Link
            href="https://telegra.ph/Politika-konfidencialnosti-dlya-servisa-VPNGuard-03-11"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              typography: 'caption',
              color: 'text.secondary',
              transition: 'color 0.2s',
              '&:hover': {
                color: 'var(--color-blue)',
              },
            }}
          >
            Политика конфиденциальности
          </Link>
        </Box>
      </Box>
    </Grid>

  )
}

export default SideBar

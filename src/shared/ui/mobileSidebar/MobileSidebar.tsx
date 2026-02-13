/* eslint-disable id-length */
// components/MobileSidebar.tsx

'use client'

import {
  usePathname, useRouter,
} from 'next/navigation'

import {
  Box,
  Divider,
  Drawer,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import {
  FAQIcon,
  // KeyIcon,
  // PlusIcon,
  WalletIcon,
  Home,
} from '@/shared/assets/iconsReact'
import {
  useAuth,
} from '@/features/auth/providers/AuthProvider'

const DRAWER_WIDTH = 240 // можешь оставить 218, если хочешь точно как было

interface MobileSidebarProps {
    isMobileOpen: boolean;
    closeMobileSidebar: () => void;
}
const MobileSidebar = ({
  isMobileOpen,
  closeMobileSidebar,
}: MobileSidebarProps) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000)) // твой брейкпоинт
  const {
    user,
  } = useAuth()

  const pathname = usePathname()
  const router = useRouter()

  const menuItems = [
    {
      text: 'Главная',
      icon: <Home />,
      href: '/admin/subscribe',
    },
    {
      text: 'История оплат',
      icon: <WalletIcon />,
      href: '/admin/history',
    },
    {
      text: 'FAQ',
      icon: <FAQIcon />,
      href: '/admin/faq',
    },
    // добавь остальные пункты по необходимости
  ]

  // Если десктоп — ничего не показываем (бургер и drawer живут только на мобильном)
  if (isDesktop) return null

  return (
    <>
      {/* Выезжающий Drawer слева */}
      <Drawer
        anchor="left"
        open={isMobileOpen}
        onClose={closeMobileSidebar}
        ModalProps={{
          keepMounted: true, // лучше производительность на мобильных
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* Верхняя часть с меню */}
          <Box sx={{
            flexGrow: 1,
            pt: 8,
            px: 2,
          }}
          >

            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mb: 1, // хороший отступ до меню
                lineHeight: 1.6,
              }}
            >
              Здравствуйте,
              {' '}
              <Box
                component="span"
                sx={{
                  color: 'var(--color-blue)',
                  fontWeight: 600, // чуть жирнее → выглядит солиднее
                }}
              >
                {user.tg_id || user.email}
              </Box>
            </Typography>

            <List component="nav">
              {menuItems.map(({
                text, href, icon,
              }) => {
                const isActive = pathname === href

                return (
                  <ListItemButton
                    key={text}
                    selected={isActive}
                    onClick={() => {
                      router.push(href)
                      closeMobileSidebar()
                    }}
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      gap: 2,
                      px: 0,
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
                    <Typography variant="body1">{text}</Typography>
                  </ListItemButton>
                )
              })}
            </List>
          </Box>

          {/* Нижняя часть — ссылки и копирайт */}
          <Box sx={{
            borderTop: '1px solid rgba(0,0,0,0.12)',
          }}
          >
            <Box sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
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

            <Box sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
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
                Пользовательское соглашение
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
        </Box>
      </Drawer>
    </>
  )
}

export default MobileSidebar

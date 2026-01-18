import Image from 'next/image'
import bg from '@/shared/assets/bg/bgLanding.png'
import {
  Box,
} from '@mui/material'
import Auth from '@/features/auth/ui/Auth'
import MyLogo from '@/shared/assets/icons/logoLanding.svg'
import GlobalSnackbar from '@/features/notify/ui/GlobalSnackbar'

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: '90vh',
        position: 'relative',
        bgcolor: 'var(--color-bgGray)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: {
            xs: '70vh',
            md: '90vh',
          },
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        <Image
          src={bg}
          alt="Герой"
          fill
          priority
          unoptimized
          style={{
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />
      </Box>

      {/* Логотип в левом верхнем углу */}
      <Box
        sx={{
          position: 'absolute',
          top: {
            xs: 24,
            md: 40,
          },
          left: {
            xs: 24,
            md: 48,
          },
          zIndex: 10,
        }}
      >
        <Image
          src={MyLogo}
          alt="No Bad Days VPN"
          priority
        />
        <Box sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
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
        />
      </Box>

      {/* Основной контент — поверх фона */}
      <Box sx={{
        position: 'absolute',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
      >
        <Auth />
      </Box>
      <GlobalSnackbar />
    </Box>
  )
}

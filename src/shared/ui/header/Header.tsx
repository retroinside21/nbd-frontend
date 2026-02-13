'use client'

import {
  Box,
  Divider,
  IconButton,
  useMediaQuery,
} from '@mui/material'
import React from 'react'
import logo from '@/shared/assets/icons/logobig.svg'
import Image from 'next/image'
import {
  MenuOutlined,
} from '@mui/icons-material'
import HeaderNav from './HeaderNav'
import MobileSidebar from '../mobileSidebar/MobileSidebar'

const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false)
  const isSmall = useMediaQuery('(max-width:460px)')
  const handleMobileOpen = () => {
    setIsMobileOpen(true)
  }

  const handleMobileClose = () => {
    setIsMobileOpen(false)
  }
  return (
    <>
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'space-between',
            px: 8,
            py: 4,
            '@media (max-width: 1000px)': {
              px: 2,
              py: 2,
            },
            '@media (max-width: 420px)': {
              px: 1,
            },
          }}
        >

          <Box sx={{
            display: 'flex',
            alignItems: 'center',
          }}
          >
            <IconButton
              onClick={handleMobileOpen}
              sx={{
                display: 'none',
                '@media (max-width: 1000px)': {
                  display: 'flex',
                  mr: 2,
                },
              }}
            >
              {/* Здесь может быть кнопка для открытия бокового меню на мобильных устройствах */}
              <MenuOutlined />
            </IconButton>

            <Image
              src={logo}
              alt="NBDVPN logo"
              priority
              style={{
                height: 'auto',
                width: 'auto',
                maxHeight: isSmall ? 32 : 48,
                maxWidth: isSmall ? 140 : 180,
              }}
            />
          </Box>
          <HeaderNav />
        </Box>
        <Divider />
      </Box>
      <MobileSidebar isMobileOpen={isMobileOpen} closeMobileSidebar={handleMobileClose} />
    </>
  )
}

export default Header

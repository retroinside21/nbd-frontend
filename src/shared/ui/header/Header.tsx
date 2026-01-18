import {
  Box,
  Divider,
} from '@mui/material'
import React from 'react'
import logo from '@/shared/assets/icons/logobig.svg'
import Image from 'next/image'
import HeaderNav from './HeaderNav'

const Header = () => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'space-between',
          px: 8,
          py: 4,
        }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
        }}
        >
          <Image
            src={logo}
            alt="NBDVPN logo"
            priority
            style={{
              height: 'auto',
              width: 'auto',
            }}
          />
        </Box>
        <HeaderNav />
      </Box>
      <Divider />
    </Box>
  )
}

export default Header

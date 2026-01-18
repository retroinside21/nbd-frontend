/* eslint-disable id-length */

'use client'

import {
  useAuth,
} from '@/features/auth/providers/AuthProvider'
import {
  useSnackbar,
} from '@/features/notify/model/strores/useSnackbar'
import {
  ContentCopy,
  Logout,
  Public,
} from '@mui/icons-material'
import {
  Box,
  Divider,
  IconButton,
  Typography,
} from '@mui/material'
import React from 'react'

const HeaderNav = () => {
  const {
    user,
    logout,
  } = useAuth()

  const {
    show,
  } = useSnackbar()

  const handleCopyKey = () => {
    navigator.clipboard.writeText(user.tg_id || '')
    show('Успешно скопировано')
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={1}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="body2">
          Здравствуйте,
          {' '}
          <span style={{
            color: 'var(--color-blue)',
          }}
          >
            {user.tg_id || user.email}
          </span>

        </Typography>

        <IconButton
          sx={{
            color: 'var(--color-blue)',
            p: 0.7,
          }}
          onClick={handleCopyKey}
        >
          <ContentCopy />
        </IconButton>
      </Box>

      <Divider orientation="vertical" />

      <Box>

        <IconButton sx={{
          color: 'var(--color-blue)',
          p: 0.7,
        }}
        >
          <Public />
        </IconButton>
        {/* <IconButton sx={{
          color: 'var(--color-blue)',
          p: 0.7,
        }}
        >
          <NotificationsNone />
        </IconButton> */}
        <IconButton
          sx={{
            color: 'var(--color-blue)',
            p: 0.7,
          }}
          onClick={logout}
        >
          <Logout />
        </IconButton>
      </Box>

    </Box>
  )
}

export default HeaderNav

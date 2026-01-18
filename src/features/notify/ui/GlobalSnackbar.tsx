// components/GlobalSnackbar.tsx

'use client'

import {
  useEffect,
  memo,
} from 'react'
import {
  Snackbar, Alert, Slide,
} from '@mui/material'
import {
  CheckCircleOutline,
} from '@mui/icons-material'
import {
  useSnackbar,
} from '../model/strores/useSnackbar'

const GlobalSnackbar = () => {
  const {
    open, message, type, hide,
  } = useSnackbar()

  useEffect(() => {
    if (!open) {
      return undefined
    }

    const timer = setTimeout(hide, 4000)

    return () => {
      clearTimeout(timer)
    }
  }, [open, hide])

  console.log(type)
  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      TransitionComponent={Slide}
      autoHideDuration={null} // отключили, потому что сами управляем
      onClose={hide}
      sx={{
        mb: 3,
      }}
    >
      <Alert
        icon={(
          <CheckCircleOutline sx={{
            color: '#fff',
          }}
          />
)}
        onClose={hide}
        severity={type}
        sx={{
          backgroundColor: 'var(--color-green)',
          color: '#fff',
          fontWeight: 600,
          borderRadius: '50px',
          padding: '8px 24px',
          boxShadow: '0 4px 12px rgba(0, 200, 83, 0.3)',
          '& .MuiAlert-icon': {
            color: '#fff',
            opacity: 1,
          },
          '& .MuiAlert-message': {
            padding: '8px 0',
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default memo(GlobalSnackbar)

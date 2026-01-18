import React, {
  ReactNode,
} from 'react'

import {
  Box, Typography,
} from '@mui/material'

interface IProps {
    children: ReactNode
    title: string
}
const CardSubscribeContainer = ({
  children,
  title,
}: IProps) => {
  return (
    <Box sx={{
      mb: 2,
    }}
    >
      <Typography sx={{
        fontWeight: 500,
        size: '0.875rem',
        mb: 1.2,
      }}
      >
        {title}
      </Typography>
      {children}
    </Box>

  )
}

export default CardSubscribeContainer

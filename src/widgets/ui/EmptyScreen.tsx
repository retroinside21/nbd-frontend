import {
  Box, Button, Typography, SxProps,
  Theme,
} from '@mui/material'
import React, {
  ReactNode,
} from 'react'

interface IProps {
  handleClick: () => void
  text: string,
  textButton: string,
  startIcon: ReactNode
  classNameContainer?: SxProps<Theme>
}
const EmptyScreen = ({
  handleClick,
  text,
  textButton,
  startIcon,
  classNameContainer,
}: IProps) => {
  return (
    <Box sx={{
      pt: 8,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      ...classNameContainer,
    }}
    >
      <Typography
        maxWidth="300px"
        textAlign="center"
        mb={11}
        variant="body1"
        color="text.secondary"
      >
        {text}
      </Typography>
      <Button
        variant="contained"
        onClick={handleClick}
        startIcon={startIcon}
        sx={{
          bgcolor: 'var(--color-pink)',
          color: 'white',
          px: 3,
          py: 1,
          borderRadius: 2,
          fontWeight: 600,
          '&:hover': {
            bgcolor: 'var(--color-pink-hover)',
          },
        }}
      >
        {textButton}
      </Button>
    </Box>

  )
}

export default EmptyScreen

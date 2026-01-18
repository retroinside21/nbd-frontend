import {
  InfoOutlineRounded,
} from '@mui/icons-material'
import {
  Alert,
  SxProps,
  Theme,
} from '@mui/material'
import React, {
  ReactNode,
} from 'react'

interface IProps {
  text: string
  classNameContainer?: SxProps<Theme>
  severity?: 'info' | 'error'
  action?: ReactNode
}
const InfoPanel = ({
  text,
  classNameContainer,
  severity = 'info',
  action,
}: IProps) => {
  return (
    <Alert
      icon={<InfoOutlineRounded />}
      severity={severity}
      action={action}
      sx={{
        bgcolor: '#E5F6FD',
        color: '#014361',
        borderRadius: 2,
        ...classNameContainer,
      }}
    >
      {text}
    </Alert>
  )
}

export default InfoPanel

import {
  Box,
  SxProps,
  Theme,
} from '@mui/material'
import {
  ReactNode,
} from 'react'

type IProps = {
  children: ReactNode;
  classNameContainer?: SxProps<Theme>
}

export const shadows = {
  sm: '0px 3px 1px -2px rgba(0, 0, 0, 0.2)',
  md: '0px 2px 2px 0px rgba(0, 0, 0, 0.15)',
  lg: '0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
}

export const CardTitle = ({
  children,
  classNameContainer,
}: IProps) => (
  <Box
    sx={{
      borderRadius: 2,
      boxShadow: shadows.md,
      height: 180,
      backgroundColor: 'background.paper',
      ...classNameContainer,
    }}
  >
    {children}
  </Box>
)

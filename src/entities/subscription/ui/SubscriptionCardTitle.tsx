import {
  Box,
  SxProps,
  Theme,
} from '@mui/material'
import Image, {
  StaticImageData,
} from 'next/image'
import React from 'react'

interface IProps {
  image: StaticImageData,
  children: React.ReactNode;
  classNameContainer?: SxProps<Theme>
}
const SubscriptionCardTitle = ({
  image,
  children,
  classNameContainer,
}: IProps) => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      maxHeight: 180,
      overflow: 'hidden',
      ...classNameContainer,
      height: '100%',
    }}
    >
      {children}
      <Box
        sx={{
          position: 'relative',
          width: {
            xs: 320,
            md: 362,
          },
          height: '100%',
          flexShrink: 0,
          '@media (max-width: 600px)': {
            display: 'none',
          },
        }}
      >
        <Image
          src={image}
          alt="subscribeImage"
          unoptimized
          style={{
            objectFit: 'cover',
            transformOrigin: 'center',
            width: '100%',
            height: '100%',
          }}
        />
      </Box>
    </Box>
  )
}

export default SubscriptionCardTitle

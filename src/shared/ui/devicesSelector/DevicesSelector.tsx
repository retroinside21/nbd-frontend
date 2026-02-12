import {
  Box,
} from '@mui/material'
import React from 'react'

// const PRICE_ONE_DEVICE = 70
const DEVICES = [1, 2, 3, 4, 5, 6]

interface IProps{
    onSelect: (select: number) => void
    activeStep: number
    countDisable?: number
}
const DevicesSelector = ({
  onSelect,
  activeStep = 1,
  countDisable = 0,
}: IProps) => {
  return (
    <Box>
      {/* Контейнер */}
      <Box
        sx={{
          bgcolor: '#DFEEFF',
          borderRadius: '999px',
          height: '46px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {DEVICES.map((item) => {
          const isActive = item === activeStep
          const isDisable = item <= countDisable
          return (
            <Box
              key={item}
              onClick={() => onSelect(item)}
              sx={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 500,
                cursor: isDisable ? 'default' : 'pointer',
                pointerEvents: isDisable ? 'none' : 'auto',
                ...(isActive
                  ? {
                    border: '5px solid var(--color-blue)',
                    color: 'var(--color-blue)',
                    bgcolor: '#FFFFFF',
                  }
                  : {
                    bgcolor: '#FFFFFF',
                    border: '5px solid var(--color-blue)',
                    color: 'var(--color-blue)',
                    opacity: '.4',
                  }),
              }}
            >
              {item}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default DevicesSelector

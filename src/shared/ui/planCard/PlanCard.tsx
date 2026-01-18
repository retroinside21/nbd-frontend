/* eslint-disable id-length */
import {
  Box,
  Button,
  Chip,
  Paper,
  Typography,
} from '@mui/material'
import React from 'react'
import {
  IPlan,
} from './types'

interface IProps {
  plan : IPlan
  onClick?: () => void
}

const PlanCard = ({
  plan,
  onClick,
}: IProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 2,
        border: '1px solid #E0E0E0',
        p: 2,
        mb: 1,
      }}
    >
      <Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h5" fontWeight={500}>
            {plan.duration}
          </Typography>
          {plan.label && (
          <Chip
            label={plan.label}
            size="small"
            sx={{
              fontSize: 12,
              fontWeight: 500,
              color: 'white',
              bgcolor: 'var(--color-blue)',
            }}
          />
          )}
        </Box>
        <Typography
          variant="h4"
          sx={{
            color: 'var(--color-blue)',
          }}
        >
          {plan.price}
          {' '}
          ₽
        </Typography>
        <Typography variant="subtitle1" color="text.primary">
          {plan.perMonth}
          {' '}
          ₽/мес
        </Typography>
      </Box>

      <Button
        variant="contained"
        onClick={onClick}
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
        ВЫБРАТЬ
      </Button>
    </Paper>
  )
}

export default PlanCard

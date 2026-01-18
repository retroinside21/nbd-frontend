/* eslint-disable id-length */

'use client'

import React, {
  useState,
} from 'react'
import {
  Box,
  Typography,
  Tabs,
  Tab,
} from '@mui/material'
// import PurchaseModal from '@/features/subscribe/ui/purchaseModal/PurchaseModal'
import InfoPanel from '../info/info'

export default function PurchaseSubscription() {
  const [tab, setTab] = useState(0)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  return (
    <Box sx={{
      maxWidth: 700,
      mx: 'auto',
    }}
    >
      <Typography variant="h4" mb={2}>
        Купить подписку
      </Typography>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={handleChange}
        indicatorColor="primary"
        sx={{
          mb: 2,
          '& .MuiTab-root': {
            textTransform: 'none',
            color: 'var(--color-blue)',
            fontWeight: 500,
          },
        }}
      >
        <Tab label="Группа 1" />
        <Tab label="Группа 2" />
        <Tab label="Группа 3" />
      </Tabs>

      {/* Info alert */}
      <InfoPanel text="Описание функционала/особенностей именно для этого тарифа." />

      {/* <PurchaseModal
        open
        onClose={() => console.log('f')}
        price={1188}
        period="12 месяцев"
        perMonth={99}
      /> */}
    </Box>
  )
}

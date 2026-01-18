'use client'

import SubscriptionCardTitle from '@/entities/subscription/ui/SubscriptionCardTitle'
import {
  CardTitle,
} from '@/shared/ui/cardTitle/CardTitle'
import historyImage from '@/shared/assets/bg/historycard.png'
import {
  Box, Typography,
} from '@mui/material'
import PaymentTableWithPagination from '@/entities/history/ui/PaymentTableWithPagination/PaymentTableWithPagination'

const History = () => {
  return (
    <Box sx={{
      py: 2,
    }}
    >
      <CardTitle
        classNameContainer={{
          marginBottom: '20px',
          height: 160,
        }}
      >
        <SubscriptionCardTitle image={historyImage}>
          <Box
            p={2}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h4">
              История оплат
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Удобный доступ к вашим предыдущим
              <br />
              оплатам за подписки и подарки
            </Typography>
          </Box>
        </SubscriptionCardTitle>
      </CardTitle>

      <PaymentTableWithPagination />
    </Box>
  )
}
export default History

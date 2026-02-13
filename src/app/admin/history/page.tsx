/* eslint-disable id-length */

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
          mb: {
            md: 2.5,
            xs: 2,
          },
          height: {
            xs: 140,
            md: 160,
          },
          '@media (max-width: 600px)': {
            height: 120,
          },
        }}
      >
        <SubscriptionCardTitle image={historyImage}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: {
                md: 2,
                xs: 1,
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: {
                  xs: 26,
                },
              }}
            >
              История оплат
            </Typography>
            <Typography variant="body2" color="text.secondary" maxWidth={308}>
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

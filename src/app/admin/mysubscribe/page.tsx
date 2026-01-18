import SubscriptionCardTitle from '@/entities/subscription/ui/SubscriptionCardTitle'
import {
  CardTitle,
} from '@/shared/ui/cardTitle/CardTitle'
import historyImage from '@/shared/assets/bg/historycard.png'
import {
  Box, Typography,
} from '@mui/material'

const Referrals = () => {
  return (
    <CardTitle>
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
  )
}

export default Referrals

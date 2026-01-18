import SubscriptionCardTitle from '@/entities/subscription/ui/SubscriptionCardTitle'
import {
  CardTitle,
} from '@/shared/ui/cardTitle/CardTitle'
import giftImage from '@/shared/assets/bg/giftcard.png'
import {
  Box, Typography,
} from '@mui/material'

const Gift = () => {
  return (
    <CardTitle>
      <SubscriptionCardTitle image={giftImage}>
        <Box
          p={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h4">
            Подарки
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Дарите и получайте подарки
          </Typography>
        </Box>
      </SubscriptionCardTitle>
    </CardTitle>
  )
}

export default Gift

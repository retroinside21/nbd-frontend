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
      <SubscriptionCardTitle
        image={historyImage}
        classNameContainer={{
          marginBottom: '20px',
        }}
      >
        <Box
          p={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h4">
            Реферальная
            <br />
            программа
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Зарабатывайте, приглашая новых
            <br />
            пользователей
          </Typography>
        </Box>
      </SubscriptionCardTitle>
    </CardTitle>
  )
}

export default Referrals

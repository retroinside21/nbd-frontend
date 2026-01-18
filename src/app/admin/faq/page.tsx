import SubscriptionCardTitle from '@/entities/subscription/ui/SubscriptionCardTitle'
import {
  CardTitle,
} from '@/shared/ui/cardTitle/CardTitle'
import faqImage from '@/shared/assets/bg/faqcard.png'
import {
  Box, Typography,
} from '@mui/material'
import FAQSection from '@/entities/faq/ui/FAQSection'

const Faq = () => {
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
        <SubscriptionCardTitle
          image={faqImage}

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
              Частые вопросы
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Быстрые ответы без ожидания поддержки
            </Typography>
          </Box>
        </SubscriptionCardTitle>
      </CardTitle>
      <FAQSection />
    </Box>
  )
}

export default Faq

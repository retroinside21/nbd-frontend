/* eslint-disable id-length */
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
        <SubscriptionCardTitle
          image={faqImage}

        >
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

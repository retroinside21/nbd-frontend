'use client'

import * as React from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const faqs = [
  {
    question: 'Что мне нужно для подключения к вашему сервису?',
    answer: 'Вам нужно ваше устройство, приложение VLESS и средства для оплаты.',
  },
  {
    question: 'Как я могу изменить свой тарифный план?',
    answer: 'Вы можете изменить тарифный план в разделе подписок в личном кабинете.',
  },
  {
    question: 'Какие протоколы шифрования вы используете?',
    answer: 'Мы используем современные протоколы, включая VLESS и WireGuard.',
  },
  {
    question: 'Предоставляете ли вы выделенные IP-адреса?',
    answer: 'Да, при необходимости вы можете запросить выделенный IP.',
  },
  {
    question: 'Поддерживаете ли вы WireGuard?',
    answer: 'Да, наш сервис полностью поддерживает WireGuard.',
  },
  {
    question: 'Могу ли я использовать ваш VPN на нескольких устройствах?',
    answer: 'Да, вы можете использовать VPN на нескольких устройствах одновременно.',
  },
  {
    question: 'Как я могу связаться с вашей службой поддержки?',
    answer: 'Вы можете написать нам через форму обратной связи в личном кабинете.',
  },
  {
    question: 'Есть ли у вас политика отсутствия логов?',
    answer: 'Да, мы не ведем журналов активности пользователей.',
  },
]

export default function FAQSection() {
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Box sx={{
      width: '100%',
      maxWidth: 800,
      mx: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
    }}
    >
      {faqs.map((faq, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          sx={{
            borderRadius: 2,
            boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            '&::before': {
              display: 'none',
            },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant="body1"
              color={expanded === `panel${index}` ? 'var(--color-blue)' : 'text.primary'}
            >
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}

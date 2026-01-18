import InfoPanel from '@/shared/ui/info/info'
import ModalContainer from '@/shared/ui/modalContainer/ModalContainer'
import {
  IPlan,
} from '@/shared/ui/planCard/types'
import FormPayment from '@/widgets/ui/FormPayment/FormPayment'
import {
  Box, Button, Chip, Divider, Stack, Typography,
} from '@mui/material'
import React, {
  useState,
} from 'react'

interface IProps {
  open: boolean;
  onClose: () => void;
  plan: IPlan & { period: number };
}

const ProlongModal = ({
  open, onClose, plan,
}: IProps) => {
  const [method, setMethod] = useState('СБП')

  const onChangePayment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMethod(event.target.value)
  }

  return (
    <ModalContainer open={open} onClose={onClose}>
      <Box>
        <Typography variant="h4" mb={2}>
          Продлить подписку
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          divider={(
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderColor: 'divider',
              }}
            />
          )}
          sx={{
            py: 2,
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignContent: 'center',
              gap: 2,
              mb: 3,
              width: '331px',
            }}
          >
            <Chip
              sx={{
                bgcolor: 'var(--color-blue)',
                pl: 1,
                borderRadius: 2,
              }}
            />
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '1.3rem',
              }}
            >
              m5qqv219
            </Typography>
          </Box>

          <Box
            sx={{
              border: '1px solid var(--color-blue)',
              borderRadius: 4,
              padding: 2,
              width: '332px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2.5,
                mb: '2px',
              }}
            >
              <Typography variant="h5" fontWeight={500}>
                {plan.duration}
              </Typography>
              <Typography variant="h5" fontWeight={500}>
                {plan.period}
                {' '}
                месяцев
              </Typography>
            </Box>

            <Stack
              direction="row"
              spacing="10px"
              alignItems="center"
              divider={(
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    borderColor: 'divider',
                    alignSelf: 'center',
                    height: '100%',
                    py: 1,
                  }}
                />
              )}
            >
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
              <Typography
                variant="subtitle1"
                color="text.primary"
                sx={{
                  lineHeight: 1.2,
                }}
              >
                {plan.perMonth}
                {' '}
                ₽/мес
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>

      <FormPayment value={method} onChangePayment={onChangePayment} />

      <InfoPanel
        text="   Нажимая «Перейти к оплате», вы будете перенаправлены на защищённую
        страницу выбранного способа оплаты. Проверьте сумму и завершите платёж."
        classNameContainer={{
          mb: 2,
          textAlign: 'left',
        }}
      />

      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: 'var(--color-pink)',
            color: 'white',
            px: 6,
            py: 1.5,
            borderRadius: '12px',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              bgcolor: 'var(--color-pink-hover)',
            },
          }}
        >
          Перейти к оплате 1188 ₽
        </Button>
      </Box>
    </ModalContainer>
  )
}

export default ProlongModal

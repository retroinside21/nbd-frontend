/* eslint-disable id-length */

'use client'

import React, {
  useMemo,
  useState,
} from 'react'
import {
  Box, Typography, Button, Paper, Divider,
} from '@mui/material'
import FormPayment from '@/widgets/ui/FormPayment/FormPayment'
import ModalContainer from '@/shared/ui/modalContainer/ModalContainer'
import InfoPanel from '@/shared/ui/info/info'

interface PurchaseModalProps {
  open: boolean;
  onClose: () => void;
  onPayment: (deviceCount: number, priceOneDevice: number) => void;
  price: number;
  period: string;
  perMonth: number;
  activeDevice: number;
}

const PRICE_ONE_DEVICE = 70

const PurchaseModal: React.FC<PurchaseModalProps> = ({
  open,
  onClose,
  price,
  period,
  perMonth,
  onPayment,
  activeDevice,
}) => {
  const [method, setMethod] = useState('СБП')
  // const [devices, setDevices] = useState<number>(1)

  const onChangePayment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMethod(event.target.value)
  }
  const amountMonths = perMonth / 30

  const priceMemo = useMemo(() => {
    return activeDevice <= 1 ? price : price + ((PRICE_ONE_DEVICE * (activeDevice - 1)) * amountMonths)
  }, [activeDevice, price, amountMonths])

  return (
    <ModalContainer open={open} onClose={onClose}>
      {/* Заголовок */}
      <Typography variant="h5" mb={3}>
        Купить подписку
      </Typography>

      {/* Инфо о тарифе */}
      <Box sx={{
        mb: 1,
        display: 'flex',
        gap: 2,
      }}
      >
        <Paper
          variant="outlined"
          sx={{
            borderColor: 'var(--color-blue)',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 240,
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" fontWeight={500}>
            {period}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: 'var(--color-blue)',
              }}
            >
              {priceMemo}
              {' '}
              ₽
            </Typography>
            <Divider orientation="vertical" />
            <Typography variant="subtitle1" color="text.primary">
              {Math.ceil(priceMemo / amountMonths)}
              {' '}
              ₽/мес
            </Typography>
          </Box>
        </Paper>

      </Box>

      {/* Способы оплаты */}
      <FormPayment value={method} onChangePayment={onChangePayment} />
      {/* Инфо блок */}
      <InfoPanel
        text="Нажимая «Перейти к оплате», вы будете перенаправлены на защищённую
        страницу выбранного способа оплаты. Проверьте сумму и завершите платёж."
        classNameContainer={{
          my: 2,
        }}
      />
      {/* Кнопка */}
      <Button
        variant="contained"
        onClick={() => onPayment(activeDevice, PRICE_ONE_DEVICE)}
        sx={{
          bgcolor: 'var(--color-pink)',
          color: '#fff',
          fontWeight: 600,
          py: 1.2,
          '&:hover': {
            bgcolor: 'var(--color-pink-hover)',
          },
        }}
      >
        ПЕРЕЙТИ К ОПЛАТЕ
        {' '}
        {priceMemo}
        {' '}
        ₽
      </Button>
    </ModalContainer>
  )
}

export default PurchaseModal

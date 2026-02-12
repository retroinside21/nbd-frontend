import ModalContainer from '@/shared/ui/modalContainer/ModalContainer'
import {
  Box,
  Button,
  Divider,
  Typography,
} from '@mui/material'
import React, {
  useMemo,
  useState,
} from 'react'
import {
  IRemnaUserKey,
} from '@/entities/user/types/user.types'
import {
  DateTime,
} from 'luxon'
import FormPayment from '@/widgets/ui/FormPayment/FormPayment'
import InfoPanel from '@/shared/ui/info/info'
import DevicesSelector from '@/shared/ui/devicesSelector/DevicesSelector'
import {
  PRICE_ONE_DEVICE,
} from '../purchaseModal/PurchaseModal'

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  tariffData: IRemnaUserKey;
  onPayment: (deviceCount: number, priceOneDevice: number) => void;
//   price: number;
//   activeDevice: number;
}
const UpgradeModal = ({
  open,
  onClose,
  tariffData,
  onPayment,
}: UpgradeModalProps) => {
  const {
    hwidDeviceLimit,
  } = tariffData
  const [activeDevice, setDevices] = useState<number>(hwidDeviceLimit || 1)
  const [method, setMethod] = useState('СБП')

  const onChangePayment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMethod(event.target.value)
  }
  const expiry = DateTime.fromISO(tariffData.expireAt, {
    zone: 'utc',
  }).setZone('local')
  const daysLeft = Math.ceil(expiry.diffNow('days').as('days'))

  const handleSelectDevices = (select: number) => {
    setDevices(select)
  }

  const priceMemo = useMemo(() => {
    return Math.ceil(daysLeft / 30) * PRICE_ONE_DEVICE * (activeDevice - hwidDeviceLimit)
  }, [activeDevice, hwidDeviceLimit])

  return (
    <ModalContainer open={open} onClose={onClose}>
      <Typography variant="h5" mb={3}>
        Расширить подписку
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 2,
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
          доплата за
          {' '}
          {activeDevice - hwidDeviceLimit}
          {' '}
          {activeDevice - hwidDeviceLimit === 1 ? 'устройство' : 'устройства'}
          {' '}
          на
          {' '}
          {daysLeft}
          {' '}
          {daysLeft === 1 ? 'день' : 'дней'}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontWeight: 500,
          mb: 2,
        }}
      >
        1. Выберите количество устройств
      </Typography>
      <DevicesSelector
        onSelect={handleSelectDevices}
        activeStep={activeDevice}
        countDisable={hwidDeviceLimit}
      />
      {/* Способы оплаты */}
      <FormPayment value={method} onChangePayment={onChangePayment} />

      <InfoPanel
        text="Нажимая «Перейти к оплате», вы будете перенаправлены на защищённую
        страницу выбранного способа оплаты. Проверьте сумму и завершите платёж."
        classNameContainer={{
          my: 2,
        }}
      />
      <Button
        variant="contained"
        onClick={() => onPayment(activeDevice, priceMemo)}
        disabled={activeDevice === hwidDeviceLimit}
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
        {activeDevice === hwidDeviceLimit ? 'Выбрано текущее количество устройств' : `ПЕРЕЙТИ К ОПЛАТЕ ${priceMemo} ₽`}

      </Button>
    </ModalContainer>
  )
}

export default UpgradeModal

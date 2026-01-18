'use client'

import SubscriptionCardTitle from '@/entities/subscription/ui/SubscriptionCardTitle'
import {
  CardTitle,
} from '@/shared/ui/cardTitle/CardTitle'
import buysImage from '@/shared/assets/bg/buysCard.png'
import {
  Box, Typography,
} from '@mui/material'

import {
  useState,
} from 'react'
// import TabsBar from '@/shared/ui/tabsbar/TabsBar'
// import InfoPanel from '@/shared/ui/info/info'
import PurchaseModal from '@/features/subscribe/ui/purchaseModal/PurchaseModal'
import {
  useAuth,
} from '@/features/auth/providers/AuthProvider'
import api from '@/shared/api/api'
import {
  Tariff,
} from '@/entities/tariff'
import DevicesSelector from '@/shared/ui/devicesSelector/DevicesSelector'
import SubcribeTarrif from '@/widgets/ui/SubcribeTarrif/SubcribeTarrif'

export async function createPayment(tariffId: number, tg_id: number, deviceCount: number, priceOneDevice: number) {
  const res: any = await api.post('/payment/yookassa/create', {
    tariff_id: tariffId,
    tg_id: tg_id?.toString() || null,
    hwid: deviceCount,
    price_one_device: priceOneDevice || undefined,
  })

  return res
}

export async function createPaymentEmail(tariffId: number, email: string, deviceCount: number, priceOneDevice: number) {
  const res: any = await api.post('/payment/yookassa/create/email', {
    tariff_id: tariffId,
    email,
    hwid: deviceCount,
    price_one_device: priceOneDevice || undefined,
  })

  return res
}

const Buys = () => {
  const [tarrifState, setTarrifState] = useState<Tariff | null>(null)
  const [activeDevice, setDevices] = useState<number>(1)

  const {
    user: {
      tg_id,
    },
  } = useAuth()

  const handleChangeTarrif = (plan: Tariff | null) => {
    setTarrifState(plan)
  }

  const handlePayment = async (deviceCount: number, priceOneDevice: number) => {
    if (!tarrifState) return
    if (!tg_id) return
    const res = await createPayment(tarrifState.id, Number(tg_id), deviceCount, priceOneDevice)
    if (res.data.success) window.location.href = res.data.confirmation_url
  }

  const handleSelectDevices = (select: number) => {
    setDevices(select)
  }

  return (
    <>
      <Box sx={{
        py: 2,
      }}
      >
        <CardTitle classNameContainer={{
          marginBottom: '20px',
          height: 160,
        }}
        >
          <SubscriptionCardTitle
            image={buysImage}
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
                Купить подписку
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Покупайте и управляйте подписками
              </Typography>
            </Box>
          </SubscriptionCardTitle>
        </CardTitle>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
        >
          {/* <TabsBar
            tabValue={tab}
            handleChange={handleChange}
            nameTabs={['Группа 1', 'Группа 2', 'Группа 3']}
          /> */}
          <Typography
            sx={{
              fontWeight: 500,
            }}
          >
            1. Выберите количество устройств
          </Typography>

          <DevicesSelector
            onSelect={handleSelectDevices}
            activeStep={activeDevice}
          />
          {/* <InfoPanel text="Описание функционала/особенностей именно для этого тарифа." /> */}

          <Typography
            sx={{
              fontWeight: 500,
            }}
          >
            2. Выберите длительность подписки
          </Typography>

          <SubcribeTarrif
            setTarrifState={setTarrifState}
            activeDevice={activeDevice}
          />
        </Box>
      </Box>
      <PurchaseModal
        open={!!tarrifState}
        onClose={() => handleChangeTarrif(null)}
        onPayment={handlePayment}
        price={tarrifState?.price_rub || 0}
        period={tarrifState?.name || ''}
        perMonth={tarrifState?.duration_days || 0}
        activeDevice={activeDevice}
      />
    </>
  )
}

export default Buys

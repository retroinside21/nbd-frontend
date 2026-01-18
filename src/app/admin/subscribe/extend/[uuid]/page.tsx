'use client'

import {
  Box, Button,
  IconButton,
  Typography,
} from '@mui/material'
import {
  useParams,
  useRouter,
} from 'next/navigation'

// import PurchaseSubscription from '@/shared/ui/purchaseSubscription/PurchaseSubscription'
import {
  ChevronLeft,
} from '@mui/icons-material'
import {
  useAuth,
} from '@/features/auth/providers/AuthProvider'
import SubcribeTarrif from '@/widgets/ui/SubcribeTarrif/SubcribeTarrif'
import {
  useState,
} from 'react'
import {
  Tariff,
} from '@/entities/tariff'
import PurchaseModal from '@/features/subscribe/ui/purchaseModal/PurchaseModal'
import {
  createPayment,
  createPaymentEmail,
} from '@/app/admin/buys/page'

const BuySubscribe = () => {
  const [tarrifState, setTarrifState] = useState<Tariff | null>(null)

  const router = useRouter()
  const params = useParams<{ uuid: string }>()
  const {
    user,
  } = useAuth()

  const {
    uuid,
  } = params
  const {
    tg_id,
    email,
  } = user

  const handleClick = () => {
    router.push('/admin/subscribe')
  }

  const handlePayment = async (deviceCount: number, priceOneDevice: number) => {
    if (!tarrifState) return
    if (!tg_id && !email) return

    let res
    if (tg_id) {
      res = await createPayment(tarrifState.id, Number(tg_id), deviceCount, priceOneDevice)
    } else {
      res = await createPaymentEmail(tarrifState.id, email, deviceCount, priceOneDevice)
    }
    if (res.data.success) window.location.href = res.data.confirmation_url
  }

  const handleChangeTarrif = (plan: Tariff | null) => {
    setTarrifState(plan)
  }

  console.log(uuid)
  const activeDevice = user.hwidDeviceLimit ?? 1
  return (
    <Box>
      <Button
        onClick={handleClick}
        variant="contained"
        sx={{
          color: 'var(--color-blue)',
          px: 0,
          py: 2,
          bgcolor: 'white',
          boxShadow: 'inherit',
          fontWeight: 500,
          '&:hover': {
            color: 'var(--color-blue-hover)',
            boxShadow: 'inherit',
          },
        }}
      >
        <IconButton sx={{
          color: 'var(--color-blue)',
        }}
        >
          <ChevronLeft />
        </IconButton>
        назад
      </Button>

      <Typography variant="h4" mb={2.5}>
        Продлить подписку
      </Typography>

      <SubcribeTarrif activeDevice={activeDevice} setTarrifState={setTarrifState} />
      <PurchaseModal
        open={!!tarrifState}
        onClose={() => handleChangeTarrif(null)}
        onPayment={handlePayment}
        price={tarrifState?.price_rub || 0}
        period={tarrifState?.name || ''}
        perMonth={tarrifState?.duration_days || 0}
        activeDevice={activeDevice}
      />
    </Box>
  )
}

export default BuySubscribe

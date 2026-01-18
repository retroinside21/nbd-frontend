'use client'

import React, {
  useState,
} from 'react'

import {
  Box, Button, Typography,
} from '@mui/material'
import {
  useAuth,
} from '@/features/auth/providers/AuthProvider'
import {
  createPayment,
} from '@/app/admin/buys/page'
import {
  Tariff,
} from '@/entities/tariff'
import DevicesSelector from '@/shared/ui/devicesSelector/DevicesSelector'
import PurchaseModal from '@/features/subscribe/ui/purchaseModal/PurchaseModal'
import InfoPanel from '@/shared/ui/info/info'
import {
  ArrowForwardIosRounded,
} from '@mui/icons-material'
import {
  useApi,
} from '@/shared/hooks/useApi'
import {
  IServersResponse,
} from '@/shared/models/typesRes'
import api from '@/shared/api/api'
import {
  useSnackbar,
} from '@/features/notify/model/strores/useSnackbar'
import SubcribeTarrif from '../SubcribeTarrif/SubcribeTarrif'

const SubcribeBuy = () => {
  const [tarrifState, setTarrifState] = useState<Tariff | null>(null)
  const [activeDevice, setDevices] = useState<number>(1)

  const {
    show,
  } = useSnackbar()
  const {
    user: {
      tg_id,
      email,
    },
  } = useAuth()

  const handleChangeTarrif = (plan: Tariff | null) => {
    setTarrifState(plan)
  }

  const {
    data: servers,
  } = useApi<IServersResponse>('/user/servers', {
    method: 'get',
    enabled: true,
  })

  const handlePayment = async (deviceCount: number, priceOneDevice: number) => {
    if (!tarrifState) return
    if (!tg_id) return
    const res = await createPayment(tarrifState.id, Number(tg_id), deviceCount, priceOneDevice)
    if (res.data.success) window.location.href = res.data.confirmation_url
  }

  const handleSelectDevices = (select: number) => {
    setDevices(select)
  }

  const handleAddTrialSubsribe = async () => {
    const {
      cluster_name, inbound_id,
    } = servers?.servers[0] || {}
    const server_id = cluster_name || 'cluster1'
    try {
      const response = await api.post('/user/create-subscribe-trial', {
        email,
        tg_id: tg_id ? Number(tg_id) : null,
        cluster_name: server_id,
        inbound_id,
      })
      show('Пробная подписка успечно создана')
      return response.data
    } catch (err: any) {
      show('Ошибка создания пользователя', 'error')
      throw err
    }
  }

  return (
    <>
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

        <InfoPanel
          text="Вы можете оформить пробную подписку и
          пользоваться сервисом бесплатно в течение 3 дней. Пробная подписка доступна для одного устройства."
          classNameContainer={{
            '& .MuiAlert-action': {
              alignItems: 'center',
            },
          }}
          action={(
            <Button
              variant="contained"
              size="small"
              onClick={handleAddTrialSubsribe}
              sx={{
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
                background: 'transparent',
                color: '#014361',
                boxShadow: 'none',
                border: 'none',
                '&:hover': {
                  boxShadow: 'none',
                  border: 'none',
                },
              }}
              endIcon={(
                <ArrowForwardIosRounded sx={{
                  color: '#014361',
                }}
                />
)}
            >
              Пробная подписка
            </Button>
  )}
        />
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

export default SubcribeBuy

'use client'

import SubscriptionCardTitle from '@/entities/subscription/ui/SubscriptionCardTitle'
import {
  CardTitle,
} from '@/shared/ui/cardTitle/CardTitle'
import subscribeImage from '@/shared/assets/bg/subscribecard.png'
import {
  Box, Typography,
} from '@mui/material'
import TetheredDevicesModal from '@/features/subscribe/ui/tetheredDevicesModal/TetheredDevicesModal'
import {
  useState,
} from 'react'
import ProlongModal from '@/features/subscribe/ui/prolongModal/ProlongModal'
import SubcribeContent from '@/widgets/ui/SubcribeContent/SubcribeContent'

export interface IDataKey {
  keyUuid: string | null;
  keyTitle: string | null;
}

const DATA_KEY_DEFAULT = {
  keyUuid: null,
  keyTitle: null,
}
const Subscribes = () => {
  const [isProlong, setProlong] = useState<boolean>(false)
  const [dataKey, setUuid] = useState<IDataKey>(DATA_KEY_DEFAULT)

  return (
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
          image={subscribeImage}
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
              Главная
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Добро пожаловать!
              {' '}
              <br />
              Здесь вы можете следить за статусом своей подписки и управлять ей
            </Typography>
          </Box>
        </SubscriptionCardTitle>
      </CardTitle>
      <SubcribeContent setUuid={setUuid} />
      <TetheredDevicesModal
        open={Boolean(dataKey.keyUuid)}
        onClose={() => setUuid(DATA_KEY_DEFAULT)}
        dataKey={dataKey}
      />
      <ProlongModal
        open={isProlong}
        onClose={() => setProlong(false)}
        plan={{
          duration: 'Группа 1',
          price: 1993,
          perMonth: 100,
          label: '',
          period: 12,
        }}
      />
    </Box>
  )
}

export default Subscribes

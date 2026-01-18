'use client'

import React, {
  Fragment,
  SetStateAction,
  useMemo,
} from 'react'
import {
  isEmpty,
} from 'lodash'
import {
  Box,
  Button,
} from '@mui/material'
import InfoPanel from '@/shared/ui/info/info'
import {
  useUserKeysStore,
} from '@/entities/user/model/useUserKeysStore'
import {
  useUserKeysByEmailStore,
} from '@/entities/user/model/useUserKeysByEmail.store'
import {
  useRouter,
} from 'next/navigation'
import {
  useAuth,
} from '@/features/auth/providers/AuthProvider'
import {
  ArrowForwardIosRounded,
} from '@mui/icons-material'
import SubscriptionCard from '@/shared/ui/subscriptionCard/SubscriptionCard'
import {
  IDataKey,
} from '@/app/admin/subscribe/page'
import DevicesSkeleton from '@/features/subscribe/ui/devicesSkeleton/DevicesSkeleton'
import SubcribeBuy from '../SubcribeBuy/SubcribeBuy'

interface IProps {
   setUuid: React.Dispatch<SetStateAction<IDataKey>>
}
const SubcribeContent = ({
  setUuid,
}: IProps) => {
  const router = useRouter()
  const {
    user,
  } = useAuth()
  const {
    tg_id,
    email,
  } = user
  const userKeys = useUserKeysStore((service) => service.data)
  const userKeysEmail = useUserKeysByEmailStore((service) => service.data)
  const loadingUserKeys = useUserKeysStore((service) => service.loading)
  const loadingUserKeysEmail = useUserKeysByEmailStore((service) => service.loading)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const handleProlongClick = async (uuid:string) => {
    router.push(`/admin/subscribe/extend/${uuid}`)
  }

  const userKeysMemo = useMemo(() => {
    if (tg_id) {
      if (!userKeys?.keys) return null
      return [...userKeys.keys]
    }
    if (email) {
      if (!userKeysEmail?.keys) return null
      return [...userKeysEmail.keys]
    }
    return null
  }, [userKeys?.keys, userKeysEmail?.keys])

  if (!userKeysMemo) {
    return <DevicesSkeleton />
  }

  if (loadingUserKeysEmail || loadingUserKeys) {
    return <DevicesSkeleton />
  }

  if (isEmpty(userKeysMemo)) {
    return <SubcribeBuy />
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}
    >
      {userKeysMemo.map((card) => (
        <Fragment key={card.uuid}>
          {card.status !== 'ACTIVE' && (
          <InfoPanel
            severity="error"
            text="Ваша подписка истекла, продлите её, чтобы продолжить пользоваться сервисом"
            classNameContainer={{
              bgcolor: '#FDEDED',
              color: '#5F2120',
              '& .MuiAlert-action': {
                alignItems: 'center',
              },
            }}
            action={(
              <Button
                variant="text"
                size="small"
                onClick={() => handleProlongClick(card.uuid)}
                sx={{
                  color: '#5F2120',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
                endIcon={<ArrowForwardIosRounded fontSize="small" />}
              >
                продлить подписку
              </Button>
            )}
          />
          )}

          <SubscriptionCard
            data={card}
            onClickSetDevices={() => setUuid({
              keyUuid: card.uuid,
              keyTitle: card.username,
            })}
            onClickProlong={() => handleProlongClick(card.uuid)}
          />
        </Fragment>
      ))}
    </Box>
  )
}

export default SubcribeContent

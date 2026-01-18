/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import {
  usePaymentHistoryStore,
} from '@/entities/history/model/paymentHistory.store'
import {
  useTariffStore,
} from '@/entities/tariff'
import {
  useUserKeysByEmailStore,
} from '@/entities/user/model/useUserKeysByEmail.store'
import {
  useUserKeysStore,
} from '@/entities/user/model/useUserKeysStore'
import {
  useAuth,
} from '@/features/auth/providers/AuthProvider'
import {
  Grid,
} from '@mui/material'
import {
  useEffect,
} from 'react'

interface AdminContentProps {
  children: React.ReactNode
}

export function AdminContent({
  children,
}: AdminContentProps) {
  const fetchUserKeys = useUserKeysStore((service) => service.fetch)
  const fetchTariffs = useTariffStore((service) => service.fetchTariffs)
  const fetchEmailKeys = useUserKeysByEmailStore((service) => service.fetch)

  const pageHistory = usePaymentHistoryStore((service) => service.page)
  const sortByHistory = usePaymentHistoryStore((service) => service.sortBy)
  const orderHistory = usePaymentHistoryStore((service) => service.order)

  const {
    fetchPaymentHistory,
  } = usePaymentHistoryStore()

  const {
    user,
  } = useAuth()
  const {
    email,
  } = user
  const {
    tg_id,
  } = user

  const fetchDataUsers = () => {
    if (tg_id) {
      fetchUserKeys(tg_id)
    } else {
      fetchEmailKeys(email)
    }
  }
  useEffect(() => {
    Promise.all([
      fetchDataUsers(), fetchTariffs()])
  }, [tg_id, email])

  // useEffect(() => {
  //   fetchPaymentHistory(tg_id || email)
  // }, [tg_id, email, pageHistory, sortByHistory, orderHistory])

  return (
    <Grid
      sx={{
        flex: '0 0 702px',
        maxWidth: '702px',
      }}
    >
      {children}
    </Grid>
  )
}

// entities/payment/model/paymentHistory.store.ts
import {
  create,
} from 'zustand'
import {
  Order,
} from '@/widgets/model/types'
import {
  getPaymentHistory,
} from '../api/payment.api'
import {
  Payment,
} from '../types/payment.types'

type SortField = keyof Payment

interface PaymentHistoryState {
  payments: Payment[]
  total: number
  page: number
  rowsPerPage: number
  sortBy: SortField
  order: Order

  loading: boolean
  fetched: boolean

  setPage: (page: number) => void
  setSort: (field: SortField) => void
  fetchPaymentHistory: (tg_id: string) => Promise<void>
}

export const usePaymentHistoryStore = create<PaymentHistoryState>((set, get) => ({
  payments: [],
  total: 0,
  page: 1,
  rowsPerPage: 10,
  sortBy: 'created_at',
  order: 'desc',
  loading: false,

  fetched: false,
  setPage: (page) => set({
    page,
  }),

  setSort: (field) => {
    const {
      sortBy, order,
    } = get()
    const isAsc = sortBy === field && order === 'asc'

    set({
      sortBy: field,
      order: isAsc ? 'desc' : 'asc',
      page: 1,
    })
  },

  fetchPaymentHistory: async (tg_id) => {
    const {
      page,
      rowsPerPage,
      sortBy,
      order,
      fetched,
      loading,
    } = get()

    if (fetched || loading) return
    set({
      loading: true,
    })

    const offset = (page - 1) * rowsPerPage

    const data = await getPaymentHistory({
      tg_id,
      limit: rowsPerPage,
      offset,
      sortBy,
      order,
    })

    set({
      payments: data.payments,
      total: data.total,
      loading: false,
    })
  },
}))

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
  fetchPaymentHistory: (props: { tg_id?: string; email?: string }) => Promise<void>
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

  fetchPaymentHistory: async (props: { tg_id?: string; email?: string } = {}) => {
    const {
      page,
      rowsPerPage,
      sortBy,
      order,
      // fetched,
      loading,
    } = get()

    if (loading) return

    set({
      loading: true,
    })

    try {
      const offset = (page - 1) * rowsPerPage

      const queryParams: any = {
        limit: rowsPerPage,
        offset,
        sortBy,
        order,
      }

      if (props.email) {
        queryParams.email = props.email.trim().toLowerCase()
      } else if (props.tg_id) {
        queryParams.tg_id = String(props.tg_id)
      }

      const data = await getPaymentHistory(queryParams)

      set({
        payments: data.payments ?? [],
        total: data.total ?? 0,
        loading: false,
        fetched: true,
      })
    } catch (err) {
      console.error('Ошибка загрузки истории платежей:', err)
      set({
        loading: false,
      })
    }
  },
}))

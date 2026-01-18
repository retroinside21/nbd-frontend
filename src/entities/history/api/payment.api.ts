import api from '@/shared/api/api'

export const getPaymentHistory = async (params: {
  tg_id: string
  limit: number
  offset: number
  sortBy?: string
  order?: 'asc' | 'desc'
  status?: string
}) => {
  const {
    data,
  } = await api.get('/user/payments/history', {
    params,
  })
  return data
}

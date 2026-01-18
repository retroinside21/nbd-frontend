// entities/tariff/api/tariff.api.ts

import api from '@/shared/api/api'
import {
  ITariffResponse,
} from '../types/tariff.types'

export const getTariffs = async (): Promise<ITariffResponse> => {
  const {
    data,
  } = await api.get<ITariffResponse>('/user/tariffs')
  return data
}

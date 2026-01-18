// entities/tariff/model/tariff.store.ts
import {
  create,
} from 'zustand'
import {
  ITariffResponse,
} from '../types/tariff.types'
import {
  getTariffs,
} from '../api/tariff.api'

interface TariffState {
  data: ITariffResponse | null
  loading: boolean
  error: string | null
  fetched: boolean

  fetchTariffs: () => Promise<void>
}

export const useTariffStore = create<TariffState>((set, get) => ({
  data: null,
  loading: false,
  error: null,
  fetched: false,

  fetchTariffs: async () => {
    const {
      fetched, loading,
    } = get()
    if (fetched || loading) return

    set({
      loading: true,
      error: null,
    })

    try {
      const data = await getTariffs()
      set({
        data,
        loading: false,
        fetched: true,
      })
    } catch (err: any) {
      set({
        error: err.message || 'Ошибка загрузки тарифов',
        loading: false,
      })
    }
  },
}))

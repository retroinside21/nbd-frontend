import {
  create,
} from 'zustand'
import {
  IUserKeysResponse,
} from '../types/user.types'
import {
  getUserKeys,
} from '../api/user.api'

interface UserKeysState {
  data: IUserKeysResponse | null
  loading: boolean
  fetched: boolean
  fetch: (tgId: string) => Promise<void>
}

export const useUserKeysStore = create<UserKeysState>((set, get) => ({
  data: null,
  loading: false,
  fetched: false,

  fetch: async (tgId: string) => {
    const {
      fetched, loading,
    } = get()

    if (fetched || loading) return

    set({
      loading: true,
    })

    const data = await getUserKeys(tgId)
    set({
      data,
      loading: false,
      fetched: true,
    })
  },
}))

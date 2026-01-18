import {
  create,
} from 'zustand'
import {
  IUserKeysResponse,
} from '../types/user.types'
import {
  getUserKeysByEmail,
} from '../api/user.api'

interface UserKeysByEmailState {
  data: IUserKeysResponse | null;
  loading: boolean;
  fetched: boolean;
  fetch: (email: string) => Promise<void>;
}

export const useUserKeysByEmailStore = create<UserKeysByEmailState>((set, get) => ({
  data: null,
  loading: false,
  fetched: false,

  fetch: async (email: string) => {
    const {
      fetched, loading,
    } = get()

    if (fetched || loading) return

    set({
      loading: true,
    })

    try {
      const data = await getUserKeysByEmail(email)
      set({
        data,
        loading: false,
        fetched: true,
      })
    } catch (err) {
      console.error('Fetch user keys by email error:', err)
      set({
        loading: false,
      })
    }
  },
}))

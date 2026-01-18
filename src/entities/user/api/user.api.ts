import api from '@/shared/api/api'
import {
  IUserKeysResponse,
} from '../types/user.types'

export const getUserKeys = (tgId: string) => api
  .get<IUserKeysResponse>(`/user/${tgId}/keys`)
  .then((res) => res.data)

export const getUserKeysByEmail = (email: string) => api
  .get<IUserKeysResponse>(`/user/email/${encodeURIComponent(email)}/keys`)
  .then((res) => res.data)

'use client'

import {
  createContext, useContext, ReactNode,
  useMemo,
} from 'react'
import {
  useRouter,
} from 'next/navigation'
import {
  useLocalStorage,
} from '@/hooks/useLocalStorage'
import api from '@/shared/api/api'
import {
  TelegramUser,
} from '../models/types'

export const initialStateAuth: TelegramUser = {
  tg_id: null,
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  language_code: '',
  is_bot: false,
  balance: 0,
  trial: 0,
  preferred_currency: '',
  hwidDeviceLimit: 0,
  description: '',
  source_code: null,
  created_at: '',
  updated_at: '',
}

interface AuthContextType {
  user: TelegramUser;
  login: (userData: TelegramUser) => void;
  logout: () => void;
}

export async function handleLogout() {
  const res: any = await api.post('/auth/logout')

  return res
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({
  children,
}: { children: ReactNode }) => {
  const [user, setUser] = useLocalStorage('user', initialStateAuth)
  const router = useRouter()

  const login = (userData: TelegramUser) => {
    setUser(userData)
    router.replace('/admin/subscribe')
  }

  const logout = async () => {
    await handleLogout()

    setUser(initialStateAuth)
    router.push('/')
  }

  const contextValue = useMemo(() => {
    return {
      login,
      user,
      logout,
    }
  }, [user, login, logout])

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

// хук для удобного использования
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

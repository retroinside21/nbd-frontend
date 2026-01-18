'use client'

import React, {
  useState,
  FC,
  Dispatch,
  SetStateAction,
} from 'react'
import {
  TAuthStepType,
} from '../models/types'
import AuthTitle from './AuthTitle'
import AuthForm from './AuthForm'
import AuthConfirm from './AuthConfirm'

const auth_components : Record<TAuthStepType, FC<{
    onClickStep: Dispatch<SetStateAction<TAuthStepType>>
    emailLogin?: string
    onSetEmail?: Dispatch<SetStateAction<string>>
}>> = {
  1: AuthTitle,
  2: AuthForm,
  3: AuthConfirm,
}
const Auth = () => {
  const [stepAuth, setStepAuth] = useState<TAuthStepType>(1)
  const [email, setEmail] = useState<string>('')
  const AuthComponent = auth_components[stepAuth]

  return (
    <AuthComponent
      onClickStep={setStepAuth}
      emailLogin={email}
      onSetEmail={setEmail}
    />
  )
}

export default Auth

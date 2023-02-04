import React, { FC, PropsWithChildren, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'

type Props = {
  children: JSX.Element
};

export function RequireAuth({children}: Props) {
  const location = useLocation()
  const isAuth = useAppSelector(state => state.main.isAuth)
  if (!isAuth) {
    return <Navigate to='/login' state={{ from: location }} />
  }
  return children
}

export default RequireAuth
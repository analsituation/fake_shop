import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { IAuthUserInfo, IUser } from '../types/User'


const data: any = localStorage.getItem('AuthUserInfo')
  const parse: IAuthUserInfo = JSON.parse(data)

const initialState: IAuthUserInfo = {
    isAuth: parse.isAuth,
    username: parse.username,
    password: parse.password,
    token: parse.token
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{username: string, password: string, token: string}>): IAuthUserInfo => {
      const AuthUserInfo = {
        isAuth: true,
        username: action.payload.username,
        password: action.payload.password,
        token: action.payload.token
      }
      localStorage.setItem('AuthUserInfo', JSON.stringify(AuthUserInfo))
      return state = AuthUserInfo
    },
    logout: (state) => {
      localStorage.removeItem('AuthUserInfo')
      return state = {
        isAuth: false,
        username: '',
        password: '',
        token: ''
      }
    }
  }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer

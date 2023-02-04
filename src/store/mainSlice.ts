import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { IAuthUserInfo, IUser } from '../types/User'


const initialState: IAuthUserInfo = {
    isAuth: false,
    username: '',
    password: '',
    token: ''
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{username: string, password: string, token: string}>) => {
      return state = {
        isAuth: true,
        username: action.payload.username,
        password: action.payload.password,
        token: action.payload.token
      }
    }
  }
})

export const { login } = mainSlice.actions

export default mainSlice.reducer


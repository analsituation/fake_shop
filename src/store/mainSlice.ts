import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface CounterState {
  value: any
}

const initialState: CounterState = {
  value: 0
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<any>) => {
      return state.value += 1
    }
  }
})

export const { increment } = mainSlice.actions

export default mainSlice.reducer


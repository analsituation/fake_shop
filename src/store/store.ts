import { configureStore } from '@reduxjs/toolkit'
import mainSlice from './authSlice'
import { userApi } from './queryApi'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    main: mainSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


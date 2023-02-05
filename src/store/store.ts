import { configureStore } from '@reduxjs/toolkit'
import mainSlice from './authSlice'
import productSlice from './productsSlice'
import { userApi } from './queryApi'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    main: mainSlice,
    products: productSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


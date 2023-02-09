import { configureStore } from '@reduxjs/toolkit'
import mainSlice from './authSlice'
import productSlice from './productsSlice'
import { queryApi } from './queryApi'

export const store = configureStore({
  reducer: {
    [queryApi.reducerPath]: queryApi.reducer,
    main: mainSlice,
    products: productSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(queryApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


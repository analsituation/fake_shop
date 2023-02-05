import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '../types/Product'

interface StateType {
  products: IProduct[],
  quantity: number
}

const initialState: StateType = {
  products: [],
  quantity: 0
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload
      state.quantity = action.payload.length
    }
  }
})

export const { setProducts } = productSlice.actions

export default productSlice.reducer


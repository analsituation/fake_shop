import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '../types/Product'

interface StateType {
  products: IProduct[]
  filteredProducts: IProduct[]
  quantity: number
}

const initialState: StateType = {
  products: [],
  filteredProducts: [],
  quantity: 0
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload
      state.quantity = action.payload.length
    },
    searchProducts: (state, action: PayloadAction<string>) => {
      state.filteredProducts = state.products.filter(el =>
        el.title.toLowerCase().includes(action.payload.toLowerCase())
      )
    }
  }
})

export const { setProducts, searchProducts } = productSlice.actions

export default productSlice.reducer


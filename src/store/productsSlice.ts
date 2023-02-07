import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '../types/Product'

interface StateType {
  products: IProduct[]
  filteredProducts: IProduct[]
  productsInCart: IProduct[]
}

const initialState: StateType = {
  products: [],
  filteredProducts: [],
  productsInCart: []
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload
    },
    searchProducts: (state, action: PayloadAction<string>) => {
      state.filteredProducts = state.products.filter(el =>
        el.title.toLowerCase().includes(action.payload.toLowerCase())
      )
    },
    filterProducts: (state, action: PayloadAction<string[]>) => {
      state.filteredProducts = state.products.filter(el =>
        action.payload.includes(el.category))
    },
    addToCart: (state, action: PayloadAction<IProduct>) => {
      state.productsInCart.push(action.payload)
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.productsInCart.splice(state.productsInCart.indexOf(action.payload), 1)
    }
  }
})

export const {
  setProducts,
  searchProducts,
  filterProducts,
  addToCart,
  removeFromCart
} = productSlice.actions

export default productSlice.reducer


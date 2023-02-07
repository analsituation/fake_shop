import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct, ProductsInCart } from '../types/Product'

interface StateType {
  products: IProduct[]
  filteredProducts: IProduct[]
  prodsInCart: ProductsInCart[]
  productsInCart: IProduct[]
}

const initialState: StateType = {
  products: [],
  filteredProducts: [],
  prodsInCart: [],
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
    addToCart: (state, action: PayloadAction<number>) => {
      state.prodsInCart.push({ productId: action.payload, quantity: 1 })
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.prodsInCart = state.prodsInCart.filter(el => el.productId !== action.payload)
    },
    changeQuantity: (state, action: PayloadAction<ProductsInCart>) => {
      const index = state.prodsInCart.findIndex(el => el.productId === action.payload.productId)
      state.prodsInCart[index].quantity = action.payload.quantity
    }
  }
})

export const {
  setProducts,
  searchProducts,
  filterProducts,
  addToCart,
  removeFromCart,
  changeQuantity
} = productSlice.actions

export default productSlice.reducer


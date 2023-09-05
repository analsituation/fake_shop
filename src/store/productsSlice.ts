import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct, ProductsInCart } from 'types/Product'

interface StateType {
  products: IProduct[]
  filteredProducts: IProduct[]
  productsInCart: ProductsInCart[]
}

const data: any = localStorage.getItem('productCart')
const productsInStorage: ProductsInCart[] = JSON.parse(data)

const initialState: StateType = {
  products: [],
  filteredProducts: [],
  productsInCart: productsInStorage ? [...productsInStorage] : []
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
      state.filteredProducts = state.products.filter(el => action.payload.includes(el.category))
    },
    addToCart: (state, action: PayloadAction<IProduct>) => {
      state.productsInCart.push({ product: action.payload, quantity: 1 })
      localStorage.setItem('productCart', JSON.stringify(state.productsInCart))
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.productsInCart = state.productsInCart.filter(el => el.product.id !== action.payload)
      localStorage.setItem('productCart', JSON.stringify(state.productsInCart))
    },
    changeQuantity: (state, action: PayloadAction<ProductsInCart>) => {
      const index = state.productsInCart.findIndex(el => el.product.id === action.payload.product.id)
      state.productsInCart[index].quantity = action.payload.quantity
      localStorage.setItem('productCart', JSON.stringify(state.productsInCart))
    }
  }
})

export const { setProducts, searchProducts, filterProducts, addToCart, removeFromCart, changeQuantity } =
  productSlice.actions

export default productSlice.reducer

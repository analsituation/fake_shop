export interface IProduct {
  id: number
  title: string
  price: string
  category: string
  description: string
  image: string
}

export interface ProductsInCart {
  productId: number
  quantity: number
}
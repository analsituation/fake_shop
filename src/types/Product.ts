export interface IProduct {
  id: number
  title: string
  price: string
  category: string
  description: string
  image: string
  rating: Rating
}

interface Rating {
  count: number
  rate: string
}

export interface ProductsInCart {
  product: IProduct
  quantity: number
}
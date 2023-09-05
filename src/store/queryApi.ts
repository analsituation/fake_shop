import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProduct } from 'types/Product'
import { IUser } from 'types/User'

export const queryApi = createApi({
  reducerPath: 'api/user',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com/'
  }),
  endpoints: build => ({
    loadPartProducts: build.query<IProduct[], number | undefined>({
      query: (limit = 6) => ({
        url: `products?limit=${limit}`
      })
    }),
    loadAllProducts: build.query<IProduct[], void>({
      query: () => ({
        url: 'products'
      })
    }),
    loadCategories: build.query<string[], void>({
      query: () => ({
        url: 'products/categories'
      })
    }),
    loadProduct: build.query<IProduct, number>({
      query: (id: number) => ({
        url: `products/${id}`
      })
    }),
    loadCategory: build.query<IProduct[], string>({
      query: (category: string) => ({
        url: `products/category/${category}`
      })
    }),
    login: build.mutation<{ token: string }, { username: string; password: string }>({
      query: ({ username, password }) => ({
        url: 'auth/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
    }),
    getUsers: build.query<IUser[], void>({
      query: () => ({
        url: 'users'
      })
    })
  })
})

export const {
  useLoginMutation,
  useLoadPartProductsQuery,
  useLazyLoadAllProductsQuery,
  useLoadCategoriesQuery,
  useLoadProductQuery,
  useLazyLoadCategoryQuery,
  useGetUsersQuery
} = queryApi

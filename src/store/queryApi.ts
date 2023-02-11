import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const queryApi = createApi({
  reducerPath: 'api/user',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com/'
  }),
  endpoints: (build) => ({
    loadPartProducts: build.query({
      query: (limit = 6) => ({
        url: `products?limit=${limit}`
      })
    }),
    loadAllProducts: build.query({
      query: () => ({
        url: `products`
      })
    }),
    loadCategories: build.query({
      query: () => ({
        url: `products/categories`
      })
    }),
    loadProduct: build.query({
      query: (id: number) => ({
        url: `products/${id}`
      })
    }),
    loadCategory: build.query({
      query: (category: string) => ({
        url: `products/category/${category}`
      })
    }),
    login: build.mutation({
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
    getUsers: build.query({
      query: () => ({
        url: `users`
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


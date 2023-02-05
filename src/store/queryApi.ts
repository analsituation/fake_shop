import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'api/user',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com/'
  }),
  endpoints: (build) => ({
    products: build.query({
      query: (limit = 10) => ({
        url: `products?limit=${limit}`
      })
    }),
    login: build.mutation({
        query: ({username, password}) => ({
          url: 'auth/login',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body:JSON.stringify({
            username: username,
            password: password
          })
        })
    })
  })
})

export const { useLoginMutation, useProductsQuery } = userApi


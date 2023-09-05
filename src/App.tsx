import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from 'pages/Layout'
import Home from 'pages/Home/Home'
import Costumers from 'pages/Costumers/Costumers'
import ErrorPage from 'pages/ErrorPage'
import LoginPage from 'pages/LoginPage/LoginPage'
import Products from 'pages/Products/Products'
import Product from 'pages/Products/ProductPage/Product'
import RequireAuth from 'hocs/RequireAuth'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index path='/' element={<Home />} />
          <Route
            path='products'
            element={
              <RequireAuth>
                <Products />
              </RequireAuth>
            }
          ></Route>
          <Route
            path='product/:productId'
            element={
              <RequireAuth>
                <Product />
              </RequireAuth>
            }
          />
          <Route path='costumers' element={<Costumers />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home/Home'
import Costumers from './pages/Costumers/Costumers'
import ErrorPage from './pages/ErrorPage'
import LoginPage from './pages/LoginPage/LoginPage'
import RequireAuth from './hocs/RequireAuth'
import Products from './pages/Products/Products'
import Product from './pages/Products/ProductPage/Product'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="products" element={
            <RequireAuth>
              <Products />
            </RequireAuth>
          }>
          </Route>
          <Route path="product/:id" element={<Product />}/>
          <Route path="costumers" element={<Costumers />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
import React from 'react'
import { useAuth } from '../../hooks/useAuth'

const Products = () => {

  useAuth()

  return (
    <div>
      Products
    </div>
  )
}

export default Products
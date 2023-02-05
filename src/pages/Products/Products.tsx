import React from 'react'
import styles from './Products.module.sass'
import ProductCard from './ProductCard'
import Pagination from '../../components/Pagination/Pagination'

const Products = () => {


  return (
    <>
      <div className={styles.product_search}><input type='text' placeholder="Search"/></div>
      <div className={styles.product_sort}>product sort block</div>
      <div className={styles.product_list}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <Pagination />
    </>
  )
}

export default Products
import React from 'react'
import styles from './Products.module.sass'
import ProductCard from './ProductCard'
import Pagination from '../../components/Pagination/Pagination'
import { useProductsQuery } from '../../store/queryApi'
import { IProduct } from '../../types/Product'

const Products = () => {

  const { data, isLoading, error } = useProductsQuery(6)

  return (
    <>

      <div className={styles.filter_block}>
        <div className={styles.product_search}><input type='text' placeholder="Search"/></div>
        <div className={styles.product_sort}>
          <span className={styles.category_item}>jewelery</span>
          <span className={styles.category_item}>electronic</span>
          <span className={styles.category_item}>men&apos;s clothing</span>
          <span className={styles.category_item}>women&apos;s clothing</span>
        </div>
      </div>

      <div className={styles.product_list}>

        {data && data.map((el: IProduct) => (
          <ProductCard key={el.id} product={el}/>
          )
        )}
      </div>
      <div className={styles.pagination_block}>
        <Pagination />
      </div>
    </>
  )
}

export default Products
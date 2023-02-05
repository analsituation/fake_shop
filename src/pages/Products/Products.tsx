import React, { useEffect, useRef } from 'react'
import styles from './Products.module.sass'
import ProductCard from './ProductCard'
import { useLazyLoadAllQuery, useLoadPartQuery } from '../../store/queryApi'
import { IProduct } from '../../types/Product'
import { setProducts } from '../../store/productsSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import CustomBtn from '../../components/CustomBtn/CustomBtn'
import Spinner from '../../components/LoadingSpinner/Spinner'

const Products = () => {

  const dispatch = useAppDispatch()
  const quantity = useAppSelector(state => state.products.quantity)

  let { data, isLoading } = useLoadPartQuery(6)
  const [loadAllProducts, { data: newData, isLoading: newLoading }] = useLazyLoadAllQuery()


  useEffect(() => {
    if (data) {
      dispatch(setProducts(data))
    }
    if (newData) {
      dispatch(setProducts(newData))
    }
  }, [data, newData])




  // const loadline = useRef<any>(null)
  // const observer = useRef<IntersectionObserver | null>(null)
  // useEffect(() => {
  //   const callback = function(entries: any) {
  //     if (entries[0].isIntersecting && quantity) {
  //       loadMoreProducts(quantity + 6)
  //     }
  //   }
  //   observer.current = new IntersectionObserver(callback)
  //   observer.current.observe(loadline.current)
  // }, [])

  return (
    <>

      <div className={styles.filter_block}>
        <div className={styles.product_search}><input type='text' placeholder='Search' /></div>
        <div className={styles.product_sort}>
          <span className={styles.category_item}>jewelery</span>
          <span className={styles.category_item}>electronic</span>
          <span className={styles.category_item}>men&apos;s clothing</span>
          <span className={styles.category_item}>women&apos;s clothing</span>
        </div>
      </div>

      {isLoading && <div className={styles.spinner_wrapper}><Spinner /></div>}

      <div className={styles.product_list}>

        {!newData && data && data.map((el: IProduct) => (
            <ProductCard key={el.id} product={el} />
          )
        )}
        {newData && newData.map((el: IProduct) => (
            <ProductCard key={el.id} product={el} />
          )
        )}

      </div>
      {!newData && !newLoading && !isLoading && <div className={styles.load_all}>
        <CustomBtn text="Load all products" onClick={() => loadAllProducts(null)}/>
      </div>}
      {newLoading && <div className={styles.spinner_wrapper}><Spinner /></div>}

      {/*<div ref={loadline} className={styles.loadline}></div>*/}
    </>
  )
}

export default Products
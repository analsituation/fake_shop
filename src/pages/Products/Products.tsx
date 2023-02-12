import React, { useEffect, useState } from 'react'
import styles from './Products.module.sass'
import ProductCard from './ProductCard'
import {
  useLazyLoadAllProductsQuery,
  useLoadCategoriesQuery,
  useLoadPartProductsQuery
} from '../../store/queryApi'
import { IProduct } from '../../types/Product'
import { filterProducts, setProducts } from '../../store/productsSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import CustomBtn from '../../components/CustomBtn/CustomBtn'
import Spinner from '../../components/LoadingSpinner/Spinner'
import Search from '../../components/Search/Search'
import SortBlock from '../../components/SortBlock/SortBlock'

const Products = () => {

  const dispatch = useAppDispatch()
  const products = useAppSelector(state => state.products.products)
  const productsCart = useAppSelector(state => state.products.productsInCart)
  const filteredProducts = useAppSelector(state => state.products.filteredProducts)
  const { data, isLoading } = useLoadPartProductsQuery(6)
  const { data: categories } = useLoadCategoriesQuery(null)
  const [loadAllProducts, { data: newData, isLoading: newLoading }] = useLazyLoadAllProductsQuery()

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

  const [activeCategories, setActiveCategories] = useState<string[]>([])
  const setCategoryHandler = (e: React.MouseEvent<HTMLSpanElement>, el: string) => {
    if (activeCategories.find(category => category === el)) {
      setActiveCategories(activeCategories.filter(category => category !== el))
    } else {
      setActiveCategories([...activeCategories, el])
    }
  }

  useEffect(() => {
    dispatch(filterProducts(activeCategories))
    conditionalRender()
  }, [activeCategories, newData])

  const conditionalRender = () => {
    if (activeCategories.length === 0) {
      return (
        products.map((product: IProduct) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={productsCart.find(el => el.product.id === product.id)?.quantity}
          />))
      )
    } else if (activeCategories.length && filteredProducts.length) {
      return (
        filteredProducts.map((product: IProduct) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={productsCart.find(el => el.product.id === product.id)?.quantity}
          />))
      )
    } else if (activeCategories.length && filteredProducts.length === 0) {
      return (
        <h3 className={styles.info_message}>
          There are no matching products on this page. Search among all products?
        </h3>
      )
    }
  }

  return (
    <>
      <div className={styles.filter_block}>
        <Search />
        <SortBlock
          categories={categories}
          activeCategories={activeCategories}
          setCategoryHandler={setCategoryHandler}
        />
      </div>

      {isLoading && <div className={styles.spinner_wrapper}><Spinner /></div>}

      <div className={styles.product_list}>
        {conditionalRender()}
      </div>

      {!newData && !newLoading && !isLoading && <div className={styles.load_all}>
        <CustomBtn text='Load all products' onClick={() => loadAllProducts(null)} />
      </div>}

      {newLoading && <div className={styles.spinner_wrapper}><Spinner /></div>}

      {/*<div ref={loadline} className={styles.loadline}></div>*/}
    </>
  )
}

export default Products
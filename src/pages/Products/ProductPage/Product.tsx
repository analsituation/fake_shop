import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineStar } from 'react-icons/ai'
import { SwiperSlide } from 'swiper/react'

import ErrorPage from 'pages/ErrorPage'
import ProductCard from '../ProductCard'
import CustomBtn from 'components/CustomBtn/CustomBtn'
import Spinner from 'components/LoadingSpinner/Spinner'
import SwiperComponent from 'components/Swiper/Swiper'
import { useLazyLoadCategoryQuery, useLoadProductQuery } from 'store/queryApi'
import { addToCart, changeQuantity, removeFromCart } from 'store/productsSlice'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { IProduct } from 'types/Product'

import styles from './Product.module.sass'

const Product = () => {
  const { productId } = useParams()

  if (!productId) {
    return <ErrorPage />
  }

  const { data: product, isLoading: productLoading } = useLoadProductQuery(+productId)

  const [getCategoryProducts, { data: categoryProducts }] = useLazyLoadCategoryQuery()

  const productsForCarousel = categoryProducts ? categoryProducts.filter(product => product.id !== +productId) : []

  const cart = useAppSelector(state => state.products.productsInCart)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (product) {
      getCategoryProducts(product.category)
    }
  }, [product])

  if (!product && !productLoading) {
    return <ErrorPage />
  }

  const minusHandler = (quantity: number) => {
    if (product) {
      if (quantity === 1) {
        dispatch(removeFromCart(product.id))
        return
      }
      if (quantity) {
        dispatch(changeQuantity({ product: product, quantity: quantity - 1 }))
      }
    }
  }

  return (
    <>
      {productLoading && <Spinner />}
      {product && (
        <div className={styles.product_block}>
          <div className={styles.img_wrapper}>
            <img src={product.image} alt={product.title} />
          </div>
          <div className={styles.product_title}>
            <span className={styles.title}>{product.title}</span>
            <span className={styles.rating}>
              Rating: {product.rating.rate}
              <AiOutlineStar />
            </span>
          </div>
          <div className={styles.product_descr}>
            <span className={styles.description_title}>Description:</span>
            <span className={styles.description}>{product.description}</span>
          </div>
          <div className={styles.buy_block}>
            <span className={styles.price}>Price: {product.price} $</span>

            {cart.find(el => el.product.id === product.id) ? (
              <div className={styles.buttons_wrapper}>
                <span
                  className={styles.changeQuantity}
                  onClick={() => minusHandler(cart[cart.findIndex(el => el.product.id === product.id)]?.quantity)}
                >
                  <AiOutlineMinusCircle />
                </span>
                <span className={styles.quantity}>
                  {cart[cart.findIndex(el => el.product.id === product.id)]?.quantity}
                </span>
                <span
                  className={styles.changeQuantity}
                  onClick={() =>
                    dispatch(
                      changeQuantity({
                        product: product,
                        quantity: cart[cart.findIndex(el => el.product.id === product.id)]?.quantity + 1
                      })
                    )
                  }
                >
                  <AiOutlinePlusCircle />
                </span>
              </div>
            ) : (
              <CustomBtn text='Add to cart' onClick={() => dispatch(addToCart(product))} />
            )}
          </div>
        </div>
      )}
      {categoryProducts && (
        <div className={styles.categories}>
          <div className={styles.category_title}>See other products in this category</div>
          <div className={styles.slider_wrapper}>
            <SwiperComponent>
              {productsForCarousel.map((prod: IProduct) => (
                <SwiperSlide key={prod.id} style={{ height: '100% !important' }}>
                  <ProductCard product={prod} isCategory={false} />
                </SwiperSlide>
              ))}
            </SwiperComponent>
          </div>
        </div>
      )}
    </>
  )
}

export default Product

import React, { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useLazyLoadCategoryQuery, useLoadProductQuery } from '../../../store/queryApi'
import styles from './Product.module.sass'
import CustomBtn from '../../../components/CustomBtn/CustomBtn'
import { AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineStar } from 'react-icons/ai'
import Spinner from '../../../components/LoadingSpinner/Spinner'
import Slider from '../../../components/Slider/Slider'
import { IProduct } from '../../../types/Product'
import { addToCart, changeQuantity, removeFromCart } from '../../../store/productsSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'

const Product = () => {

  const params = useParams()
  const { data: product, isLoading: productLoading } = useLoadProductQuery(+params.id!)
  const [getCategoryProducts, { data: categoryProducts }] = useLazyLoadCategoryQuery()
  const cart = useAppSelector(state => state.products.productsInCart)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (product) {
      getCategoryProducts(product.category)
    }
  }, [product])

  const minusHandler = (quantity: number) => {
    if (quantity === 1) {
      dispatch(removeFromCart(product.id))
      return
    }
    if (quantity) {
      dispatch(changeQuantity({ product: product, quantity: quantity - 1 }))
    }
  }

  return (
    <>
      {productLoading && <Spinner />}
      {product &&
        <div className={styles.product_block}>
          <div className={styles.product_image}>
            <div className={styles.img_wrapper}>
              <img src={product.image} alt={product.title} />
            </div>
          </div>
          <div className={styles.product_info}>
            <div className={styles.product_title}>
              <span className={styles.title}>{product.title}</span>
              <span className={styles.rating}>Rating: {product.rating.rate}<AiOutlineStar /></span>
            </div>
            <div className={styles.hidden_image}>
              <div className={styles.img_wrapper}>
                <img src={product.image} alt={product.title} />
              </div>
            </div>
            <div className={styles.product_descr}><span
              className={styles.description}>Description:</span>{product.description}</div>
            <div className={styles.buy_block}>
              <span className={styles.price}>Price: {product.price} $</span>


              {cart.find(el => el.product.id === product.id) ?
                (<div className={styles.buttons_wrapper}>
                  <span className={styles.changeQuantity}
                        onClick={() => minusHandler(cart[cart.findIndex(el => el.product.id === product.id)]?.quantity)}><AiOutlineMinusCircle /></span>
                  <span
                    className={styles.quantity}>{cart[cart.findIndex(el => el.product.id === product.id)]?.quantity}</span>
                  <span className={styles.changeQuantity} onClick={() => dispatch(changeQuantity({
                    product: product,
                    quantity: cart[cart.findIndex(el => el.product.id === product.id)]?.quantity + 1
                  }))}><AiOutlinePlusCircle /></span>
                </div>) : (
                  <CustomBtn text='Add to cart' onClick={() => dispatch(addToCart(product))} />)
              }
            </div>
          </div>
        </div>
      }
      {categoryProducts &&
        <div className={styles.categories}>
          <div className={styles.category_title}>See other products in this category</div>
          <div className='slider_wrapper'>
            <Slider products={categoryProducts as IProduct[]} />
          </div>
        </div>
      }
    </>


  )
}

export default Product
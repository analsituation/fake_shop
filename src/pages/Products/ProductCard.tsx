import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineStar } from 'react-icons/ai'

import CustomBtn from '@components/CustomBtn/CustomBtn'
import { addToCart, changeQuantity, removeFromCart } from '@store/productsSlice'
import { useAppDispatch } from '@hooks/redux'
import { IProduct } from 'customTypes/Product'

import styles from './ProductCard.module.sass'

interface ProductCard {
  product: IProduct
  quantity?: number
  isCategory?: boolean
  isDescription?: boolean
  isBuy?: boolean
}

const ProductCard = ({ product, quantity, isCategory = true, isDescription = true, isBuy = true }: ProductCard) => {
  const dispatch = useAppDispatch()

  const minusHandler = () => {
    if (quantity === 1) {
      dispatch(removeFromCart(product.id))
      return
    }
    if (quantity) {
      dispatch(changeQuantity({ product: product, quantity: quantity - 1 }))
    }
  }

  return (
    <div className={styles.card_item}>
      <div className={styles.top_row}>
        <div className={styles.title}>
          <NavLink className={styles.item_link} to={`/product/${product.id}`}>
            {product.title}
          </NavLink>
        </div>
        {isCategory && (
          <span className={styles.info_block}>
            <span className={styles.category}>{product.category}</span>
            <span className={styles.rating}>
              {product.rating.rate}
              <AiOutlineStar />
            </span>
          </span>
        )}
      </div>
      <div className={styles.card}>
        <img src={product.image} alt={product.title} />
        <div className={styles.content}>
          {isDescription && (
            <div className={styles.description}>
              {product.description.length > 400 ? (
                <>
                  <span className={styles.part_of_desc}>{product.description.slice(0, 400)} ...</span>
                </>
              ) : (
                product.description
              )}
            </div>
          )}
        </div>
      </div>
      <div className={styles.bottom_row}>
        {isDescription && <div className={styles.description_touchscreen}>{product.description}</div>}
        {isBuy && (
          <div className={styles.buy_block_wrapper}>
            <div className={styles.buy_block}>
              {!quantity ? (
                <CustomBtn text='Add to cart' onClick={() => dispatch(addToCart(product))} />
              ) : (
                <div className={styles.buttons_wrapper}>
                  <span className={styles.changeQuantity} onClick={minusHandler}>
                    <AiOutlineMinusCircle />
                  </span>
                  <span className={styles.quantity}>{quantity}</span>
                  <span
                    className={styles.changeQuantity}
                    onClick={() =>
                      dispatch(
                        changeQuantity({
                          product: product,
                          quantity: quantity + 1
                        })
                      )
                    }
                  >
                    <AiOutlinePlusCircle />
                  </span>
                </div>
              )}
              <span className={styles.price}>{product.price}$</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard

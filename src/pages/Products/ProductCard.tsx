import React from 'react'
import styles from './ProductCard.module.sass'
import { IProduct } from '../../types/Product'
import CustomBtn from '../../components/CustomBtn/CustomBtn'
import { addToCart, changeQuantity, removeFromCart } from '../../store/productsSlice'
import { useAppDispatch } from '../../hooks/redux'
import { AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineStar } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'

interface Props {
  product: IProduct
  quantity?: number
  isCategory?: boolean
  isDescription?: boolean
  isBuy?: boolean
}

const ProductCard = ({ product, quantity, isCategory = true, isDescription = true, isBuy = true }: Props) => {

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
      <div className={styles.title}>
        <NavLink className={styles.item_link} to={`/product/${product.id}`}>{product.title}</NavLink>
      </div>
      {isCategory &&
        <span className={styles.info_clock}>
        <span className={styles.category}>{product.category}</span>
        <span className={styles.rating}>{product.rating.rate}<AiOutlineStar /></span>
      </span>
      }
      <div className={styles.image}>
        <img src={product.image} alt={product.title} />
      </div>
      {isDescription &&
        <div className={styles.description}>
          {product.description.length > 150 ?
            (
              <>
                <span className={styles.part_of_desc}>{product.description.slice(0, 130)}</span><span
                className={styles.show_desc}> ...read more</span>
                <span className={styles.long_desc_content}>{product.description}</span>
              </>
            ) : (product.description)
          }
        </div>
      }
      {isBuy &&
        <div className={styles.buy_block_wrapper}>
          <div className={styles.buy_block}>
            {!quantity ? <CustomBtn text='BUY' onClick={() => dispatch(addToCart(product))} /> : (
              <div className={styles.buttons_wrapper}>
                <span className={styles.changeQuantity} onClick={minusHandler}><AiOutlineMinusCircle /></span>
                <span className={styles.quantity}>{quantity}</span>
                <span className={styles.changeQuantity} onClick={() => dispatch(changeQuantity({
                  product: product,
                  quantity: quantity + 1
                }))}><AiOutlinePlusCircle /></span>
              </div>
            )
            }
            <span className={styles.price}>
            {product.price}$
          </span>
          </div>
        </div>}
    </div>
  )
}

export default ProductCard
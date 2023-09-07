import React, { FC, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineClose } from 'react-icons/md'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import clsx from 'clsx'

import CustomBtn from '@components/CustomBtn/CustomBtn'
import { changeQuantity, removeFromCart } from '@store/productsSlice'
import { useAppDispatch } from '@hooks/redux'
import { useOutsideClick } from '@hooks/useOutside'
import { ProductsInCart } from 'customTypes/Product'

import styles from './ProductCart.module.sass'

interface TooltipProps {
  cart: ProductsInCart[]
  opened: boolean
  triggerRef?: React.RefObject<HTMLElement>
  onClose: () => void
}

const ProductCart: FC<TooltipProps> = ({ opened, triggerRef, onClose, cart }) => {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  useOutsideClick({
    elementRef: tooltipRef,
    triggerRef,
    onOutsideClick: onClose,
    enabled: opened
  })

  const minusHandler = (cardItem: ProductsInCart) => {
    if (cardItem.quantity === 1) {
      dispatch(removeFromCart(cardItem.product.id))
    }
    dispatch(changeQuantity({ product: cardItem.product, quantity: cardItem.quantity - 1 }))
  }

  if (!opened) return null

  return (
    <div ref={tooltipRef} className={clsx(styles.drop_menu, opened && styles.cart_active)}>
      <span className={styles.close_button} onClick={onClose}>
        <MdOutlineClose />
      </span>
      {cart.length ? (
        <>
          <ul>
            {cart.map((cardItem: ProductsInCart) => (
              <li className={styles.cart_item} key={cardItem.product.id}>
                <div>
                  <div className={styles.buttons_wrapper}>
                    <span className={styles.changeQuantity} onClick={() => minusHandler(cardItem)}>
                      <AiOutlineMinusCircle />
                    </span>
                    <span className={styles.quantity}>{cardItem.quantity}</span>
                    <span
                      className={styles.changeQuantity}
                      onClick={() =>
                        dispatch(
                          changeQuantity({
                            product: cardItem.product,
                            quantity: cardItem.quantity + 1
                          })
                        )
                      }
                    >
                      <AiOutlinePlusCircle />
                    </span>
                  </div>
                  <div className={styles.cost}>{(+cardItem.product.price * cardItem.quantity).toFixed(2)} $</div>
                </div>
                <NavLink className={styles.item_link} onClick={onClose} to={`/product/${cardItem.product.id}`}>
                  <div className={styles.info_block}>
                    <div className={styles.item_img}>
                      <img src={cardItem.product.image} alt={cardItem.product.title} />
                    </div>
                    <span>{cardItem.product.title}</span>
                  </div>
                </NavLink>
                <span className={styles.delete_product} onClick={() => dispatch(removeFromCart(cardItem.product.id))}>
                  delete
                </span>
              </li>
            ))}
          </ul>
          <div className={styles.checkout_block}>
            <span>TOTAL: {cart.reduce((total, el) => total + el.quantity * +el.product.price, 0).toFixed(2)} $</span>
            <CustomBtn text='Checkout' classname={styles.button_class} />
          </div>
        </>
      ) : (
        <p>Cart is empty</p>
      )}
    </div>
  )
}
export default ProductCart

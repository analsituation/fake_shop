import React, { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { NavLink } from 'react-router-dom'
import { SlBasket, SlBasketLoaded } from 'react-icons/sl'
import { MdOutlineClose } from 'react-icons/md'

import { logout } from '../store/authSlice'
import CustomBtn from './CustomBtn/CustomBtn'
import { IProduct, ProductsInCart } from '../types/Product'
import styles from './Header.module.sass'
import { changeQuantity, removeFromCart } from '../store/productsSlice'


interface Props {
  setVisible: (arg: boolean) => void
}

const Header = ({ setVisible }: Props) => {

  const { username, isAuth } = useAppSelector(state => state.main)
  const cart = useAppSelector(state => state.products.prodsInCart)
  const products = useAppSelector(state => state.products.products)
  const dispatch = useAppDispatch()
  const [cartVisible, setCartVisible] = useState(false)

  const minusHandler = (cardItem: ProductsInCart) => {
    if (cardItem.quantity === 1) {
      dispatch(removeFromCart(cardItem.productId))
    }
    dispatch(changeQuantity({ productId: cardItem.productId, quantity: cardItem.quantity - 1 }))
  }

  return (
    <header className={styles.container}>

      <div className={styles.logo}>
        Fake shop
      </div>

      <nav className={styles.nav}>
        <ul>
          <li className={styles.link_element}><NavLink to='/'>Home</NavLink></li>
          <li className={styles.link_element}><NavLink to='products'>Products</NavLink></li>
          <li className={styles.link_element}><NavLink to='costumers'>Our Costumers</NavLink></li>
        </ul>
      </nav>

      <div className={styles.user_block}>
        <div className={styles.basket} onClick={() => setCartVisible(!cartVisible)}>
          {cart.length ? (
            <>
              <SlBasketLoaded />
              <span className={styles.count}>
                {cart.length}
              </span>
            </>
          ) : <SlBasket />}
        </div>
        <div
          className={cartVisible ? [styles.drop_menu, styles.cart_active].join(' ') : styles.drop_menu}
        >
          <span className={styles.close_button} onClick={() => setCartVisible(false)}><MdOutlineClose /></span>
          {
            cart.length ? (
              <>
                <ul>
                  {cart.map((cardItem: ProductsInCart) => (
                    <li className={styles.cart_item} key={cardItem.productId}>

                      <span onClick={() => minusHandler(cardItem)}>-</span>
                      {cardItem.quantity}
                      <span onClick={() => dispatch(changeQuantity({
                        productId: cardItem.productId,
                        quantity: cardItem.quantity + 1
                      }))}>+</span>

                      <NavLink to='/product/id'>{products[cardItem.productId].title}</NavLink>
                      <span
                        className={styles.delete_product}
                        onClick={() => dispatch(removeFromCart(cardItem.productId))}
                      >delete</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.checkout_button}>
                  <CustomBtn text='Checkout' />
                </div>
              </>
            ) : <p>Your cart is empty ???!! Why</p>
          }

        </div>
        {isAuth ? (
          <>
            <div className={styles.user_wrapper}>
              <img className={styles.user_photo} src='https://avatars.githubusercontent.com/u/97411966?v=4' alt='alt' />
              <div className={styles.username}>
                {username}
              </div>
              <span className={styles.button_wrapper}>
                <CustomBtn text='Logout'
                           onClick={() => dispatch(logout())}
                />
              </span>
            </div>
          </>
        ) : (
          <CustomBtn text='Login' onClick={() => setVisible(true)} />
        )}

      </div>
    </header>
  )
}

export default Header
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { NavLink } from 'react-router-dom'
import { SlBasket, SlBasketLoaded } from 'react-icons/sl'
import { MdOutlineClose } from 'react-icons/md'

import { logout } from '../store/authSlice'
import CustomBtn from './CustomBtn/CustomBtn'
import { ProductsInCart } from '../types/Product'
import styles from './Header.module.sass'
import { changeQuantity, removeFromCart } from '../store/productsSlice'
import { useLazyLoadProductQuery } from '../store/queryApi'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'


interface Props {
  setVisible: (arg: boolean) => void
}

const Header = ({ setVisible }: Props) => {

  const { username, isAuth } = useAppSelector(state => state.main)
  const cart = useAppSelector(state => state.products.productsInCart)
  const dispatch = useAppDispatch()
  const [cartVisible, setCartVisible] = useState(false)

  const minusHandler = (cardItem: ProductsInCart) => {
    if (cardItem.quantity === 1) {
      dispatch(removeFromCart(cardItem.product.id))
    }
    dispatch(changeQuantity({ product: cardItem.product, quantity: cardItem.quantity - 1 }))
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
                    <li className={styles.cart_item} key={cardItem.product.id}>

                      <div>
                        <div className={styles.buttons_wrapper}>
                        <span className={styles.changeQuantity}
                              onClick={() => minusHandler(cardItem)}><AiOutlineMinusCircle /></span>
                          <span className={styles.quantity}>{cardItem.quantity}</span>
                          <span className={styles.changeQuantity} onClick={() => dispatch(changeQuantity({
                            product: cardItem.product,
                            quantity: cardItem.quantity + 1
                          }))}><AiOutlinePlusCircle /></span>
                        </div>
                        <div className={styles.cost}>
                          {+cardItem.product.price * cardItem.quantity} $
                        </div>
                      </div>
                      <NavLink className={styles.item_link} to='/product/id'>{cardItem.product.title}</NavLink>
                      <span
                        className={styles.delete_product}
                        onClick={() => dispatch(removeFromCart(cardItem.product.id))}
                      >delete</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.checkout_block}>
                  <span>TOTAL: {cart.reduce((total, el) => (total + el.quantity * +el.product.price), 0)} $</span>
                  <CustomBtn text='Checkout' classname={styles.button_class}/>
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
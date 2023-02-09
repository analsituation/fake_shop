import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { NavLink } from 'react-router-dom'
import { SlBasket, SlBasketLoaded } from 'react-icons/sl'
import { MdOutlineClose } from 'react-icons/md'

import { logout } from '../store/authSlice'
import CustomBtn from './CustomBtn/CustomBtn'
import { IProduct, ProductsInCart } from '../types/Product'
import styles from './Header.module.sass'
import { changeQuantity, removeFromCart } from '../store/productsSlice'
import { useLazyLoadProductQuery } from '../store/queryApi'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'


interface Props {
  setVisible: (arg: boolean) => void
}

const Header = ({ setVisible }: Props) => {

  const [loadProduct, {data}] = useLazyLoadProductQuery()
  const { username, isAuth } = useAppSelector(state => state.main)
  const cart = useAppSelector(state => state.products.productsInCart)
  const products = useAppSelector(state => state.products.products)
  const dispatch = useAppDispatch()
  const [cartVisible, setCartVisible] = useState(false)

  const minusHandler = (cardItem: ProductsInCart) => {
    if (cardItem.quantity === 1) {
      dispatch(removeFromCart(cardItem.productId))
    }
    dispatch(changeQuantity({ productId: cardItem.productId, quantity: cardItem.quantity - 1 }))
  }

  // function getInd(products: IProduct[], cardItemId: number) {
  //   const index = products.find((el, index) => {
  //     if (el.id === cardItemId) return index
  //   })
  //   return index
  // }
  //
  // const aboba = getInd(products, cardItemId)


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

                      <div className={styles.buttons_wrapper}>
                        <span className={styles.changeQuantity} onClick={() => minusHandler(cardItem)}><AiOutlineMinusCircle /></span>
                        <span className={styles.quantity}>{cardItem.quantity}</span>
                        <span className={styles.changeQuantity} onClick={() => dispatch(changeQuantity({
                          productId: cardItem.productId,
                          quantity: cardItem.quantity + 1
                        }))}><AiOutlinePlusCircle /></span>
                      </div>

                        {/*<NavLink to='/product/id'>{products[cardItem.productId]?.title}</NavLink>*/}
                        <NavLink className={styles.item_link} to='/product/id'>{products[products.findIndex(el => el.id === cardItem.productId)]?.title}</NavLink>

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
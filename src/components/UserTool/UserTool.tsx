import React, { FC, PropsWithChildren, useRef, useState } from 'react'
import { SlBasket, SlBasketLoaded } from 'react-icons/sl'

import ProductCart from 'components/ProductCart/ProductCart'
import { logout } from 'store/authSlice'
import { useAppDispatch } from 'hooks/redux'
import { ProductsInCart } from 'types/Product'

import styles from './UserTool.module.sass'

interface UserToolProps {
  isAuth: boolean
  cart: ProductsInCart[]
}

const UserTool: FC<PropsWithChildren<UserToolProps>> = ({ children, isAuth, cart }) => {
  const cartRef = useRef<HTMLDivElement>(null)
  const [cartVisible, setCartVisible] = useState(false)

  const dispatch = useAppDispatch()

  const onClose = () => {
    setCartVisible(false)
  }

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div className={styles.user_tool}>
      <div className={styles.wrapper}>
        {children}
        <div className={styles.spacer}></div>
        <div className={styles.divider}></div>
        <div
          className={styles.inner_div}
          data-tooltip='cart'
          tabIndex={0}
          ref={cartRef}
          onClick={() => {
            if (isAuth) {
              setCartVisible(v => !v)
            }
          }}
        >
          <div className={styles.icon}>
            <div className={styles.basket}>
              {cart.length && isAuth ? (
                <>
                  <SlBasketLoaded />
                  <span className={styles.count}>{cart.length}</span>
                </>
              ) : (
                <SlBasket />
              )}
              {/* <span className={clsx(styles.tooltip, tooltip && styles.tooltip_active)}>Login please</span> */}
            </div>
          </div>
          <span className={styles.button_title}>Cart</span>
        </div>
        <div className={styles.inner_div} data-tooltip='Log out' tabIndex={0} onClick={logoutHandler}>
          <div className={styles.icon}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='1'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
          <span className={styles.button_title}>Logout</span>
        </div>
      </div>
      <ProductCart opened={cartVisible} onClose={onClose} cart={cart} />
    </div>
  )
}
export default UserTool

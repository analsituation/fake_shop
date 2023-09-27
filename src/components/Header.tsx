import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import CustomBtn from './CustomBtn/CustomBtn'
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher'
import UserTool from './UserTool/UserTool'
import { useTheme } from '@hooks/useTheme'
import { useAppSelector } from '@hooks/redux'

import styles from './Header.module.sass'
import { clsx } from 'clsx'

interface Props {
  setVisible: (arg: boolean) => void
}

const Header = ({ setVisible }: Props) => {
  const { theme, setTheme } = useTheme()
  const changeTheme = () => setTheme()

  const [tooltip, setTooltip] = useState(false)
  const [menuShow, setMenuShow] = useState(false)

  const { username, isAuth } = useAppSelector(state => state.auth)
  const cart = useAppSelector(state => state.products.productsInCart)

  useEffect(() => {
    setTimeout(() => {
      setTooltip(false)
    }, 500)
  }, [tooltip])

  useEffect(() => {
    document.documentElement.setAttribute('scroll-block', menuShow.toString())
  }, [menuShow])

  return (
    <>
      <header className={styles.container}>
        <div className={styles.header_mobile_row}>
          <div className={styles.mobile_logo}>Fake shop</div>
          <div className='flex gap-2 items-center'>
            <ThemeSwitcher hide={menuShow} checked={theme === 'dark' ? true : false} onchange={changeTheme} />
            <div
              onClick={() => setMenuShow(prev => !prev)}
              className={clsx(styles.nav__menu, menuShow && styles.nav__menu_active)}
            >
              <div className={clsx(styles.nav__bar, styles.nav__bar_1)}></div>
              <div className={clsx(styles.nav__bar, styles.nav__bar_2)}></div>
              <div className={clsx(styles.nav__bar, styles.nav__bar_3)}></div>
            </div>
          </div>
        </div>

        <div id='portal_id' className={clsx(styles.header_row, menuShow && styles.active)}>
          <div className={styles.logo}>Fake shop</div>

          <nav className={styles.nav}>
            <ul>
              <li className={styles.link_element}>
                <NavLink onClick={() => setMenuShow(false)} to='/'>
                  Home
                </NavLink>
              </li>
              <li className={styles.link_element}>
                <NavLink onClick={() => setMenuShow(false)} to='products'>
                  Products
                </NavLink>
              </li>
              <li className={styles.link_element}>
                <NavLink onClick={() => setMenuShow(false)} to='costumers'>
                  Community
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className={styles.user_block}>
            <ThemeSwitcher hide={menuShow} checked={theme === 'dark' ? true : false} onchange={changeTheme} />

            {isAuth ? (
              <>
                <UserTool setMenuShow={setMenuShow} isAuth={isAuth} cart={cart}></UserTool>
              </>
            ) : (
              <CustomBtn
                text='Login'
                classname={styles.login_button}
                onClick={() => {
                  setVisible(true)
                  setMenuShow(false)
                }}
              />
            )}
          </div>
        </div>
      </header>
      <div onClick={() => setMenuShow(prev => !prev)} className={clsx(styles.overlay, menuShow && styles.active)}></div>
    </>
  )
}

export default Header

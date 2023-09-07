import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import CustomBtn from './CustomBtn/CustomBtn'
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher'
import UserTool from './UserTool/UserTool'
import { useTheme } from '@hooks/useTheme'
import { useAppSelector } from '@hooks/redux'

import styles from './Header.module.sass'

interface Props {
  setVisible: (arg: boolean) => void
}

const Header = ({ setVisible }: Props) => {
  const { theme, setTheme } = useTheme()
  const changeTheme = () => setTheme()

  const [tooltip, setTooltip] = useState(false)

  const { username, isAuth } = useAppSelector(state => state.auth)
  const cart = useAppSelector(state => state.products.productsInCart)

  useEffect(() => {
    setTimeout(() => {
      setTooltip(false)
    }, 500)
  }, [tooltip])

  return (
    <header className={styles.container}>
      <div className={styles.header_row}>
        <div className={styles.logo}>Fake shop</div>

        <nav className={styles.nav}>
          <ul>
            <li className={styles.link_element}>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li className={styles.link_element}>
              <NavLink to='products'>Products</NavLink>
            </li>
            <li className={styles.link_element}>
              <NavLink to='costumers'>Community</NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.user_block}>
          <ThemeSwitcher checked={theme === 'dark' ? true : false} onchange={changeTheme} />

          {isAuth ? (
            <>
              <UserTool isAuth={isAuth} cart={cart}></UserTool>
            </>
          ) : (
            <CustomBtn text='Login' classname={styles.login_button} onClick={() => setVisible(true)} />
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

import React from 'react'
import styles from './Header.module.sass'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'

const Header = () => {

  const username = useAppSelector(state => state.main.username)

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
          <img className={styles.user_photo} src='https://avatars.githubusercontent.com/u/97411966?v=4' alt='alt' />
          <div className={styles.username}>
            <NavLink to='login'>{username}</NavLink>
          </div>
        </div>
    </header>
  )
}

export default Header
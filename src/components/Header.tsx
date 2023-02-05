import React from 'react'
import styles from './Header.module.sass'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import CustomBtn from './CustomBtn/CustomBtn'
import { logout } from '../store/authSlice'

interface Props {
  setVisible: (arg: boolean) => void
}

const Header = ({ setVisible }: Props) => {

  const { username, isAuth } = useAppSelector(state => state.main)
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(logout())
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
        {isAuth ? (
          <>
            <div className={styles.user_wrapper}>
              <img className={styles.user_photo} src='https://avatars.githubusercontent.com/u/97411966?v=4' alt='alt' />
              <div className={styles.username}>
                <NavLink to='login'>{username}</NavLink>
              </div>
            </div>
            <div className={styles.drop_menu}>
              <p>Some userinfo here later..</p>
              <CustomBtn text="Logout" onClick={() => dispatch(logout())}/>
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
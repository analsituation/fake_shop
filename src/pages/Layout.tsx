import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import styles from './Main.module.sass'

const Layout = () => {
  return (
    <div className={styles.app_wrapper}>
      <div className={styles.container}>
        <Header />
        <div className={styles.content_wrapper}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
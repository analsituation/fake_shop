import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import styles from './Main.module.sass'
import LoginForm from '../components/LoginForm/LoginForm'
import Modal from '../components/ModalWindow/Modal'
import { useAppSelector } from '../hooks/redux'

const Layout = () => {

  const [modal, setModal] = useState(false)
  const isAuth = useAppSelector(state => state.main.isAuth)
  const location = useLocation()

  useEffect(() => {
    setModal(false)
  }, [isAuth, location])

  return (
    <div className={styles.app_wrapper}>
      <div className={styles.container}>
        {
          modal &&
          <Modal formName="Log in form"
                 formDescription={<div>Data for authorization is located on <NavLink to='/login'>/login</NavLink>. Check this out</div>}
                 setModal={setModal}>
            <LoginForm />
          </Modal>
        }
        <Header setVisible={setModal} />
        <div className={styles.content_wrapper}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
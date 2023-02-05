import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import styles from './Main.module.sass'
import LoginForm from '../components/LoginForm/LoginForm'
import Modal from '../components/ModalWindow/Modal'
import { useAppSelector } from '../hooks/redux'

const Layout = () => {

  const [modal, setModal] = useState(false)
  const isAuth = useAppSelector(state => state.main.isAuth)

  useEffect(() => {
    setModal(false)
  }, [isAuth])

  return (
    <div className={styles.app_wrapper}>
      <div className={styles.container}>
        {
          modal && <Modal setModal={setModal}>
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
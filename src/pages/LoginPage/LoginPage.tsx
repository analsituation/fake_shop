import React, { useState } from 'react'
import LoginForm from '../../components/LoginForm'
import styles from './LoginPage.module.sass'

const LoginPage = () => {

  return (
    <div className={styles.login_block}>
      <LoginForm />
    </div>
  )
}

export default LoginPage
import React, { useState } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import styles from './LoginPage.module.sass'
import { useAppSelector } from '../../hooks/redux'
import { Navigate } from 'react-router-dom'

const LoginPage = () => {

  const isAuth = useAppSelector(state => state.main.isAuth)

  if (isAuth) return <Navigate to="/"/>

  return (
    <div className={styles.login_block}>
      <h3 className="text-2xl">Login page</h3>
      <div className="mb-2">
        for login use one of these pairs of username and password from
        <a href='https://fakestoreapi.com/'>fakestoreapi.com</a>
      </div>
      <div>username : johnd , password : m38rmF$</div>
      <div>username : mor_2314 , password : 83r5^_</div>
      <div>username : kevinryan , password : kev02937@</div>
      <div>username : donero , password : ewedon</div>
      <div>username : derek , password : jklg*_56</div>
      <div>username : david_r , password : 3478*#54</div>
      <div>username : snyder , password : f238&@*$</div>
      <div>username : hopkins , password : William56$hj</div>
      <div>username : kate_h , password : kfejk@*_</div>
      <div>username : johnd , password : m38rmF$</div>
      <div className="mb-5">username : jimmie_k , password : klein*#%*</div>
      <LoginForm />
    </div>
  )
}

export default LoginPage
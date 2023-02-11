import React, { useState } from 'react'
import styles from './LoginForm.module.sass'
import { useLoginMutation } from '../../store/queryApi'
import { login } from '../../store/authSlice'
import { useAppDispatch } from '../../hooks/redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../LoadingSpinner/Spinner'

const LoginForm = () => {

  const dispatch = useAppDispatch()
  const [loginData, setLoginData] = useState({ username: '', password: '', token: ''})
  const [loginRequest, { isLoading }] = useLoginMutation()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const authorize = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const data = await loginRequest(loginData).unwrap()
      if (data['token']) {
        dispatch(login({ ...loginData, token: data.token }))
        setLoginData({ username: '', password: '', token: ''})
        navigate('/', {replace: true})
      }
    } catch (e: any) {
      setError(e.data)
    }
  }

  return (
    <>
      {error}
      <form className={styles.form}>
        <input className={styles.input}
               type='text'
               placeholder='username'
               value={loginData.username}
               onChange={e => setLoginData({ ...loginData, username: e.currentTarget.value })}
        />
        <input className={styles.input}
               type='password'
               placeholder='password'
               value={loginData.password}
               onChange={e => setLoginData({ ...loginData, password: e.currentTarget.value })}
        />
        <button onClick={authorize} className={styles.btn}>
          Login
        </button>
      </form>
      {isLoading &&
        <div className={styles.loading_block}><Spinner /></div>
      }
    </>

  )
}

export default LoginForm
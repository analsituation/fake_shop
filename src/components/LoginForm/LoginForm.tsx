import React, { useState } from 'react'
import { AiOutlineLock } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'

import Spinner from '../LoadingSpinner/Spinner'
import { useLoginMutation } from 'store/queryApi'
import { login } from 'store/authSlice'
import { useAppDispatch } from 'hooks/redux'

import styles from './LoginForm.module.sass'

class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const [loginData, setLoginData] = useState({ username: '', password: '', token: '' })
  const [loginRequest, { isLoading }] = useLoginMutation()
  const [error, setError] = useState<string>('')

  const authorize = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      if (!loginData.username) {
        throw new ValidationError('Gde imya')
      }
      if (!loginData.password) {
        throw new ValidationError('Gde password')
      }

      const data = await loginRequest(loginData).unwrap()
      if (data['token']) {
        dispatch(login({ ...loginData, token: data.token }))
        // if (state.from.pathname) {
        //   console.log('if', state)
        //   navigate('/products', { replace: true })
        // } else {
        //   console.log('else', state)
        //   navigate('/', { replace: true })
        // }
      }
    } catch (e: any) {
      if (e instanceof ValidationError) {
        setError(e.message)
      } else {
        setError(e.data)
      }
    }
  }

  return (
    <>
      <form className={styles.form}>
        <div className={styles.fields_wrapper}>
          <div className={styles.form_group}>
            <input
              type='email'
              name='logemail'
              className={styles.form_style}
              id='logemail'
              autoComplete='off'
              placeholder='Username'
              value={loginData.username}
              onChange={e => setLoginData({ ...loginData, username: e.currentTarget.value })}
            />
            <i className={styles.input_icon}>
              <AiOutlineUser />
            </i>
          </div>
          <div className={styles.form_group}>
            <input
              type='password'
              name='logpass'
              className={styles.form_style}
              id='logpass'
              autoComplete='off'
              placeholder='Password'
              value={loginData.password}
              onChange={e => setLoginData({ ...loginData, password: e.currentTarget.value })}
            />
            <i className={styles.input_icon}>
              <AiOutlineLock />
            </i>
          </div>
          {error && <span className={styles.error_message}>{error}</span>}
        </div>

        <div className={styles.btn_wrapper}>
          <button className={styles.btn} onClick={authorize}>
            Login
          </button>
        </div>
      </form>
      {isLoading && (
        <div className={styles.loading_block}>
          <Spinner />
        </div>
      )}
    </>
  )
}

export default LoginForm

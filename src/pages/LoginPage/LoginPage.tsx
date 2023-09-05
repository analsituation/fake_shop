import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import LoginForm from 'components/LoginForm/LoginForm'
import Spinner from 'components/LoadingSpinner/Spinner'
import { useGetUsersQuery } from 'store/queryApi'
import { useAppSelector } from 'hooks/redux'
import { IUser } from 'types/User'

import styles from './LoginPage.module.sass'

const LoginPage = () => {
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const { data, isLoading } = useGetUsersQuery()
  const { state } = useLocation()

  if (isAuth) return <Navigate to={state ? state.from.pathname : '/'} />

  return (
    <div className={styles.login_block}>
      <h3 className={styles.page_title}>Login page</h3>
      <div className={styles.page_info}>
        For authorization, you can use the following pairs of logins and passwords. This is data from{' '}
        <a className={styles.api_link} href='https://fakestoreapi.com/'>
          fakestoreapi.com
        </a>
      </div>
      {isLoading && (
        <div className='mt-10'>
          <Spinner />
        </div>
      )}
      {data && (
        <div className={styles.inner_block}>
          <div className={styles.usersdata_wrapper}>
            <div className={styles.titles}>
              <span>Usernames</span>
              <span>Passwords</span>
            </div>
            {data.map((user: IUser) => (
              <div className={styles.userdata_items} key={user.username}>
                <span>{user.username}</span>
                <span>{user.password}</span>
              </div>
            ))}
          </div>
          <div className={styles.form_wrapper}>
            <LoginForm />
          </div>
        </div>
      )}
    </div>
  )
}

export default LoginPage

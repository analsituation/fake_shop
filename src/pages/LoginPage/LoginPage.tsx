import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import styles from './LoginPage.module.sass'
import { useAppSelector } from '../../hooks/redux'
import { Navigate } from 'react-router-dom'
import { useGetUsersQuery } from '../../store/queryApi'
import { IUser } from '../../types/User'
import Spinner from '../../components/LoadingSpinner/Spinner'

const LoginPage = () => {

  const isAuth = useAppSelector(state => state.auth.isAuth)
  const { data, isLoading } = useGetUsersQuery(null)

  if (isAuth) return <Navigate to='/' />

  return (
    <div className={styles.login_block}>
      <h3 className={styles.page_title}>Login page</h3>
      <div className={styles.page_info}>
        For login use one of these pairs of username and password from
        <a className='text-cyan-700' href='https://fakestoreapi.com/'> fakestoreapi.com</a>
      </div>
      {isLoading && <div className='text-center mt-10'><Spinner /></div>}
      {data &&
        <div className={styles.inner_block}>
          <div className={styles.usersdata_wrapper}>
            <div className={styles.titles}>
              <span>Usernames</span><span>Passwords</span>
            </div>
            {data.map((user: IUser) => (
              <div className={styles.userdata_items} key={user.username}>
                <span>{user.username}</span><span>{user.password}</span>
              </div>
            ))}
          </div>
          <div className={styles.form_wrapper}>
            <LoginForm />
          </div>
        </div>}
    </div>
  )
}

export default LoginPage
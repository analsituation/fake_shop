import React from 'react'

import welcome from 'assets/welcome.gif'

import styles from './Home.module.sass'

const Home = () => {
  return (
    <div className='text-center font-medium'>
      <h3 className={styles.page_title}>Home page</h3>
      <div className={styles.welcome}>
        <div>Huge welcome. All the functionality concentrated in products page. You need to login to get there.</div>
        <img src={welcome} alt='welcome' />
      </div>
    </div>
  )
}

export default Home

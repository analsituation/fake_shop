import React, { useState } from 'react'

import welcome from '@assets/welcome.gif'

import styles from './Home.module.sass'
import clsx from 'clsx'

const Home = () => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className='text-center font-medium'>
      <h3 className={styles.page_title}>Home page</h3>
      <div className={styles.welcome}>
        <div>Huge welcome. All the functionality concentrated in products page. You need to login to get there.</div>
        {!loaded && <div className={styles.skeleton}></div>}
        <img src={welcome} alt='welcome' className={clsx(!loaded && styles.hidden)} onLoad={() => setLoaded(true)} />
      </div>
    </div>
  )
}

export default Home

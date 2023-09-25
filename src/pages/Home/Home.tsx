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
        {!loaded && (
          <div className='my-8 mx-auto w-[640px] h-[476px] bg-[#5f8f7a] rounded-md overflow-hidden animate-pulse opacity-5'></div>
        )}
        <img src={welcome} alt='welcome' className={clsx(!loaded && 'hidden')} onLoad={() => setLoaded(true)} />
      </div>
    </div>
  )
}

export default Home

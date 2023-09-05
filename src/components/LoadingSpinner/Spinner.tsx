import React from 'react'
import clsx from 'clsx'

import styles from './Spinner.module.sass'

const Spinner = () => {
  return (
    <div className={styles.spinner_container}>
      <div className={styles.page_preloader} id='page-preloader'>
        <span className={clsx(styles.preloader__item, styles.preloader__item1)}></span>
        <span className={clsx(styles.preloader__item, styles.preloader__item2)}></span>
        <span className={clsx(styles.preloader__item, styles.preloader__item3)}></span>
        <span className={clsx(styles.preloader__item, styles.preloader__item4)}></span>
      </div>
    </div>
  )
}

export default Spinner

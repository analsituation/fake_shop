import React from 'react'
import styles from './Spinner.module.sass'

const Spinner = () => {
  return (
    <>
      <div className={styles.ldsRoller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  )
}

export default Spinner
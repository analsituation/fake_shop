import React from 'react'
import styles from './CustomBtn.module.sass'

type Props = {
  text: string
  onClick?: () => void
};

export function CustomBtn({text, onClick}: Props) {
  return (
    <button className={styles.custom_button} onClick={onClick}>
      {text}
    </button>
  )
}

export default CustomBtn
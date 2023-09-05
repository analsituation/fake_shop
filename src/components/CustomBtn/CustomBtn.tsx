import React from 'react'

import styles from './CustomBtn.module.sass'

type Props = {
  text: string
  onClick?: () => void
  classname?: string
}

export function CustomBtn({ text, onClick, classname }: Props) {
  return (
    <button className={[styles.custom_button, classname].join(' ')} onClick={onClick}>
      {text}
    </button>
  )
}

export default CustomBtn

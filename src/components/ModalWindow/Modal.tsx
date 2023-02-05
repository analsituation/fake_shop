import React from 'react'
import styles from './Modal.module.sass'

interface Props {
  children: JSX.Element
  setModal: (arg: boolean) => void
}

export function Modal({children, setModal}: Props) {

  const closeModal = (e:  React.MouseEvent<HTMLSpanElement>) => {
    setModal(false)
  }

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal_window} onClick={e => e.stopPropagation()}>
        <span className={styles.close_button} onClick={closeModal}>X</span>
        {children}
      </div>
    </div>
  )
}

export default Modal
import React, { FC, PropsWithChildren } from 'react'
import { MdOutlineClose } from 'react-icons/md'

import styles from './Modal.module.sass'

const Modal: FC<
  PropsWithChildren<{ formName: string; formDescription: string | JSX.Element; setModal: (arg: boolean) => void }>
> = ({ formName, formDescription, setModal, children }) => {
  const closeModal = (e: React.MouseEvent<HTMLSpanElement>) => {
    setModal(false)
  }

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal_window} onClick={e => e.stopPropagation()}>
        <div className={styles.top_row}>
          <div className={styles.form_title}>{formName}</div>
          <span className={styles.close_button} onClick={closeModal}>
            <MdOutlineClose />
          </span>
        </div>
        {children}
        <div className={styles.form_text}>{formDescription}</div>
      </div>
    </div>
  )
}

export default Modal

import React, { FC } from 'react'

import styles from './ThemeSwitcher.module.sass'

interface ThemeSwitcherProps {
  checked: boolean
  onchange: () => void
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ checked, onchange }) => {
  return (
    <div className={styles.toggle}>
      <input type='checkbox' id='toggle' checked={checked} onChange={onchange} />
      <label htmlFor='toggle' />
    </div>
  )
}
export default ThemeSwitcher

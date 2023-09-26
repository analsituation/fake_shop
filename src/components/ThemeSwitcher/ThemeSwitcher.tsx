import React, { FC } from 'react'

import styles from './ThemeSwitcher.module.sass'
import clsx from 'clsx'

interface ThemeSwitcherProps {
  checked: boolean
  hide: boolean
  onchange: () => void
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ checked, hide, onchange }) => {
  return (
    <div className={clsx(styles.toggle, hide && styles.hidden)}>
      <input type='checkbox' id='toggle' checked={checked} onChange={onchange} />
      <label htmlFor='toggle' />
    </div>
  )
}
export default ThemeSwitcher

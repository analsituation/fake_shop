import { useLayoutEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './redux'
import { changeTheme } from 'store/themeSlice'

export const useTheme = () => {
  // const [theme, setTheme] = useState('light')
  const theme = useAppSelector(state => state.theme)
  const dispatch = useAppDispatch()
  const setTheme = () => {
    dispatch(changeTheme())
  }

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return { theme, setTheme }
}

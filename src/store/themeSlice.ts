import { createSlice } from '@reduxjs/toolkit'

const data: string | null = localStorage.getItem('fakeshop-theme')

const initialState = data ? data : 'light'

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: state => {
      const newTheme = state === 'light' ? 'dark' : 'light'
      localStorage.setItem('fakeshop-theme', newTheme)
      return newTheme
    }
  }
})

export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer

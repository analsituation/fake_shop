import { useAppSelector } from './redux'
import { redirect } from 'react-router-dom'

export const useAuth = () => {
  const isAuth = useAppSelector(state => state.main.isAuth)
  if (!isAuth) {
    return redirect('login')
  }
}
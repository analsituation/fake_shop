import React, { useEffect, useRef, useState } from 'react'
import styles from './Search.module.sass'
import { useDebounce } from '../../hooks/debounce'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { searchProducts } from '../../store/productsSlice'

const Search = () => {

  const dispatch = useAppDispatch()
  const filteredProducts = useAppSelector(state => state.products.filteredProducts)
  const [value, setValue] = useState('')
  const [dropdown, setDropdown] = useState(false)
  const debounced = useDebounce<string>(value, 400)

  const inputFocus = useRef(null)
  const [focused, setFocus] = useState(false)
  const onFocus = () => setFocus(true)
  const onBlur = () => setFocus(false)

  const changeHandler = (e:  React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    if (debounced.length >= 3) {
      dispatch(searchProducts(value))
      setDropdown(true)
    } else {
      setDropdown(false)
    }
  }, [debounced])

  function renderDropdown() {
    if (filteredProducts.length === 0) {
      return <p className="text-center">No results!</p>
    }

    return filteredProducts.map(product => (
      <li
        key={product.id}
        // onClick={() => navigate(`/`)}
        onClick={() => console.log(product.title)}
        className={styles.filter_item}
      >{product.title}</li>
    ))
  }

  return (
    <div className={styles.product_search}>
      <input
        type='text'
        placeholder='Search'
        onChange={changeHandler}
        value={value}
        ref={inputFocus}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      { dropdown && focused && <ul className={styles.dropdown}>
        { renderDropdown() }
      </ul> }
    </div>
  )
}

export default Search
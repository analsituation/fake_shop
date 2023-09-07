import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { searchProducts } from '@store/productsSlice'
import { useDebounce } from '@hooks/debounce'
import { useAppDispatch, useAppSelector } from '@hooks/redux'

import styles from './Search.module.sass'

const Search = () => {
  const dispatch = useAppDispatch()
  const filteredProducts = useAppSelector(state => state.products.filteredProducts)
  const [value, setValue] = useState('')
  const [dropdown, setDropdown] = useState(false)
  const debounced = useDebounce<string>(value, 400)

  const inputFocus = useRef(null)
  const [focused, setFocus] = useState(false)
  const navigate = useNavigate()

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      return <p className='text-center'>No results!</p>
    }

    return filteredProducts.map(product => (
      <li key={product.id} onMouseDown={() => navigate(`/product/${product.id}`)} className={styles.filter_item}>
        <div className={styles.item_img}>
          <img src={product.image} alt={product.title} />
        </div>
        <div className={styles.item_title}>{product.title}</div>
      </li>
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
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      {dropdown && focused && <ul className={styles.dropdown}>{renderDropdown()}</ul>}
    </div>
  )
}

export default Search

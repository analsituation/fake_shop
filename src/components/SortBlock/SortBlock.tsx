import React from 'react'

import styles from './SortBlock.module.sass'

interface SortBlockProps {
  categories: string[]
  activeCategories: string[]
  setCategoryHandler: (e: React.MouseEvent<HTMLSpanElement>, el: string) => void
}

const SortBlock = ({ categories, activeCategories, setCategoryHandler }: SortBlockProps) => {
  return (
    <div className={styles.product_sort}>
      {categories &&
        categories.map((el: string) => (
          <span
            key={el}
            className={
              activeCategories.find(category => category === el)
                ? [styles.category_item, styles.active].join(' ')
                : styles.category_item
            }
            onClick={e => setCategoryHandler(e, el)}
          >
            {el}
          </span>
        ))}
    </div>
  )
}

export default SortBlock

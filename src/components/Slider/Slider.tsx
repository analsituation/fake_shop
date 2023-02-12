import React, { FC } from 'react'
import { IProduct } from '../../types/Product'
import ProductCard from '../../pages/Products/ProductCard'
import styles from './Slider.module.sass'

import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

interface Props {
  products: IProduct[]
}

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 }
}

const Slider = ({ products }: Props) => {
  const items = products.map(prod => (
    <div key={prod.id} className={styles.item_wrapper}>
      <ProductCard product={prod} isCategory={false} isBuy={false} />
    </div>
  ))
  return (

    <div className={styles.carousel_block}>
      <AliceCarousel
        disableDotsControls={true}
        items={items}
        responsive={responsive}
        controlsStrategy='alternate'
      />
    </div>
  )
}
export default Slider
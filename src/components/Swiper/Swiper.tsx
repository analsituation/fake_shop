import React, { FC, PropsWithChildren } from 'react'
import { Navigation, Scrollbar } from 'swiper'
import { Swiper } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'

import './Swiper.styles.sass'

const SwiperComponent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Swiper
      className='swiper_component'
      modules={[Navigation, Scrollbar]}
      spaceBetween={30}
      slidesPerView={2}
      breakpoints={{
        320: {
          slidesPerView: 1
        },
        640: {
          slidesPerView: 2
        }
      }}
      draggable
      navigation
      scrollbar={{ draggable: true }}
    >
      {children}
    </Swiper>
  )
}

export default SwiperComponent

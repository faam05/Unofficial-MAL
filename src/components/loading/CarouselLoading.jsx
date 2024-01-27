import React from 'react'
import { Carousel } from '@mantine/carousel'
import MyCarousel from '../Carousel'

const CarouselLoading = ({ carouselStyle, children, gap = '1px' }) => {
  return (
    <MyCarousel drag slideGap={gap} withControls={false} slideSize='fit-contain'>
      {Array(10)
        .fill()
        .map((item, index) => {
          return (
            <Carousel.Slide key={index} style={carouselStyle}>
              {children}
            </Carousel.Slide>
          )
        })}
    </MyCarousel>
  )
}

export default CarouselLoading

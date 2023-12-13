import React from 'react'
import { Carousel } from '@mantine/carousel'
import Skeleton from 'react-loading-skeleton'
import MyCarousel from '../Carousel'

const RecomendationMLoading = () => {
  return (
    <MyCarousel drag slideGap='1px' withControls={false} slideSize='fit-contain'>
      {Array(10)
        .fill()
        .map((item, index) => (
          <Carousel.Slide key={index}>
            <Skeleton height={126} width={90} />
          </Carousel.Slide>
        ))}
    </MyCarousel>
  )
}

export default RecomendationMLoading

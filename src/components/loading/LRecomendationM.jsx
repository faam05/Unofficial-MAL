import React from 'react'
import CarouselM from '../CarouselM'
import { Carousel } from '@mantine/carousel'
import Skeleton from 'react-loading-skeleton'

const RecomendationMLoading = () => {
  return (
    <CarouselM drag slideGap='1px' withControls={false}>
      {Array(10)
        .fill()
        .map((item, index) => (
          <Carousel.Slide key={index}>
            <Skeleton height={126} width={90} />
          </Carousel.Slide>
        ))}
    </CarouselM>
  )
}

export default RecomendationMLoading

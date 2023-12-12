import React from 'react'
import CarouselM from '../CarouselM'
import { Carousel } from '@mantine/carousel'
import Skeleton from 'react-loading-skeleton'

const StaffMLoading = () => {
  return (
    <CarouselM drag slideGap='1px' withControls={false}>
      {Array(10)
        .fill()
        .map((item, index) => {
          return (
            <Carousel.Slide
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '90px',
                marginRight: 1,
              }}>
              <Skeleton width={90} height={126} />
              <Skeleton width={30} />
              <Skeleton width={80} />
            </Carousel.Slide>
          )
        })}
    </CarouselM>
  )
}

export default StaffMLoading

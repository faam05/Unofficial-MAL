import React from 'react'
import { Carousel } from '@mantine/carousel'
import Skeleton from 'react-loading-skeleton'
import MyCarousel from '../Carousel'

const StaffMLoading = () => {
  return (
    <MyCarousel drag slideGap='1px' withControls={false} slideSize='fit-contain'>
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
    </MyCarousel>
  )
}

export default StaffMLoading

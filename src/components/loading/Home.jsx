import { Carousel } from '@mantine/carousel'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const HomeLoading = () => {
  return (
    <Carousel.Slide className='mt-[5px] flex flex-col items-center justify-center'>
      <Skeleton height={220} width={160} />
    </Carousel.Slide>
  )
}

export default HomeLoading

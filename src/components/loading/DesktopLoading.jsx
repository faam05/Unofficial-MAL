import { Carousel } from '@mantine/carousel'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

const DesktopLoading = () => {
  return (
    <Carousel.Slide
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '5px',
      }}>
      <Skeleton height={220} width={160} />
    </Carousel.Slide>
  )
}

export default DesktopLoading

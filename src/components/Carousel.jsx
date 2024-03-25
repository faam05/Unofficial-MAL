import React from 'react'
import { Carousel } from '@mantine/carousel'
import { createStyles } from '@mantine/core'

const useStyles = createStyles((_theme, _params, getRef) => ({
  controls: {
    ref: getRef('controls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },

  root: {
    '&:hover': {
      [`& .${getRef('controls')}`]: {
        opacity: 1,
      },
    },
  },
}))

const MyCarousel = ({ children, changeSlide = 'auto', slideGap = 'sm', slideSize = '162', drag = false, withControls = true, loop = false }) => {
  const { classes } = useStyles()

  return (
    <Carousel
      withControls={withControls}
      dragFree={drag}
      controlSize={40}
      height='auto'
      slideSize={slideSize}
      slideGap={slideGap}
      loop={loop}
      align='start'
      slidesToScroll={changeSlide}
      // breakpoints={[
      //   { maxWidth: 'md', slideSize: '50%' },
      //   { maxWidth: 'sm', slideSize: '10%', slideGap: 'sm' },
      // ]}
      style={{
        position: 'relative',
      }}
      classNames={classes}>
      {children}
    </Carousel>
  )
}

export default MyCarousel

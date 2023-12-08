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

const CarouselCustom = ({ children }) => {
  const { classes } = useStyles()

  return (
    <Carousel
      controlSize={40}
      height='auto'
      slideSize='162'
      slideGap='sm'
      loop
      align='start'
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

export default CarouselCustom

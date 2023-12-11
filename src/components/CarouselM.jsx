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

const CarouselM = ({ children, slideGap = 'xs', drag = false, changeSlide = 5, withControls = true }) => {
  const { classes } = useStyles()

  return (
    <Carousel
      withControls={withControls}
      dragFree={drag}
      controlSize={40}
      slideSize='fit-contain'
      slideGap={slideGap}
      align='start'
      slidesToScroll={changeSlide}
      style={{
        position: 'relative',
      }}
      classNames={classes}>
      {children}
    </Carousel>
  )
}

export default CarouselM

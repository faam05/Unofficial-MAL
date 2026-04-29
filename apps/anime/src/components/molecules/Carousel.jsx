import { Carousel } from '@mantine/carousel'

import classes from '../../styles/carousel.module.css'

const MyCarousel = ({ children, changeSlide = 'auto', slideGap = 'sm', slideSize = 'auto', drag = false, withControls = true, loop = false }) => {
  return (
    <Carousel
      classNames={classes}
      withControls={withControls}
      controlSize={40}
      slideSize={slideSize}
      slideGap={slideGap}
      emblaOptions={{
        dragFree: drag,
        loop,
        align: "start",
        slidesToScroll: changeSlide,
      }}
      className="relative">
      {children}
    </Carousel>
  )
}

export default MyCarousel

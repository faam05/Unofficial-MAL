import { Carousel } from '@mantine/carousel'
import classes from '../styles/carousel.module.css'

const MyCarousel = ({ children, changeSlide = 'auto', slideGap = 'sm', slideSize = '162', drag = false, withControls = true, loop = false }) => {
  return (
    <Carousel
      classNames={classes}
      withControls={withControls}
      dragFree={drag}
      controlSize={40}
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
      }}>
      {children}
    </Carousel>
  )
}

export default MyCarousel

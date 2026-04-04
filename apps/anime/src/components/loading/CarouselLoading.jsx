import { Carousel } from '@mantine/carousel'
import MyCarousel from '../molecules/Carousel'

const CarouselLoading = ({ carouselStyle, children, gap = '1px', drag, withControls, slideSize }) => {
  return (
    <MyCarousel drag={drag} slideGap={gap} withControls={withControls} slideSize={slideSize} changeSlide='auto'>
      {Array(10)
        .fill()
        .map((_, index) => {
          return (
            <Carousel.Slide key={index} style={carouselStyle}>
              {children}
            </Carousel.Slide>
          )
        })}
    </MyCarousel>
  )
}

export default CarouselLoading

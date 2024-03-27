import { NavLink, useParams } from 'react-router-dom'
import { Image, Text } from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import MyCarousel from '../../../components/Carousel'
import CarouselLoading from '../../../components/loading/CarouselLoading'
import Skeleton from 'react-loading-skeleton'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '../../../utils'

const StaffMobile = () => {
  const { id } = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['staff', id],
    queryFn: () => fetcher(`https://api.jikan.moe/v4/anime/${id}/staff`),
    // retry: 10,
  })

  if (isError) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Text>Something went wrong</Text>
      </div>
    )
  }

  return (
    <>
      {isLoading ? (
        <CarouselLoading carouselStyle={{ display: 'flex', flexDirection: 'column', maxWidth: '90px', marginRight: 1 }}>
          <Skeleton width={90} height={126} />
          <Skeleton width={30} />
          <Skeleton width={80} />
        </CarouselLoading>
      ) : (
        <MyCarousel drag slideGap='1px' withControls={false} slideSize='fit-contain' changeSlide='auto'>
          {data?.map((item, index) => {
            return (
              <Carousel.Slide
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: '90px',
                  marginRight: 1,
                }}>
                <NavLink to={item.person.url}>
                  <Image imageProps={{ loading: 'lazy' }} height={126} width={90} src={item.person.images.jpg.image_url} withPlaceholder />
                </NavLink>
                <Text fz={10} truncate>
                  {item.positions ? item.positions.join(', ') : ''}
                </Text>
                <NavLink to={item.person.url} style={{ textDecoration: 'none' }}>
                  <Text fz={10} truncate>
                    {item.person.name}
                  </Text>
                </NavLink>
              </Carousel.Slide>
            )
          })}
        </MyCarousel>
      )}
    </>
  )
}

export default StaffMobile

import { Flex, Image, Text } from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import { NavLink, useParams } from 'react-router-dom'
import { useMobileDevice } from '../hooks/useMobileDevice'
import useFetcher from '../hooks/useFetcher'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import MyCarousel from './Carousel'
import StaffLoading from './loading/Staff'
import CarouselLoading from './loading/CarouselLoading'

const Staff = ({ loading }) => {
  const { id } = useParams()
  const mobile = useMobileDevice()

  const { data, isLoading, isError } = useFetcher(`https://api.jikan.moe/v4/anime/${id}/staff`, ['staff', id])

  if (isError) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Text>Something went wrong when fetching List Staff</Text>
      </div>
    )
  }

  return (
    <>
      {loading || isLoading ? (
        mobile ? (
          <CarouselLoading carouselStyle={{ display: 'flex', flexDirection: 'column', maxWidth: '90px', marginRight: 1 }}>
            <Skeleton width={90} height={126} />
            <Skeleton width={30} />
            <Skeleton width={80} />
          </CarouselLoading>
        ) : (
          Array(10)
            .fill()
            .map((_, index) => <StaffLoading key={index} bg={index % 2 == 0 ? 'white' : '#f8f8f8'} />)
        )
      ) : mobile ? (
        <MyCarousel drag={true} slideGap='1px' withControls={false} slideSize={90} loop={false} changeSlide='auto'>
          {data?.map((item, index) => {
            return (
              <Carousel.Slide
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: '90px',
                }}>
                <NavLink to={item.person.url}>
                  <Image h={126} w={90} src={item.person.images.jpg.image_url} />
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
      ) : (
        data.map((item, index) => {
          return (
            <div key={index} style={{ backgroundColor: index % 2 == 0 ? 'white' : '#f8f8f8' }}>
              <Flex p='5px 0' maw='max-content'>
                <NavLink to={item.person.url} style={{ textDecoration: 'none' }}>
                  <Image w={42} h={62} src={item.person.images.jpg.image_url} />
                </NavLink>
                <div style={{ padding: '0 4px' }}>
                  <NavLink to={item.person.url} style={{ textDecoration: 'none' }}>
                    <Text fz={12}>{item.person.name}</Text>
                  </NavLink>
                  <div style={{ padding: '3px 0' }}>
                    {item.positions.map((items, index) => (
                      <small key={index} style={{ fontSize: 'x-small' }}>
                        {items}
                        {item.positions.length != index + 1 ? ', ' : ''}
                      </small>
                    ))}
                  </div>
                </div>
              </Flex>
            </div>
          )
        })
      )}
    </>
  )
}

export default Staff

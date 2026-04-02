import { NavLink, useParams } from 'react-router-dom'

import { useMobileDevice, useFetcher } from '@shared'

import { Carousel } from '@mantine/carousel'
import { Flex, Text } from '@mantine/core'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Skeleton from 'react-loading-skeleton'
import MyCarousel from '../molecules/Carousel'
import ErrorMessage from '../molecules/ErrorMessage'
import CarouselLoading from '../loading/CarouselLoading'
import StaffLoading from '../loading/Staff'

import 'react-loading-skeleton/dist/skeleton.css'

const { VITE_MAIN_SERVICE_URL } = import.meta.env

const Staff = ({ loading }) => {
  const { id } = useParams()
  const mobile = useMobileDevice()
  const { data, isLoading, isError } = useFetcher(`${VITE_MAIN_SERVICE_URL}/anime/${id}/staff`, ['staff', id])

  if (isError) return <ErrorMessage message='Something went wrong when fetching List Staff' />

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
              <Carousel.Slide key={index} className='flex max-w-[90px] flex-col'>
                <NavLink to={item.person.url}>
                  <div className='w-[90px]'>
                    <LazyLoadImage
                      width={90}
                      className='h-[126px] object-cover'
                      src={item.person.images.jpg.image_url}
                      alt={item.person?.name?.replace(/[ , -]/g, '_')}
                    />
                  </div>
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
                <NavLink to={item.person?.url} style={{ textDecoration: 'none' }}>
                  <div className='w-[42px]'>
                    <LazyLoadImage
                      width={42}
                      src={item.person?.images?.jpg?.image_url}
                      alt={item.person?.name?.replace(/[ , -]/g, '_')}
                      className='h-[62px] object-cover'
                    />
                  </div>
                </NavLink>
                <div style={{ padding: '0 4px' }}>
                  <NavLink to={item?.person?.url} style={{ textDecoration: 'none' }}>
                    <Text fz={12}>{item?.person?.name}</Text>
                  </NavLink>
                  <div style={{ padding: '3px 0' }}>
                    {item.positions?.map((items, index) => (
                      <small key={index} style={{ fontSize: 'x-small' }}>
                        {items}
                        {item.positions?.length != index + 1 ? ', ' : ''}
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

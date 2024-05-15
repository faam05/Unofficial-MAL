import { Flex, Text } from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import { NavLink, useParams } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Skeleton from 'react-loading-skeleton'
import { useMobileDevice } from '../hooks/useMobileDevice'
import useFetcher from '../hooks/useFetcher'
import MyCarousel from './Carousel'
import ErrorMessage from './ErrorMessage'
import StaffLoading from './loading/Staff'
import CarouselLoading from './loading/CarouselLoading'
import 'react-loading-skeleton/dist/skeleton.css'

const Staff = ({ loading }) => {
  const { id } = useParams()
  const mobile = useMobileDevice()
  const { data, isLoading, isError } = useFetcher(`https://api.jikan.moe/v4/anime/${id}/staff`, ['staff', id])

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
                  <LazyLoadImage
                    className='h-[126px] w-[90px] object-cover'
                    src={item.person.images.jpg.image_url}
                    alt={item.person?.name?.replace(/[ , -]/g, '_')}
                  />
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
                  <LazyLoadImage width={42} height={62} src={item.person?.images?.jpg?.image_url} alt={item.person?.name?.replace(/[ , -]/g, '_')} />
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

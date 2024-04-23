import { NavLink, useParams } from 'react-router-dom'
import { Carousel } from '@mantine/carousel'
import { Image, Text } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import MyCarousel from './Carousel'
import CarouselLoading from './loading/CarouselLoading'
import { useMobileDevice } from '../hooks/useMobileDevice'

const Recommendation = ({ loading }) => {
  const { id } = useParams()
  const mobile = useMobileDevice()

  const queryClient = useQueryClient()
  const { data, status, error } = queryClient.getQueryState(['recommendations', id])

  if (error) {
    return (
      <div className='text-center'>
        <Text>Something went wrong when fetching List Recommendation</Text>
      </div>
    )
  }

  return (
    <>
      {status === 'pending' || loading ? (
        <CarouselLoading
          gap={mobile ? '1px' : 'xs'}
          drag={mobile && true}
          withControls={mobile ? false : true}
          carouselStyle={{
            display: !mobile && 'flex',
            justifyContent: !mobile && 'center',
            alignItems: !mobile && 'center',
            flexDirection: !mobile && 'column',
            marginTop: !mobile && '5px',
          }}>
          {mobile ? (
            <Skeleton height={126} width={90} />
          ) : (
            <div>
              <Skeleton height={220} width={140} />
            </div>
          )}
        </CarouselLoading>
      ) : (
        <>
          {data?.length === 0 ? (
            <Text fz={12}>Recommendation not update yet</Text>
          ) : (
            <MyCarousel drag={mobile ? true : false} slideGap={mobile ? '1px' : 'xs'} withControls={mobile ? false : true} changeSlide='auto'>
              {data?.map((item, index) => (
                <Carousel.Slide key={index} className={!mobile && 'mt-[5px] flex flex-col items-center justify-center'}>
                  <NavLink to={`/detail/${item.entry.mal_id}`} className='relative'>
                    <Image
                      h={mobile ? 126 : 220}
                      w={mobile ? 90 : 140}
                      src={mobile ? item.entry.images.webp.image_url : item.entry.images.webp.image_url}
                      alt={item.entry?.title?.replace(/[ , -]/g, '_')}
                    />
                    <Text
                      c='white'
                      lineClamp={2}
                      fz={mobile ? 8 : 14}
                      pos='absolute'
                      top={0}
                      right={0}
                      fw={600}
                      p='0px 5px'
                      bg='linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)'>
                      {item.votes != null || item.votes != 0 ? <span>{item.votes} users</span> : 'N / A'}
                    </Text>
                    <Text
                      fz={mobile ? 10 : 11}
                      fw={400}
                      lineClamp={2}
                      c='white'
                      w='100%'
                      p='15px 5px 5px'
                      bottom={0}
                      pos='absolute'
                      bg='linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)'>
                      {item.entry.title}
                    </Text>
                  </NavLink>
                </Carousel.Slide>
              ))}
            </MyCarousel>
          )}
        </>
      )}
    </>
  )
}

export default Recommendation

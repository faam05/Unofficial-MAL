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
      <div style={{ textAlign: 'center' }}>
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
          slideSize={mobile && 'fit-contain'}
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
        <MyCarousel
          drag={mobile ? true : false}
          slideGap={mobile ? '1px' : 'xs'}
          withControls={mobile ? false : true}
          slideSize={mobile && 'fit-contain'}
          changeSlide='auto'>
          {data.length === 0 ? (
            <Text fz={12}>Recommendation not update yet</Text>
          ) : (
            data?.map((item, index) => {
              return (
                <Carousel.Slide
                  key={index}
                  style={{
                    display: !mobile && 'flex',
                    justifyContent: !mobile && 'center',
                    alignItems: !mobile && 'center',
                    flexDirection: !mobile && 'column',
                    marginTop: !mobile && '5px',
                  }}>
                  <NavLink
                    to={`/detail/${item.entry.mal_id}`}
                    style={{
                      position: 'relative',
                    }}>
                    <Image
                      h={mobile ? 126 : 220}
                      w={mobile ? 90 : 140}
                      src={mobile ? item.entry.images.webp.image_url : item.entry.images.webp.image_url}
                      alt={item.entry?.title?.replace(/[ , -]/g, '_')}
                      style={{ position: 'relative' }}
                    />
                    <Text
                      c='white'
                      lineClamp={2}
                      fz={mobile ? 8 : 14}
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        fontWeight: 600,
                        padding: '0px 5px',
                        background: `linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)`,
                      }}>
                      {item.votes != null || item.votes != 0 ? <span>{item.votes} users</span> : 'N / A'}
                    </Text>
                    <Text
                      fz={mobile ? 10 : 11}
                      lineClamp={2}
                      style={{
                        width: '100%',
                        fontWeight: 400,
                        padding: '15px 5px 5px',
                        bottom: 0,
                        position: 'absolute',
                        color: '#fff',
                        background: `linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)`,
                      }}>
                      {item.entry.title}
                    </Text>
                  </NavLink>
                </Carousel.Slide>
              )
            })
          )}
        </MyCarousel>
      )}
    </>
  )
}

export default Recommendation

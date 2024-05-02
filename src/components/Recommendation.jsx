import { Text } from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { useMobileDevice } from '../hooks/useMobileDevice'
import MyCarousel from './Carousel'
import CarouselCard from './CarouselCard'
import ErrorMessage from './ErrorMessage'
import CarouselLoading from './loading/CarouselLoading'
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-loading-skeleton/dist/skeleton.css'

const Recommendation = ({ loading }) => {
  const { id } = useParams()
  const mobile = useMobileDevice()

  const queryClient = useQueryClient()
  const { data, status, error } = queryClient.getQueryState(['recommendations', id])

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
          <Skeleton height={mobile ? 126 : 220} width={mobile ? 90 : 140} />
        </CarouselLoading>
      ) : error ? (
        <ErrorMessage message='Something went wrong when fetching List Recommendation' />
      ) : (
        <>
          {data?.length === 0 ? (
            <Text fz={12}>Recommendation not update yet</Text>
          ) : (
            <MyCarousel drag={mobile ? true : false} slideGap={mobile ? '1px' : 'xs'} withControls={mobile ? false : true}>
              {data?.map((item, index) => (
                <Carousel.Slide key={index} className='mt-[5px] flex flex-col items-center justify-center'>
                  <CarouselCard
                    width={mobile ? 90 : 150}
                    height={mobile ? 126 : 220}
                    item={item.entry}
                    topText={item.votes != null || item.votes != 0 ? <span>{item.votes} users</span> : 'N / A'}
                  />
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

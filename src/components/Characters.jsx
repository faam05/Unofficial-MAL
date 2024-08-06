import { Flex, SimpleGrid, Text } from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import { Link, useParams } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Skeleton from 'react-loading-skeleton'
import { useMobileDevice } from '../hooks/useMobileDevice'
import useFetcher from '../hooks/useFetcher'
import MyCarousel from './Carousel'
import CharactersLoading from './loading/Characters'
import CarouselLoading from './loading/CarouselLoading'
import ErrorMessage from './ErrorMessage'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-lazy-load-image-component/src/effects/blur.css'

export default function Characters({ loading }) {
  const mobile = useMobileDevice()
  const { id } = useParams()
  const {VITE_MAIN_URL} = import.meta.env

  const { data, isLoading, isError } = useFetcher(`${VITE_MAIN_URL}/anime/${id}/characters`, ['characters', id])

  if (isError) return <ErrorMessage message='Something went wrong when fetching List Characters' />

  return (
    <>
      {isLoading || loading ? (
        mobile ? (
          <CarouselLoading gap={0} slideSize='70'>
            <Skeleton height={108.88} width={70} count={2} />
          </CarouselLoading>
        ) : (
          Array(10)
            .fill()
            .map((_, index) => <CharactersLoading key={index} bg={index % 2 == 0 ? 'white' : '#f8f8f8'} />)
        )
      ) : mobile ? (
        <MyCarousel drag slideGap='1px' withControls={false} slideSize='70'>
          {data?.map((item, index) => {
            if (item.voice_actors[0]) {
              return (
                <Carousel.Slide key={index}>
                  <Flex className='relative'>
                    <LazyLoadImage
                      height={108.88}
                      width={70}
                      src={item.character.images.webp.image_url}
                      placeholderSrc={item.character.images?.webp?.small_image_url}
                      alt={item.name?.replace(/[ , -]/g, '_')}
                      effect='blur'
                      className='relative'
                    />
                    <Text
                      c='white'
                      fz={8}
                      pos='absolute'
                      top={0}
                      right={0}
                      fw={400}
                      p='0px 5px'
                      bg='linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)'>
                      {Number(item.favorites).toLocaleString()} users
                    </Text>
                    <Text
                      fz={8}
                      truncate
                      c='white'
                      w='100%'
                      top={78}
                      fw={400}
                      p='15px 5px 5px'
                      pos='absolute'
                      bg='linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)'>
                      {item.character.name}
                    </Text>
                  </Flex>
                  <Flex className='relative'>
                    <LazyLoadImage width={70} src={item.voice_actors[0]?.person.images.jpg.image_url} alt={item.name?.replace(/[ , -]/g, '_')} />
                    <Text
                      truncate
                      fz={8}
                      c='white'
                      w='100%'
                      fw={400}
                      p='15px 5px 5px'
                      bottom={0}
                      pos='absolute'
                      bg='linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)'>
                      {item.voice_actors[0]?.person.name}
                    </Text>
                  </Flex>
                </Carousel.Slide>
              )
            }
          })}
        </MyCarousel>
      ) : (
        <>
          <Flex className='border-solid' style={{ borderWidth: '0 0 1px' }} p={3} justify='space-between'>
            <Text>Characters</Text>
            <Text>Voice Actors</Text>
          </Flex>
          {data.map((item, index) => (
            <SimpleGrid cols={2} key={index} p={'5px 0'} bg={index % 2 == 0 ? 'white' : '#f8f8f8'}>
              <Flex>
                <div className='w-[120px]'>
                  <LazyLoadImage
                    width={120}
                    height={200}
                    src={item.character.images.webp.image_url}
                    placeholderSrc={item.character.images?.webp?.small_image_url}
                    alt={item.name?.replace(/[ , -]/g, '_')}
                    effect='blur'
                    className='fixed object-cover'
                  />
                </div>
                <div className='ml-[10px]'>
                  <Text fz={14}>{item.character?.name}</Text>
                  <Text fz={14}>{item.role}</Text>
                  <Text fz={14}>{Number(item.favorites).toLocaleString()} Favorites</Text>
                </div>
              </Flex>
              <div className='ml-auto'>
                {item.voice_actors.map((item, index) => {
                  return (
                    <Flex key={index} ta='right' ml='auto' justify='end'>
                      <div style={{ padding: '0 4px' }}>
                        <Text fz={12}>{item.person.name}</Text>
                        <Text fz={12}>{item.language}</Text>
                      </div>
                      <Link to={item.person.url} target='_blank'>
                        <LazyLoadImage
                          height={42}
                          width={62}
                          src={item.person.images.jpg.image_url}
                          alt={item.person?.name?.replace(/[ , -]/g, '_')}
                          // className='max-h-[42px] max-w-[62px]'
                        />
                      </Link>
                    </Flex>
                  )
                })}
              </div>
            </SimpleGrid>
          ))}
        </>
      )}
    </>
  )
}

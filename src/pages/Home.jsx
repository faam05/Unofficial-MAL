import { Flex, Image, Text } from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { NavLink } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useMobileDevice } from '../hooks/useMobileDevice'
import MyCarousel from '../components/Carousel'
import HomeLoading from '../components/loading/Home'

export default function Home() {
  const mobile = useMobileDevice()

  // const [userLocation, setUserLocation] = useState(null)

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords
  //         fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
  //           .then((response) => response.json())
  //           .then((data) => {
  //             console.log()
  //             setUserLocation(`${data.countryCode.toLowerCase()}-${data.countryCode.toUpperCase()}`)
  //           })
  //           .catch((error) => console.error('Error fetching location:', error))
  //       },
  //       (error) => {
  //         console.error('Error getting location:', error)
  //       }
  //     )
  //   } else {
  //     console.error('Geolocation is not supported by this browser.')
  //   }
  // }, [])

  const getDate = new Date()
  const date = getDate.toLocaleString('en-EN', { weekday: 'long' })

  const getSeason = (month) => {
    if (month >= 0 && month <= 2) {
      return 'Winter'
    } else if (month > 2 && month <= 5) {
      return 'Spring'
    } else if (month > 5 && month <= 8) {
      return 'Summer'
    } else if (month > 8 && month <= 11) {
      return 'Fall'
    }
  }

  // Access the client
  const queryClient = useQueryClient()
  // Queries
  const queryNow = useQuery({
    queryKey: ['nowAnime'],
    queryFn: async () => {
      const response = await fetch('https://api.jikan.moe/v4/seasons/now')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const { data } = await response.json()
      return data
    },
  })
  const querySchedule = useQuery({
    queryKey: ['scheduleAnime'],
    queryFn: async () => {
      const response = await fetch(`https://api.jikan.moe/v4/schedules?filter=${date.toLowerCase()}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const { data } = await response.json()
      return data
    },
  })
  const queryTop = useQuery({
    queryKey: ['topAnime'],
    queryFn: async () => {
      const response = await fetch('https://api.jikan.moe/v4/top/anime')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const { data } = await response.json()
      return data
    },
  })

  return (
    <>
      {queryNow.isError || querySchedule.isError || queryTop.isError ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p>There was an error, please refresh or click Retry Button</p>
          <button onClick={() => queryClient.invalidateQueries('nowAnime')}>Retry</button>
        </div>
      ) : (
        <>
          <Flex style={{ borderColor: '#bebebe', borderStyle: 'solid', borderWidth: '0 0 1px' }}>
            {queryNow.isLoading ? (
              <div style={{ flex: 1 }}>
                <Skeleton />
              </div>
            ) : (
              <>
                <Text transform='capitalize'>
                  {getSeason(getDate.getMonth())} {getDate.getFullYear()} anime
                </Text>
                {!mobile && (
                  <NavLink to='/coming-soon' style={{ marginLeft: 'auto', textDecoration: 'none' }} id='coming-soon'>
                    Coming Soon
                  </NavLink>
                )}
              </>
            )}
          </Flex>
          <MyCarousel
            drag={mobile ? true : false}
            slideGap={mobile ? 'xs' : 'sm'}
            withControls={mobile ? false : true}
            slideSize={mobile ? 'fit-contain' : '162'}
            loop={mobile ? false : true}
            changeSlide='auto'>
            {queryNow.isLoading
              ? Array(10)
                  .fill()
                  .map((_, index) => <HomeLoading key={index} />)
              : queryNow.data.map((item, index) => {
                  return (
                    <Carousel.Slide
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        marginTop: '5px',
                      }}>
                      <NavLink
                        aria-labelledby={`${item.mal_id}_${item.title.replace(/ /g, '')}`}
                        to={`/detail/${item.mal_id}`}
                        style={{
                          position: 'relative',
                        }}>
                        <Image h={220} w={160} src={item.images.webp.image_url} alt={item.title.replace(/[ , -]/g, '_')} />
                        <Text
                          lineClamp={2}
                          fz={12}
                          fw={400}
                          w='100%'
                          c='#fff'
                          style={{
                            // whiteSpace: 'nowrap',
                            padding: '15px 5px 0px',
                            marginBottom: '5px',
                            boxShadow: '0 5px 0 #000',
                            bottom: 0,
                            position: 'absolute',
                            background: `linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)`,
                          }}>
                          {item.title}
                        </Text>
                      </NavLink>
                    </Carousel.Slide>
                  )
                })}
          </MyCarousel>
          <Text
            style={{
              marginTop: '15px',
              borderColor: '#bebebe',
              borderStyle: 'solid',
              borderWidth: '0 0 1px',
            }}>
            {querySchedule.isLoading ? <Skeleton /> : 'Today Airing'}
          </Text>
          <MyCarousel
            drag={mobile ? true : false}
            slideGap={mobile ? 'xs' : 'sm'}
            withControls={mobile ? false : true}
            slideSize={mobile ? 'fit-contain' : '162'}
            loop={mobile ? false : true}
            changeSlide='auto'>
            {querySchedule.isLoading
              ? Array(10)
                  .fill()
                  .map((_, index) => <HomeLoading key={index} />)
              : querySchedule.data.map((item, index) => {
                  return (
                    <Carousel.Slide
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        marginTop: '5px',
                      }}>
                      <NavLink
                        aria-labelledby={`${item.mal_id}_${item.title.replace(/ /g, '')}`}
                        to={`/detail/${item.mal_id}`}
                        style={{
                          position: 'relative',
                        }}>
                        <Image h={220} w={160} src={item.images.webp.image_url} alt={item.title.replace(/[ , -]/g, '_')} />
                        <Text
                          lineClamp={2}
                          c='#fff'
                          w='100%'
                          fz={12}
                          fw={400}
                          style={{
                            padding: '15px 5px 0px',
                            marginBottom: '5px',
                            boxShadow: '0 5px 0 #000',
                            bottom: 0,
                            position: 'absolute',
                            background: `linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)`,
                          }}>
                          {item.title}
                        </Text>
                      </NavLink>
                    </Carousel.Slide>
                  )
                })}
          </MyCarousel>
          <Text
            style={{
              marginTop: '15px',
              borderColor: '#bebebe',
              borderStyle: 'solid',
              borderWidth: '0 0 1px',
            }}>
            {queryTop.isLoading ? <Skeleton /> : 'Top 25 Anime'}
          </Text>
          <MyCarousel
            drag={mobile ? true : false}
            slideGap={mobile ? 'xs' : 'sm'}
            withControls={mobile ? false : true}
            slideSize={mobile ? 'fit-contain' : '162'}
            loop={mobile ? false : true}
            changeSlide='auto'>
            {queryTop.isLoading
              ? Array(10)
                  .fill()
                  .map((_, index) => <HomeLoading key={index} />)
              : queryTop.data.map((item, index) => {
                  return (
                    <Carousel.Slide
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        marginTop: '5px',
                      }}>
                      <NavLink
                        aria-labelledby={`${item.mal_id}_${item.title.replace(/ /g, '')}`}
                        to={`/detail/${item.mal_id}`}
                        style={{
                          position: 'relative',
                        }}>
                        <Image h={220} w={160} src={item.images.webp.image_url} alt={item.title.replace(/[ , -]/g, '_')} />
                        <Text
                          c='white'
                          fz={14}
                          fw={600}
                          style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            padding: '0px 5px',
                            background: `linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)`,
                          }}>
                          # {index + 1}
                        </Text>
                        <Text
                          lineClamp={2}
                          c='#fff'
                          w='100%'
                          fz={12}
                          fw={400}
                          style={{
                            padding: '15px 5px 0px',
                            marginBottom: '5px',
                            boxShadow: '0 5px 0 #000',
                            bottom: 0,
                            position: 'absolute',
                            background: `linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)`,
                          }}>
                          {item.title}
                        </Text>
                      </NavLink>
                    </Carousel.Slide>
                  )
                })}
          </MyCarousel>
        </>
      )}
    </>
  )
}

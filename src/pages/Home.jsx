import { Carousel } from '@mantine/carousel'
import { Flex, Text } from '@mantine/core'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { NavLink } from 'react-router-dom'
import MyCarousel from '../components/Carousel'
import CarouselCard from '../components/CarouselCard'
import HomeLoading from '../components/loading/Home'
import { useMobileDevice } from '../hooks/useMobileDevice'

export default function Home() {
  const { VITE_MAIN_URL } = import.meta.env
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

  // const test = useCallback(async () => {
  //   try {
  //     // let res = await fetch(`https://msmiledev.bankmega.com/service/backoffice/gate/fitur/MSBO`, {
  //     // let res = await fetch(`https://msmiledev.bankmega.com/service/backoffice/gate/logout`, {
  //     //   method: 'POST',
  //     //   // headers: {
  //     //   //   'Content-Type': 'application/json',
  //     //   // },
  //     //   // body: JSON.stringify({
  //     //   //   accountUsername: 'faam00',
  //     //   // }),
  //     // })
  //     // return await res.json()
  //   } catch (error) {
  //     return error
  //   }
  // }, [])

  // useEffect(() => {
  //   let data = test()
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
      const response = await fetch(`${VITE_MAIN_URL}/seasons/now`)
      if (!response.ok) throw new Error('Network response was not ok')
      const { data } = await response.json()
      return data
    },
  })
  const querySchedule = useQuery({
    queryKey: ['scheduleAnime'],
    queryFn: async () => {
      const response = await fetch(`${VITE_MAIN_URL}/schedules?filter=${date.toLowerCase()}`)
      if (!response.ok) throw new Error('Network response was not ok')
      const { data } = await response.json()
      return data
    },
  })
  const queryTop = useQuery({
    queryKey: ['topAnime'],
    queryFn: async () => {
      const response = await fetch(`${VITE_MAIN_URL}/top/anime`)
      if (!response.ok) throw new Error('Network response was not ok')
      const { data } = await response.json()
      return data
    },
  })

  return (
    <>
      {queryNow.isError || querySchedule.isError || queryTop.isError ? (
        <div className='flex flex-col items-center'>
          <p>There was an error, please refresh or click Retry Button</p>
          <button onClick={() => queryClient.invalidateQueries('nowAnime')}>Retry</button>
        </div>
      ) : (
        <>
          <Flex className='border-solid border-[#bebebe]' style={{ borderWidth: '0 0 1px' }}>
            {queryNow.isLoading ? (
              <div className='flex-1'>
                <Skeleton />
              </div>
            ) : (
              <>
                <Text transform='capitalize'>
                  {getSeason(getDate.getMonth())} {getDate.getFullYear()} Anime
                </Text>
                {!mobile && (
                  <NavLink to='/coming-soon' className='flex ml-auto no-underline hover:underline' id='coming-soon'>
                    <span>Coming Soon</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='icon icon-tabler icons-tabler-outline icon-tabler-chevrons-right motion-safe:animate-bounce hover:motion-safe:animate-pulse'>
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <path d='M7 7l5 5l-5 5' />
                      <path d='M13 7l5 5l-5 5' />
                    </svg>
                  </NavLink>
                )}
              </>
            )}
          </Flex>
          <MyCarousel
            drag={mobile ? true : false}
            slideGap={mobile ? 'xs' : 'sm'}
            withControls={mobile ? false : true}
            loop={mobile ? false : true}
            changeSlide='auto'>
            {queryNow.isLoading
              ? Array(10)
                  .fill()
                  .map((_, index) => <HomeLoading key={index} />)
              : queryNow.data.map((item, index) => {
                  return (
                    <Carousel.Slide key={index} className='mt-[5px] flex flex-col items-center justify-center'>
                      <CarouselCard item={item} />
                    </Carousel.Slide>
                  )
                })}
          </MyCarousel>
          <Text
            mt={15}
            className='border-solid border-[#bebebe]'
            style={{
              borderWidth: '0 0 1px',
            }}>
            {querySchedule.isLoading ? <Skeleton /> : 'Today Airing'}
          </Text>
          <MyCarousel
            drag={mobile ? true : false}
            slideGap={mobile ? 'xs' : 'sm'}
            withControls={mobile ? false : true}
            loop={mobile ? false : true}
            changeSlide='auto'>
            {querySchedule.isLoading
              ? Array(10)
                  .fill()
                  .map((_, index) => <HomeLoading key={index} />)
              : querySchedule.data.map((item, index) => {
                  return (
                    <Carousel.Slide key={index} className='mt-[5px] flex flex-col items-center justify-center'>
                      <CarouselCard item={item} />
                    </Carousel.Slide>
                  )
                })}
          </MyCarousel>
          <Text
            mt={15}
            className='border-solid border-[#bebebe]'
            style={{
              borderWidth: '0 0 1px',
            }}>
            {queryTop.isLoading ? <Skeleton /> : 'Top 25 Anime'}
          </Text>
          <MyCarousel
            drag={mobile ? true : false}
            slideGap={mobile ? 'xs' : 'sm'}
            withControls={mobile ? false : true}
            loop={mobile ? false : true}
            changeSlide='auto'>
            {queryTop.isLoading
              ? Array(10)
                  .fill()
                  .map((_, index) => <HomeLoading key={index} />)
              : queryTop.data.map((item, index) => {
                  return (
                    <Carousel.Slide key={index} className='mt-[5px] flex flex-col items-center justify-center'>
                      <CarouselCard item={item} topText={`# ${index + 1}`} />
                    </Carousel.Slide>
                  )
                })}
          </MyCarousel>
        </>
      )}
    </>
  )
}

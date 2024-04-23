import React, { useEffect } from 'react'
import { Flex, Text } from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { NavLink } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { useMobileDevice } from '../hooks/useMobileDevice'
import MyCarousel from '../components/Carousel'
import HomeCard from '../components/HomeCard'
import HomeLoading from '../components/loading/Home'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Home() {
  const mobile = useMobileDevice()

  useEffect(() => {
    const url = `${import.meta.env.DEV ? import.meta.env.VITE_LOCAL_URL : import.meta.env.VITE_PUBLIC_URL}/anime/gogoanime`
    const test = async () => {
      try {
        const response = await fetch(url)
        // Check if the response is successful (status code 200-299)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        return await response.json()
      } catch (error) {
        console.error('Error fetching data:', error.message)
      }
    }
    test()
  }, [])

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
                    <Carousel.Slide key={index} className='flex justify-center items-center flex-col mt-[5px]'>
                      <HomeCard item={item} />
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
                      <HomeCard item={item} />
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
                      <HomeCard item={item} isRank index={index} />
                    </Carousel.Slide>
                  )
                })}
          </MyCarousel>
        </>
      )}
    </>
  )
}

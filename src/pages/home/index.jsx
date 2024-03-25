import React, { useEffect, useState, lazy } from 'react'
import Layout from '../../components/layouts'
import axios from 'axios'
import { useMobileDevice } from '../../hooks'

// Desktop
import { Flex, Image, Text } from '@mantine/core'
import { NavLink } from 'react-router-dom'
import { Carousel } from '@mantine/carousel'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// import MyCarousel from '../../components/Carousel'
const MyCarousel = lazy(() => import('../../components/Carousel'))
import DesktopLoading from '../../components/loading/DesktopLoading'

export default function Home() {
  const mobile = useMobileDevice()
  const [data, setData] = useState([])
  const [schedule, setSchedule] = useState([])
  const [topAnime, setTopAnime] = useState([])
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      try {
        const [resNow, resSchedule, resTop] = await Promise.all([
          axios(`https://api.jikan.moe/v4/seasons/now`),
          axios(`https://api.jikan.moe/v4/schedules?filter=${date.toLowerCase()}`),
          axios(`https://api.jikan.moe/v4/top/anime`),
        ])
        setData(resNow.data.data)
        setSchedule(resSchedule.data.data)
        setTopAnime(resTop.data.data)
      } catch (err) {
      } finally {
        setLoading(false)
      }
    }

    getData()

    return () => {
      setLoading(true)
    }
  }, [])

  return (
    <Layout>
      <Flex style={{ borderColor: '#bebebe', borderStyle: 'solid', borderWidth: '0 0 1px' }}>
        <Text transform='capitalize'>{loading ? <Skeleton /> : `${getSeason(getDate.getMonth())} ${getDate.getFullYear()} anime`}</Text>
        {!mobile && (
          <NavLink to='/coming-soon' style={{ marginLeft: 'auto', textDecoration: 'none' }} id='coming-soon'>
            Coming Soon
          </NavLink>
        )}
      </Flex>
      <MyCarousel
        drag={mobile ? true : false}
        slideGap={mobile ? 'xs' : 'sm'}
        withControls={mobile ? false : true}
        slideSize={mobile ? 'fit-contain' : '162'}
        loop={mobile ? false : true}
        changeSlide='auto'>
        {loading
          ? Array(10)
              .fill()
              .map((_, index) => <DesktopLoading key={index} />)
          : data.map((item, index) => {
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
                    <Image
                      imageProps={{ loading: 'eager' }}
                      height={220}
                      width={160}
                      src={item.images.webp.image_url}
                      withPlaceholder
                      alt={item.title.replace(/[ , -]/g, '_')}
                    />
                    <Text
                      style={{
                        width: '100%',
                        fontSize: '11px',
                        fontWeight: 400,
                        padding: '15px 5px 5px',
                        bottom: 0,
                        position: 'absolute',
                        color: '#fff',
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
        {loading ? <Skeleton /> : 'Today Airing'}
      </Text>
      <MyCarousel
        drag={mobile ? true : false}
        slideGap={mobile ? 'xs' : 'sm'}
        withControls={mobile ? false : true}
        slideSize={mobile ? 'fit-contain' : '162'}
        loop={mobile ? false : true}
        changeSlide='auto'>
        {loading
          ? Array(10)
              .fill()
              .map((_, index) => <DesktopLoading key={index} />)
          : schedule.map((item, index) => {
              // console.log(`${item.mal_id}-${item.title.replace(/ /g, '')}`)
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
                    <Image
                      imageProps={{ loading: 'eager' }}
                      height={220}
                      width={160}
                      src={item.images.webp.image_url}
                      withPlaceholder
                      alt={item.title.replace(/[ , -]/g, '_')}
                    />
                    <Text
                      style={{
                        width: '100%',
                        fontSize: '11px',
                        fontWeight: 400,
                        padding: '15px 5px 5px',
                        bottom: 0,
                        position: 'absolute',
                        color: '#fff',
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
        {loading ? <Skeleton /> : 'Top 25 Anime'}
      </Text>
      <MyCarousel
        drag={mobile ? true : false}
        slideGap={mobile ? 'xs' : 'sm'}
        withControls={mobile ? false : true}
        slideSize={mobile ? 'fit-contain' : '162'}
        loop={mobile ? false : true}
        changeSlide='auto'>
        {loading
          ? Array(10)
              .fill()
              .map((_, index) => <DesktopLoading key={index} />)
          : topAnime.map((item, index) => {
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
                    <Image
                      imageProps={{ loading: 'eager' }}
                      height={220}
                      width={160}
                      src={item.images.webp.image_url}
                      withPlaceholder
                      alt={item.title.replace(/[ , -]/g, '_')}
                    />
                    <Text
                      color='white'
                      fz={14}
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        fontWeight: 600,
                        padding: '0px 5px',
                        background: `linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)`,
                      }}>
                      # {index + 1}
                    </Text>
                    <Text
                      style={{
                        width: '100%',
                        fontSize: '11px',
                        fontWeight: 400,
                        padding: '15px 5px 5px',
                        bottom: 0,
                        position: 'absolute',
                        color: '#fff',
                        background: `linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)`,
                      }}>
                      {item.title}
                    </Text>
                  </NavLink>
                </Carousel.Slide>
              )
            })}
      </MyCarousel>
    </Layout>
  )
}

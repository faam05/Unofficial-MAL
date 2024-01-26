import React, { useEffect, useState } from 'react'
import Layout from '../../components/layouts'
import { useMediaQuery } from '@mantine/hooks'
import axios from 'axios'
import useMobileDevice from '../../hooks/useMobile'

// Desktop
import { Image, Text } from '@mantine/core'
import { NavLink } from 'react-router-dom'
import { Carousel } from '@mantine/carousel'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import MyCarousel from '../../components/Carousel'

export default function Home() {
  // const matches = useMediaQuery('(min-width: 720px)')
  const mobile = useMobileDevice()
  const [data, setData] = useState([])
  const [schedule, setSchedule] = useState([])
  const [topAnime, setTopAnime] = useState([])
  const [loading, setLoading] = useState(true)

  const getDate = new Date()
  const date = getDate.toLocaleString('en-EN', { weekday: 'long' })

  const getData = async () => {
    setLoading(true)
    // season now
    setTimeout(async () => {
      try {
        const { data } = await axios(`https://api.jikan.moe/v4/seasons/now`)
        setData(data.data)
      } catch (e) {
        console.error('error', e)
      }
    }, 500)
    // today airing
    setTimeout(async () => {
      try {
        const res = await axios(`https://api.jikan.moe/v4/schedules?filter=${date.toLowerCase()}`)
        setSchedule(res.data.data)
      } catch (e) {
        console.error('error', e)
      }
    }, 500)
    // top anime
    setTimeout(async () => {
      try {
        const resTop = await axios(`https://api.jikan.moe/v4/top/anime`)
        setTopAnime(resTop.data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }, 500)
  }
  useEffect(() => {
    getData()
    localStorage.removeItem('search')
  }, [])

  const generateArray = () =>
    Array(10)
      .fill()
      .map((item, index) => {
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
            <Skeleton height={220} width={160} />
          </Carousel.Slide>
        )
      })

  return (
    <Layout>
      <Text style={{ borderColor: '#bebebe', borderStyle: 'solid', borderWidth: '0 0 1px' }} transform='capitalize'>
        {loading ? (
          <Skeleton />
        ) : (
          <>
            {data[0]?.season} {data[0]?.year} anime
          </>
        )}
      </Text>
      <MyCarousel
        drag={mobile ? true : false}
        slideGap={mobile ? 'xs' : 'sm'}
        withControls={mobile ? false : true}
        slideSize={mobile ? 'fit-contain' : '162'}
        loop={mobile ? false : true}
        changeSlide='auto'>
        {loading
          ? generateArray()
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
                    to={`/detail/${item.mal_id}`}
                    style={{
                      position: 'relative',
                    }}>
                    <Image imageProps={{ loading: 'loading' }} height={220} width={160} src={item.images.jpg.image_url} withPlaceholder />
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
          ? generateArray()
          : schedule.map((item, index) => {
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
                    to={`/detail/${item.mal_id}`}
                    style={{
                      position: 'relative',
                    }}>
                    <Image imageProps={{ loading: 'loading' }} height={220} width={160} src={item.images.jpg.image_url} withPlaceholder />
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
          ? generateArray()
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
                    to={`/detail/${item.mal_id}`}
                    style={{
                      position: 'relative',
                    }}>
                    <Image imageProps={{ loading: 'loading' }} height={220} width={160} src={item.images.jpg.image_url} withPlaceholder />
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

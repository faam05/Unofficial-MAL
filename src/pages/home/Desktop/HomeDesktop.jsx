import React, { memo } from 'react'
import { Image, Text } from '@mantine/core'
import { NavLink } from 'react-router-dom'
import { Carousel } from '@mantine/carousel'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import CarouselCustom from '../../../components/Carousel'

function HomeDesktop(props) {
  const loading = props.loading
  const dataSchedules = props.schedule
  const dataSeasonNow = props.data
  const dataTopAnime = props.topAnime

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
    <>
      <generateArray />
      <Text style={{ borderColor: '#bebebe', borderStyle: 'solid', borderWidth: '0 0 1px' }} transform='capitalize'>
        {loading ? (
          <Skeleton />
        ) : (
          <>
            {dataSeasonNow[0]?.season} {dataSeasonNow[0]?.year} anime
          </>
        )}
      </Text>
      <CarouselCustom>
        {!loading
          ? dataSeasonNow.map((item, index) => {
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
                    <Image imageProps={{ loading: 'lazy' }} height={220} width={160} src={item.images.jpg.large_image_url} withPlaceholder />
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
            })
          : generateArray()}
      </CarouselCustom>
      <Text
        style={{
          marginTop: '15px',
          borderColor: '#bebebe',
          borderStyle: 'solid',
          borderWidth: '0 0 1px',
        }}>
        {loading ? <Skeleton /> : 'Today Airing'}
      </Text>
      <CarouselCustom>
        {!loading
          ? dataSchedules.map((item, index) => {
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
                    <Image imageProps={{ loading: 'lazy' }} height={220} width={160} src={item.images.jpg.large_image_url} withPlaceholder />
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
            })
          : Array(10)
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
              })}
      </CarouselCustom>
      <Text
        style={{
          marginTop: '15px',
          borderColor: '#bebebe',
          borderStyle: 'solid',
          borderWidth: '0 0 1px',
        }}>
        {loading ? <Skeleton /> : 'Top 25 Anime'}
      </Text>
      <CarouselCustom>
        {!loading
          ? dataTopAnime.map((item, index) => {
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
                    <Image
                      imageProps={{ loading: 'lazy' }}
                      height={220}
                      width={160}
                      src={item.images.jpg.large_image_url}
                      withPlaceholder
                      style={{ position: 'relative' }}
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
            })
          : Array(10)
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
              })}
      </CarouselCustom>
    </>
  )
}

export default memo(HomeDesktop)

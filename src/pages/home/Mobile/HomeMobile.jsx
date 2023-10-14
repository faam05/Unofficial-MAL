import React, { memo } from 'react'
import { Image, Text } from '@mantine/core'
import { createStyles } from '@mantine/core'
import { NavLink } from 'react-router-dom'
import { Carousel } from '@mantine/carousel'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const useStyles = createStyles((_theme, _params, getRef) => ({
  controls: {
    ref: getRef('controls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },

  root: {
    '&:hover': {
      [`& .${getRef('controls')}`]: {
        opacity: 1,
      },
    },
  },
}))

function HomeMobile(props) {
  const { classes } = useStyles()
  const breakpoints = {
    xs: 500,
    sm: 800,
    md: 1000,
    lg: 1200,
    xl: 1400,
  }

  const loading = props.loading
  const dataSchedules = props.schedule
  const dataSeasonNow = props.data

  return (
    <>
      <Text style={{ borderColor: '#bebebe', borderStyle: 'solid', borderWidth: '0 0 1px' }} transform='capitalize'>
        {loading ? (
          <Skeleton />
        ) : (
          <>
            {dataSeasonNow[0]?.season} {dataSeasonNow[0]?.year} anime
          </>
        )}
      </Text>
      <Carousel
        controlSize={40}
        height='auto'
        slideSize='162'
        slideGap='sm'
        loop
        align='start'
        // breakpoints={[
        //   { maxWidth: 'md', slideSize: '50%' },
        //   { maxWidth: 'sm', slideSize: '10%', slideGap: 'sm' },
        // ]}
        style={{
          position: 'relative',
        }}
        classNames={classes}>
        {loading
          ? Array(10)
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
          : props.data.map((item, index) => {
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
      </Carousel>
      <Text
        style={{
          marginTop: '15px',
          borderColor: '#bebebe',
          borderStyle: 'solid',
          borderWidth: '0 0 1px',
        }}>
        {loading ? <Skeleton /> : 'Today Airing'}
      </Text>
      <Carousel
        controlSize={40}
        height='auto'
        slideSize='162'
        slideGap='sm'
        loop
        align='start'
        // breakpoints={[
        //   { maxWidth: 'md', slideSize: '50%' },
        //   { maxWidth: 'sm', slideSize: '10%', slideGap: 'sm' },
        // ]}
        style={{
          position: 'relative',
        }}
        classNames={classes}>
        {loading
          ? Array(10)
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
          : props.schedule.map((item, index) => {
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
      </Carousel>
    </>
  )
}

export default memo(HomeMobile)

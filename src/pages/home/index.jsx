import { Image, Text } from '@mantine/core'
import { createStyles } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/layouts'
import Layout3 from '../../components/layouts/index3'
import axios from 'axios'
import { useMediaQuery } from '@mantine/hooks'
import { NavLink } from 'react-router-dom'
import { Carousel } from '@mantine/carousel'

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

export default function Home() {
  const [data, setData] = useState(null)
  const { classes } = useStyles()

  const getData = async () => {
    const { data } = await axios(`https://api.jikan.moe/v4/seasons/now`)
    setData(data.data)
  }
  useEffect(() => {
    getData()
    localStorage.removeItem('search')
  }, [])

  const matches = useMediaQuery('(min-width: 768px)')

  return (
    <Layout>
      {data && data.length > 0 ? (
        <>
          <Text style={{ borderColor: '#bebebe', borderStyle: 'solid', borderWidth: '0 0 1px' }} transform='capitalize'>
            {data[0].season} {data[0].year} anime
          </Text>
          <Carousel
            controlSize={40}
            height='auto'
            slideSize='162'
            slideGap='sm'
            loop
            align='start'
            breakpoints={[
              { maxWidth: 'md', slideSize: '50%' },
              { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
            ]}
            style={{
              position: 'relative',
            }}
            classNames={classes}>
            {data.map((item, index) => {
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
            Latest Updated Episode Videos
          </Text>
        </>
      ) : (
        // <Text>Loading..</Text>
        <div></div>
      )}
    </Layout>
  )
}

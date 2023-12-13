import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Carousel } from '@mantine/carousel'
import { Image, Text } from '@mantine/core'
import RecomendationMLoading from '../../../components/loading/LRecomendationM'
import MyCarousel from '../../../components/Carousel'

const RecommendationM = ({ accordionValue, id, loaded }) => {
  const params = useParams()
  const [dataRecommendation, setDataRecommendation] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const getRecommendation = async () => {
    try {
      if (dataRecommendation.length == 0 || id != params.id) {
        const { data } = await axios(`https://api.jikan.moe/v4/anime/${id}/recommendations`)
        setDataRecommendation(data.data)
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      setError(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (loaded && accordionValue == 'recomendations' && params.id == id) {
      getRecommendation()
    }
  }, [params.id, loaded, accordionValue])

  return (
    <>
      {loading && !error ? (
        <RecomendationMLoading />
      ) : error ? (
        <p>Something went wrong...</p>
      ) : (
        <MyCarousel drag slideGap='1px' withControls={false} slideSize='fit-contain'>
          {dataRecommendation?.map((item, index) => {
            return (
              <Carousel.Slide key={index}>
                <NavLink
                  to={`/detail/${item.entry.mal_id}`}
                  style={{
                    position: 'relative',
                  }}>
                  <Image
                    imageProps={{ loading: 'lazy' }}
                    height={126}
                    width={90}
                    src={item.entry.images.jpg.image_url}
                    withPlaceholder
                    style={{ position: 'relative' }}
                  />
                  <Text
                    color='white'
                    fz={8}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      fontWeight: 600,
                      padding: '0px 5px',
                      background: `linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)`,
                    }}>
                    {item.votes != null || item.votes != 0 ? <span>{item.votes} users</span> : 'N / A'}
                  </Text>
                  <Text
                    fz={10}
                    style={{
                      width: '100%',
                      fontWeight: 400,
                      padding: '15px 5px 5px',
                      bottom: 0,
                      position: 'absolute',
                      color: '#fff',
                      background: `linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)`,
                    }}>
                    {item.entry.title}
                  </Text>
                </NavLink>
              </Carousel.Slide>
            )
          })}
        </MyCarousel>
      )}
    </>
  )
}

export default RecommendationM

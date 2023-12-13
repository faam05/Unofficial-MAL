import { Carousel } from '@mantine/carousel'
import { Flex, Image, Text } from '@mantine/core'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useParams } from 'react-router-dom'

const CharactersMobile = ({ accordionValue, id, loaded }) => {
  const params = useParams()

  const [dataAccordion, setDataAccordion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const getDataAccordion = async () => {
    if (params.id != id) {
      setLoading(true)
    }
    try {
      if (accordionValue == 'characters') {
        const { data } = await axios(`https://api.jikan.moe/v4/anime/${params.id}/characters`)
        setDataAccordion(data.data)
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      setError(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (loaded) {
      getDataAccordion()
    }
  }, [params.id, loaded])

  return (
    <>
      {error ? (
        <Text>Something went wrong</Text>
      ) : !loading && !error ? (
        <>
          <Carousel
            align='start'
            dragFree
            withControls={false}
            slideSize='160'
            style={{
              position: 'relative',
            }}>
            {dataAccordion?.map((item, index) => {
              if (item.voice_actors[0]) {
                return (
                  <Carousel.Slide key={index}>
                    <Flex>
                      <Image
                        imageProps={{ loading: 'lazy' }}
                        h={108.88}
                        withPlaceholder
                        width={70}
                        src={item.character.images.jpg.image_url}
                        alt={item.name}
                      />
                      <Text
                        color='white'
                        fz={8}
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          fontWeight: 400,
                          padding: '0px 5px',
                          background: `linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)`,
                        }}>
                        {Number(item.favorites).toLocaleString()} users
                      </Text>
                      <Text
                        fz={8}
                        truncate
                        color='white'
                        style={{
                          width: '100%',
                          top: 78,
                          fontWeight: 400,
                          padding: '15px 5px 5px',
                          position: 'absolute',
                          background: `linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)`,
                        }}>
                        {item.character.name}
                      </Text>
                    </Flex>
                    <Flex>
                      <Image
                        imageProps={{ loading: 'lazy' }}
                        withPlaceholder
                        width={70}
                        src={item.voice_actors[0]?.person.images.jpg.image_url}
                        alt={item.name}
                      />
                      <Text
                        truncate
                        fz={8}
                        color='white'
                        style={{
                          width: '100%',
                          fontWeight: 400,
                          padding: '15px 5px 5px',
                          bottom: 0,
                          position: 'absolute',
                          background: `linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)`,
                        }}>
                        {item.voice_actors[0]?.person.name}
                      </Text>
                    </Flex>
                  </Carousel.Slide>
                )
              }
            })}
          </Carousel>
        </>
      ) : (
        <>
          <Carousel
            align='start'
            dragFree
            withControls={false}
            slideSize='160'
            style={{
              position: 'relative',
            }}>
            {Array(10)
              .fill()
              .map((item, index) => (
                <Carousel.Slide key={index}>
                  <Skeleton height={108.88} width={70} count={2} />
                </Carousel.Slide>
              ))}
          </Carousel>
        </>
      )}
    </>
  )
}

export default CharactersMobile

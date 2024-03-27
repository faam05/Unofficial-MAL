import { Card, Flex, Image, SimpleGrid, Text } from '@mantine/core'
import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useParams } from 'react-router-dom'
import { useMobileDevice } from '../hooks/useMobileDevice'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '../utils'

export default function Characters({ activeTab }) {
  const mobile = useMobileDevice()
  const { id } = useParams()

  // const getData = async () => {
  //   if (params.id != id) {
  //     setLoading(true)
  //   }
  //   try {
  //     if (dataCharacters.length == 0 || id != params.id) {
  //       const { data } = await axios(`https://api.jikan.moe/v4/anime/${params.id}/characters`)
  //       setDataCharacters(data.data)
  //       setLoading(false)
  //     }
  //   } catch (error) {
  //     console.error(error)
  //     setError(true)
  //     setLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   if (activeTab === 'characters') {
  //     getData()
  //   }
  // }, [params.id, activeTab])

  const { data, isLoading, isError } = useQuery({
    queryKey: ['characters', id],
    queryFn: async () => fetcher(`https://api.jikan.moe/v4/anime/${id}/characters`),
    // retry: 10,
  })

  return (
    <>
      {!isLoading && !isError ? (
        <>
          <div style={{ borderStyle: 'solid', borderWidth: '0 0 1px' }}>
            <div style={{ display: 'flex' }}>
              <span>Characters</span>
              <span style={{ marginLeft: 'auto' }}>Voice Actors</span>
            </div>
          </div>
          {data.map((item, index) => {
            return (
              <SimpleGrid cols={2} key={index} p={'5px 0'} bg={index % 2 == 0 ? 'white' : '#f8f8f8'}>
                <Flex>
                  <Image
                    imageProps={{ loading: 'lazy' }}
                    withPlaceholder
                    height={200}
                    width={120}
                    src={item.character.images.webp.image_url}
                    alt={item.name}
                  />
                  <div style={{ marginLeft: '10px' }}>
                    <Text fz={14}>{item.character.name}</Text>
                    <Text fz={14}>{item.role}</Text>
                    <Text fz={14}>{Number(item.favorites).toLocaleString()} Favorites</Text>
                  </div>
                </Flex>
                <div style={{ marginLeft: 'auto' }}>
                  {item.voice_actors.map((item, index) => {
                    return (
                      <Flex key={index} ta='right' ml={'auto'} justify={'right'}>
                        <div style={{ padding: '0 4px' }}>
                          <Text fz={12}>{item.person.name}</Text>
                          <Text fz={12}>{item.language}</Text>
                        </div>
                        <a href={item.person.url} target='_blank'>
                          <Image imageProps={{ loading: 'lazy' }} withPlaceholder width={42} height={62} src={item.person.images.jpg.image_url} />
                        </a>
                      </Flex>
                    )
                  })}
                </div>
              </SimpleGrid>
            )
          })}
        </>
      ) : isError ? (
        <Card shadow='sm' p={20} radius={10} mt={10} style={{ textAlign: 'center' }}>
          <Text fz={20}>Something went wrong</Text>
        </Card>
      ) : (
        <>
          <Text style={{ borderStyle: 'solid', borderWidth: '0 0 1px' }} p={3}>
            <Skeleton />
          </Text>
          {Array(10)
            .fill()
            .map((item, index) => {
              return (
                <SimpleGrid cols={2} key={index} p={'5px 0'} bg={index % 2 == 0 ? 'white' : '#f8f8f8'}>
                  <Flex>
                    <Skeleton height={200} width={120} />
                    <div style={{ marginLeft: '10px' }}>
                      <Skeleton count={2} width={50} />
                      <Skeleton width={100} />
                    </div>
                  </Flex>
                  <div style={{ marginLeft: 'auto' }}>
                    <Flex ta='right' ml={'auto'} justify={'right'}>
                      <div style={{ padding: '0 4px' }}>
                        <Skeleton count={2} width={100} />
                      </div>
                      <Skeleton height={62} width={42} />
                    </Flex>
                  </div>
                </SimpleGrid>
              )
            })}
        </>
      )}
    </>
  )
}

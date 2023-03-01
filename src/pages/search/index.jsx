import { Anchor, Badge, Card, CardSection, Center, Flex, Grid, Group, Image, Rating, SimpleGrid, Spoiler, Stack, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconBrandYoutube } from '@tabler/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Search() {
  const params = useParams()
  const [data, setData] = useState(null)

  const getData = async () => {
    const { data } = await axios(`https://api.jikan.moe/v4/anime?q=${params.value}`)
    setData(data.data)
  }
  useEffect(() => {
    getData()
  }, [params])

  const matches = useMediaQuery('(min-width: 768px)')

  return (
    <>
      <Text>Result</Text>
      {data ? (
        data.length > 0 ? (
          <SimpleGrid cols={matches ? 2 : 1} style={{ marginTop: '10px' }}>
            {data.map((item, index) => {
              return (
                <Card key={index} shadow='sm' radius='md'>
                  <SimpleGrid cols={2}>
                    <div>
                      <Center>
                        <Flex direction={'column'}>
                          <Image height={matches ? 250 : 150} fit='contain' mr={10} src={item.images.jpg.image_url} />
                          <Text ta={'center'} fz={'xs'}>
                            {item.aired.string}
                          </Text>
                          <Flex justify={'space-evenly'}>
                            <Rating size={matches ? 'md' : 'xs'} value={item.score / 2} fractions={2} readOnly />
                            <Badge size={matches ? 'md' : 'xs'}>{Number(item.score).toFixed(2)}</Badge>
                          </Flex>
                          <Text ta={'center'}>
                            {item.studios.length > 0
                              ? item.studios.map((studio, index) => {
                                  return (
                                    <Badge key={index} m='10px 1px' color={'gray'} size={matches ? 'md' : 'xs'}>
                                      {studio.name}
                                    </Badge>
                                  )
                                })
                              : item.producers.map((item, index) => {
                                  return (
                                    <Badge key={index} m='10px 1px' color={'gray'}>
                                      {item.name}
                                    </Badge>
                                  )
                                })}
                          </Text>
                        </Flex>
                      </Center>
                    </div>
                    <div>
                      <Text mt={matches ? 10 : 0} fz={matches ? 'md' : 'sm'}>
                        <Anchor href={`/detail/${item.mal_id}`}>{item.title}</Anchor>
                      </Text>
                      <Flex mt={matches ? 10 : 5}>
                        <Text fz={matches ? 'md' : 11}>
                          {item.type} {item.episodes ? `(${item.episodes} episodes)` : `( ${item.status} )`}
                        </Text>
                        {item.trailer.url ? (
                          <a target={'_blank'} style={{ marginLeft: matches ? 10 : 0 }} href={item.trailer.url}>
                            <IconBrandYoutube />
                          </a>
                        ) : null}
                      </Flex>
                      <SimpleGrid cols={2} mt={10}>
                        {item.genres.map((genre, index) => {
                          return (
                            <Badge key={index} size={matches ? 'md' : 'xs'} color={'gray'}>
                              {genre.name}
                            </Badge>
                          )
                        })}
                      </SimpleGrid>
                      {matches ? (
                        <Spoiler maxHeight={120} showLabel='Show more' hideLabel='Hide' mt={10} fz='sm'>
                          {item.synopsis ? item.synopsis : 'No synopsis given.'}
                        </Spoiler>
                      ) : (
                        <Text mt={10} fz='xs'>
                          {item.synopsis ? (item.synopsis.length > 100 ? item.synopsis.slice(0, 100) + '...' : item.synopsis) : 'No synopsis given.'}
                        </Text>
                      )}
                    </div>
                  </SimpleGrid>
                </Card>
              )
            })}
          </SimpleGrid>
        ) : (
          <p>Tidak ada data</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

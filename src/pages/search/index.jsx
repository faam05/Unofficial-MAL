import { Anchor, Badge, Card, CardSection, Center, Flex, Grid, Group, Image, Rating, SimpleGrid, Spoiler, Stack, Text } from '@mantine/core'
import { IconBrandYoutube } from '@tabler/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Layout from '../../components/layouts'

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
  return (
    <>
      <div>Search</div>
      <Link to={'/'}>Home</Link>
      <Link to={'/about'}>About</Link>

      <SimpleGrid cols={2} style={{ marginTop: '10px' }}>
        {data
          ? data.map((item, index) => {
              return (
                <Card key={index} shadow='sm' radius='md'>
                  {/* <Flex>
                      <Image height={250} width={150} fit='contain' mr={10} src={item.images.jpg.image_url} />
                      <div style={{ textAlign: 'center' }}>
                        <Text fz={'xs'}>{item.aired.string}</Text>
                        <Rating value={item.score / 2} fractions={2} readOnly />
                      </div>
                      <Text mt={10} fz='md'>
                        {item.title}
                      </Text>
                    </Flex> */}
                  <SimpleGrid cols={2}>
                    <div>
                      <Center>
                        <Flex direction={'column'}>
                          <Image height={200} fit='contain' mr={10} src={item.images.jpg.image_url} />
                          <Text ta={'center'} fz={'xs'}>
                            {item.aired.string}
                          </Text>
                          <Rating style={{ alignSelf: 'center' }} value={item.score / 2} fractions={2} readOnly />
                          <Text ta={'center'}>
                            {item.studios.length > 0
                              ? item.studios.map((studio, index) => {
                                  return (
                                    <Badge key={index} m='10px 1px' color={'gray'}>
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
                      <Text mt={10} fz='md'>
                        <Anchor href={item.url} target='_blank'>
                          {item.title}
                        </Anchor>
                      </Text>
                      <Flex mt={10} fz='sm'>
                        <Text>
                          {item.type} {item.episodes ? `(${item.episodes} episodes)` : `( ${item.status} )`}
                        </Text>
                        {item.trailer.url ? (
                          <a target={'_blank'} style={{ marginLeft: 10 }} href={item.trailer.url}>
                            <IconBrandYoutube />
                          </a>
                        ) : null}
                      </Flex>
                      {item.genres.map((genre, index) => {
                        return (
                          <Badge key={index} m='10px 1px' color={'gray'}>
                            {genre.name}
                          </Badge>
                        )
                      })}
                      <Spoiler maxHeight={120} showLabel='Show more' hideLabel='Hide' mt={10} fz='sm'>
                        {item.synopsis}
                      </Spoiler>
                    </div>
                  </SimpleGrid>
                </Card>
              )
            })
          : null}
      </SimpleGrid>
    </>
  )
}

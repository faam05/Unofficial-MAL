import { Badge, Card, Center, Flex, Image, Rating, SimpleGrid, Spoiler, Text } from '@mantine/core'
import { IconBrandYoutube } from '@tabler/icons'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useMobileDevice } from '../../hooks'

const DisplayCard = ({ data }) => {
  const matches = useMobileDevice()

  return (
    <SimpleGrid cols={matches ? 1 : 2} style={{ marginTop: '10px' }}>
      {data.map((item, index) => {
        return (
          <Card key={index} shadow='sm' radius='md'>
            <SimpleGrid cols={2}>
              {/* Left content */}
              <div>
                <Center>
                  <Flex direction={'column'} style={{ width: '100%' }}>
                    <NavLink to={`/detail/${item.mal_id}`}>
                      <Image
                        imageProps={{ loading: 'lazy' }}
                        height={!matches ? 250 : 150}
                        fit='contain'
                        mr={10}
                        src={item.images.jpg.image_url}
                        withPlaceholder
                      />
                    </NavLink>
                    <Text ta={'center'} fz={'xs'}>
                      {item.aired.string}
                    </Text>
                    <Flex justify={'space-evenly'}>
                      <Rating size={!matches ? 'md' : 'xs'} value={item.score / 2} fractions={2} readOnly />
                      <Badge size={!matches ? 'md' : 'xs'}>{Number(item.score).toFixed(2)}</Badge>
                    </Flex>
                    <Text ta={'center'}>
                      {item.studios.length > 0
                        ? item.studios.map((studio, index) => {
                            return (
                              <Badge key={index} color={'gray'} size={!matches ? 'md' : 'xs'} style={{ maxWidth: 'calc(100% - 0px)' }}>
                                {studio.name}
                              </Badge>
                            )
                          })
                        : item.producers.map((item, index) => {
                            return (
                              <Badge key={index} color={'gray'} style={{ maxWidth: 'calc(100% - 0px)' }}>
                                {item.name}
                              </Badge>
                            )
                          })}
                    </Text>
                  </Flex>
                </Center>
              </div>
              {/* Right content */}
              <div>
                <Text mt={!matches ? 10 : 0} fz={!matches ? 'md' : 'sm'}>
                  <NavLink to={`/detail/${item.mal_id}`} style={{ textDecoration: 'none' }}>
                    {item.title}
                  </NavLink>
                </Text>
                <Flex mt={!matches ? 10 : 5}>
                  <Text fz={!matches ? 'md' : 11}>
                    {item.type} {item.episodes ? `(${item.episodes} episodes)` : `( ${item.status} )`}
                  </Text>
                  {item.trailer.url ? (
                    <a target={'_blank'} style={{ marginLeft: !matches ? 10 : 0 }} href={item.trailer.url}>
                      <IconBrandYoutube />
                    </a>
                  ) : null}
                </Flex>
                <SimpleGrid cols={2} mt={10}>
                  {item.genres.map((genre, index) => {
                    return (
                      <Badge key={index} size={!matches ? 'md' : 'xs'} color={'gray'}>
                        {genre.name}
                      </Badge>
                    )
                  })}
                </SimpleGrid>
                {!matches ? (
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
  )
}

export default DisplayCard

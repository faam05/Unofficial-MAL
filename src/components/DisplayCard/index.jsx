import { ActionIcon, Badge, Card, Center, Flex, Image, Rating, SimpleGrid, Spoiler, Text } from '@mantine/core'
import { IconBrandYoutube } from '@tabler/icons-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useMobileDevice } from '../../hooks/useMobileDevice'

const DisplayCard = ({ data }) => {
  const matches = useMobileDevice()

  return (
    <SimpleGrid cols={matches ? (window.innerWidth < 768 ? 1 : 2) : 2} style={{ marginTop: '10px' }}>
      {data.map((item, index) => {
        return (
          <Card key={index} shadow='sm' radius='md'>
            <SimpleGrid cols={2}>
              {/* Left content */}
              <div>
                <Center>
                  <Flex direction={'column'} style={{ width: '100%' }}>
                    <NavLink to={`/detail/${item.mal_id}`}>
                      <Image height={!matches ? 250 : 150} fit='contain' mr={10} src={item.images.jpg.image_url} />
                    </NavLink>
                    <Text ta={'center'} fz={'xs'}>
                      {item.aired.string}
                    </Text>
                    <Flex justify={'space-evenly'}>
                      <Rating size={!matches ? 'md' : 'xs'} value={item.score / 2} fractions={2} readOnly />
                      <Badge size={!matches ? 'md' : 'xs'}>{Number(item.score).toFixed(2)}</Badge>
                    </Flex>
                    <Text ta='center' span>
                      {item.studios.length > 0
                        ? item.studios.map((studio, index) => {
                            return (
                              <Badge key={index} variant='light' color='gray' size={!matches ? 'md' : 'xs'} style={{ maxWidth: 'calc(100% - 0px)' }}>
                                {studio.name}
                              </Badge>
                            )
                          })
                        : item.producers.map((item, index) => {
                            return (
                              <Badge key={index} variant='light' color='gray' style={{ maxWidth: 'calc(100% - 0px)' }}>
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
                <Center>
                  <Text mt={!matches ? 10 : 0} fz={!matches ? 'md' : 'sm'} ta='justify'>
                    <NavLink to={`/detail/${item.mal_id}`} style={{ textDecoration: 'none' }}>
                      {item.title}
                    </NavLink>
                  </Text>
                </Center>
                <Flex mt={!matches ? 10 : 5} style={{ alignItems: 'center', justifyContent: 'space-evenly' }}>
                  <Text fz={!matches ? 'md' : 12} truncate='end' inherit>
                    {item.type} {item.episodes ? `( ${item.episodes} episodes )` : `(${item.status})`}
                  </Text>
                  {item.trailer.url ? (
                    <ActionIcon variant='transparent' color='red' component='a' href={item.trailer.url}>
                      <IconBrandYoutube />
                    </ActionIcon>
                  ) : null}
                </Flex>
                <Center>
                  <SimpleGrid cols={2} mt={10}>
                    {item.genres.map((genre, index) => {
                      return (
                        <Badge key={index} size={!matches ? 'md' : 'xs'} variant='light' color='gray' maw={'calc(100% + 10px)'}>
                          <Text inherit span truncate='end'>
                            {genre.name}
                          </Text>
                        </Badge>
                      )
                    })}
                  </SimpleGrid>
                </Center>
                {!matches ? (
                  <Spoiler maxHeight={120} showLabel='Show more' hideLabel='Hide' mt={10} fz='sm' ta='justify'>
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

import { ActionIcon, Badge, Card, Center, Flex, Rating, SimpleGrid, Spoiler, Text } from '@mantine/core'
import { NavLink } from 'react-router-dom'
import { IconBrandYoutube } from '@tabler/icons-react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useMobileDevice } from '../../hooks/useMobileDevice'
import 'react-lazy-load-image-component/src/effects/blur.css'

const DisplayCard = ({ data }) => {
  const mobile = useMobileDevice()

  return (
    <SimpleGrid className='mt-[10px]' cols={mobile ? (window.innerWidth > 579 ? 2 : 1) : 2}>
      {data.map((item, index) => {
        return (
          <Card key={index} shadow='sm' radius='md'>
            <SimpleGrid cols={2}>
              {/* Left content */}
              <div>
                <Center>
                  <Flex className='w-full' direction={'column'}>
                    <NavLink to={`/detail/${item.mal_id}`}>
                      <LazyLoadImage
                        className='mr-[10px] object-contain'
                        src={item.images.webp.large_image_url}
                        placeholderSrc={item.images.webp.small_image_url}
                        alt={item.title.replace(/[ , -]/g, '_')}
                        effect='blur'
                      />
                    </NavLink>
                    <Text ta={'center'} fz={'xs'}>
                      {item.aired.string}
                    </Text>
                    <Flex justify={'space-evenly'}>
                      <Rating size={!mobile ? 'md' : 'xs'} value={item.score / 2} fractions={2} readOnly />
                      <Badge size={!mobile ? 'md' : 'xs'}>{Number(item.score).toFixed(2)}</Badge>
                    </Flex>
                    <Text ta='center' span>
                      {item.studios.length > 0
                        ? item.studios.map((studio, index) => {
                            return (
                              <Badge key={index} className='max-w-[calc(100%-0px)]' variant='light' color='gray' size={!mobile ? 'md' : 'xs'}>
                                {studio.name}
                              </Badge>
                            )
                          })
                        : item.producers.map((item, index) => {
                            return (
                              <Badge key={index} className='max-w-[calc(100%-0px)]' variant='light' color='gray'>
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
                  <Text mt={!mobile ? 10 : 0} fz={!mobile ? 'md' : 'sm'} ta='justify'>
                    <NavLink to={`/detail/${item.mal_id}`} style={{ textDecoration: 'none' }}>
                      {item.title}
                    </NavLink>
                  </Text>
                </Center>
                <Flex className='items-center justify-evenly' mt={!mobile ? 10 : 5}>
                  <Text fz={!mobile ? 'md' : 12} truncate='end' inherit>
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
                        <Badge key={index} size={!mobile ? 'md' : 'xs'} variant='light' color='gray' maw={'calc(100% + 10px)'}>
                          <Text inherit span truncate='end'>
                            {genre.name}
                          </Text>
                        </Badge>
                      )
                    })}
                  </SimpleGrid>
                </Center>
                {!mobile ? (
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

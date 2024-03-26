import { Card, Flex, Image, Spoiler, Tabs, Text, Title } from '@mantine/core'
import Characters from '../../../components/Characters'
import Information from '../../../components/Information'
import StaffDesktop from '../../../components/Staff'
import { useEffect, useState, lazy, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import { useQuery } from '@tanstack/react-query'

// const Characters = lazy(() => wait(10000).then(() => import('../../../components/Characters')))

export default function DetailDesktop() {
  const params = useParams()
  const [id, setId] = useState(null)
  const [activeTab, setActiveTab] = useState('details')

  // get details anime
  const { data, isLoading, isError } = useQuery({
    queryKey: ['details', params.id],
    queryFn: async () => {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${params.id}/full`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const { data } = await response.json()
      setId(data.mal_id)
      return data
    },
    // retry: 10,
  })

  // const { refetch } = useQuery({
  //   queryKey: ['videos', params.id],
  //   queryFn: async () => {
  //     const response = await fetch(`https://api.jikan.moe/v4/anime/${params.id}/videos`)
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok')
  //     }
  //     const { data } = await response.json()
  //     setId(data.mal_id)
  //     return data
  //   },
  //   enabled: false,
  //   // retry: 10,
  // })

  if (isError) return <p>Something went wrong</p>

  return (
    <>
      <Card shadow='sm' p='lg' radius='md' withBorder>
        <div className='h1 detail-title'>{isLoading ? <Skeleton /> : <Text fz={16}>{data.title}</Text>}</div>
        <div className='detail content-wrapper'>
          <div className='detail content-left'>
            {isLoading ? (
              <>
                <Skeleton width={225} height={330} />
                <div style={{ marginTop: 10 }}>
                  <Title order={5} fz={12} style={{ borderStyle: 'solid', borderColor: '#bebebe', borderWidth: '0 0 1px' }} p='3px 0'>
                    <Skeleton width={100} />
                  </Title>
                  <Skeleton height={60} />
                </div>
              </>
            ) : (
              <>
                <Image imageProps={{ loading: 'lazy' }} width={225} src={data.images.webp.image_url} alt={data.title} withPlaceholder />
                <div style={{ marginTop: 10 }}>
                  <Title order={5} fz={12} style={{ borderStyle: 'solid', borderColor: '#bebebe', borderWidth: '0 0 1px' }} p='3px 0'>
                    Alternative Titles
                  </Title>
                  <Spoiler my={10} maxHeight={60} fz={12} showLabel='More titles' hideLabel='Less titles'>
                    <div>
                      {data.titles
                        .filter((item) => item.type != 'Default')
                        .map((item, index) => {
                          return (
                            <div key={index}>
                              <span style={{ fontWeight: 700 }}>{item.type + ': '}</span>
                              <span>{item.title}</span>
                            </div>
                          )
                        })}
                    </div>
                  </Spoiler>
                </div>
                <div>
                  <Title order={5} fz={12} style={{ borderStyle: 'solid', borderColor: '#bebebe', borderWidth: '0 0 1px' }} p='3px 0'>
                    Information
                  </Title>
                  <div style={{ padding: '3px 0', fontSize: 11, lineHeight: '1.53m' }}>
                    <Flex>
                      {data.type && (
                        <>
                          <Text fw={700}>Type:</Text>
                          <Text ml={5}>{data.type}</Text>
                        </>
                      )}
                    </Flex>
                    <Flex>
                      {data.episodes && (
                        <>
                          <Text fw={700}>Episodes:</Text>
                          <Text ml={5}>{data.episodes}</Text>
                        </>
                      )}
                    </Flex>
                    <Flex>
                      {data.status && (
                        <>
                          <Text fw={700}>Status:</Text>
                          <Text ml={5}>{data.status}</Text>
                        </>
                      )}
                    </Flex>
                    <Flex>
                      {data.aired && (
                        <>
                          <Text fw={700}>Aired:</Text>
                          <Text ml={5}>{data.aired.string}</Text>
                        </>
                      )}
                    </Flex>
                    <Flex>
                      {data.producers.length === 0 ? null : (
                        <div>
                          <span style={{ fontWeight: 700 }}>Producers: </span>
                          {data.producers.map((item, index) => {
                            return <span key={index}>{index !== data.producers.length - 1 ? ' ' + item.name + ', ' : item.name}</span>
                          })}
                        </div>
                      )}
                    </Flex>
                    <Flex>
                      {data.licensors.length === 0 ? null : (
                        <div>
                          <span style={{ fontWeight: 700 }}>Licensors: </span>
                          {data.licensors.map((item, index) => {
                            return <span key={index}>{index !== data.licensors.length - 1 ? item.name + ', ' : item.name}</span>
                          })}
                        </div>
                      )}
                    </Flex>
                    <Flex>
                      {data.studios.length === 0 ? null : (
                        <div>
                          <span style={{ fontWeight: 700 }}>Studios: </span>
                          {data.studios.map((item, index) => {
                            return <span key={index}>{index !== data.studios.length - 1 ? item.name + ', ' : item.name}</span>
                          })}
                        </div>
                      )}
                    </Flex>
                    <Flex>
                      {data.source && (
                        <>
                          <Text fw={700}>Source:</Text>
                          <Text ml={5}>{data.source}</Text>
                        </>
                      )}
                    </Flex>
                    <Flex>
                      {data.genres.length === 0 ? null : (
                        <div>
                          <span style={{ fontWeight: 700 }}>Genres: </span>
                          {data.genres.map((item, index) => {
                            return <span key={index}>{index !== data.genres.length - 1 ? item.name + ', ' : item.name}</span>
                          })}
                        </div>
                      )}
                    </Flex>
                    <Flex>
                      {data.themes.length === 0 ? null : (
                        <div>
                          <span style={{ fontWeight: 700 }}>Themes: </span>
                          {data.themes.map((item, index) => {
                            return <span key={index}>{index !== data.themes.length - 1 ? item.name + ', ' : item.name}</span>
                          })}
                        </div>
                      )}
                    </Flex>
                    <Flex>
                      {data.demographics.length === 0 ? null : (
                        <div>
                          <span style={{ fontWeight: 700 }}>Demographics: </span>
                          {data.demographics.map((item, index) => {
                            return <span key={index}>{index !== data.demographics.length - 1 ? item.name + ', ' : item.name}</span>
                          })}
                        </div>
                      )}
                    </Flex>
                    <Flex>
                      {data.duration && (
                        <>
                          <Text fw={700}>Duration:</Text>
                          <Text ml={5}>{data.duration}</Text>
                        </>
                      )}
                    </Flex>
                    <Flex>
                      {data.rating && (
                        <>
                          <Text fw={700}>Rating:</Text>
                          <Text ml={5}>{data.rating}</Text>
                        </>
                      )}
                    </Flex>
                  </div>
                </div>
                <div>
                  <Title order={5} fz={12} style={{ borderStyle: 'solid', borderColor: '#bebebe', borderWidth: '0 0 1px' }} p='3px 0'>
                    Statistics
                  </Title>
                  <div style={{ padding: '3px 0', fontSize: 11, lineHeight: '1.53m' }}>
                    <Flex>
                      {data.score && (
                        <>
                          <Text fw={700}>Score : </Text>
                          <Text ml={5}>
                            {data.score} (scored by {Number(data.scored_by).toLocaleString()} users)
                          </Text>
                        </>
                      )}
                    </Flex>
                    <Flex>
                      {data.rank && (
                        <>
                          <Text fw={700}>Ranked : </Text>
                          <Text ml={5}>#{data.rank}</Text>
                        </>
                      )}
                    </Flex>
                    <Flex>
                      {data.popularity && (
                        <>
                          <Text fw={700}>Popularity : </Text>
                          <Text ml={5}>#{data.popularity}</Text>
                        </>
                      )}
                    </Flex>
                    <Flex>
                      {data.members && (
                        <>
                          <Text fw={700}>Members : </Text>
                          <Text ml={5}>{Number(data.members).toLocaleString()}</Text>
                        </>
                      )}
                    </Flex>
                    <Flex>
                      {data.favorites && (
                        <>
                          <Text fw={700}>Favorites : </Text>
                          <Text ml={5}>{Number(data.favorites).toLocaleString()}</Text>
                        </>
                      )}
                    </Flex>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className='detail content-right' style={{ maxWidth: '400px' }}>
            <Tabs value={activeTab} onTabChange={setActiveTab}>
              <Tabs.List>
                <Tabs.Tab value='details'>Detail</Tabs.Tab>
                <Tabs.Tab value='characters'>Characters & Voice Actors</Tabs.Tab>
                <Tabs.Tab value='staff'>Staff</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value='details'>
                <Information data={data} loading={isLoading} />
              </Tabs.Panel>
              <Tabs.Panel value='characters'>
                <Characters activeTab={activeTab} id={id} />
              </Tabs.Panel>
              <Tabs.Panel value='staff'>
                <StaffDesktop activeTab={activeTab} id={id} />
              </Tabs.Panel>
            </Tabs>
          </div>
        </div>
      </Card>
    </>
  )
}

// function wait(time) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, time)
//   })
// }

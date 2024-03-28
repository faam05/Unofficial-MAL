import { Suspense, lazy, useState, useEffect } from 'react'
import { Card, Flex, Image, Spoiler, Tabs, Text, Title, Anchor, Badge, Group, List, Accordion } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useMobileDevice } from '../hooks/useMobileDevice'
import { fetcher } from '../utils'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import '../styles/detail.css'
import Layout from '../components/layouts'
const Information = lazy(() => import('../components/Information'))
const Characters = lazy(() => import('../components/Characters'))
const Staff = lazy(() => import('../components/Staff'))
const InformationModal = lazy(() => import('../components/InformationModal'))
const Recommendation = lazy(() => import('../components/Recommendation'))
import CarouselLoading from '../components/loading/CarouselLoading'

function Detail() {
  const { id } = useParams()
  const mobile = useMobileDevice()

  // Desktop
  const [activeTab, setActiveTab] = useState('details')

  // mobile
  const [nowId, setNowId] = useState(id)
  const [opened, setOpened] = useState(false)
  const [accordionValue, setAccordionValue] = useState('characters')

  useEffect(() => {
    if (nowId !== id) {
      window.scrollTo(0, 0)
      setNowId(id)
      setAccordionValue('characters')
    }
  }, [id])

  // get details anime
  const { data, isLoading, isError } = useQuery({
    queryKey: ['details', id],
    queryFn: () => fetcher(`https://api.jikan.moe/v4/anime/${id}/full`),
    // retry: 10,
  })

  // get recommendations anime
  useQuery({
    queryKey: ['recommendations', id],
    queryFn: () => fetcher(`https://api.jikan.moe/v4/anime/${id}/recommendations`),
    // retry: 10,
  })

  if (isError) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Text>Something went wrong when fetching Details Anime</Text>
      </div>
    )
  }

  return (
    <Layout>
      {mobile ? (
        <>
          <div className='top'>
            <div className='h1 detail-title'>
              <Text fz={16}>{isLoading ? <Skeleton /> : data.title}</Text>
            </div>
            <div className='content-wrapper'>
              {isLoading ? (
                <Skeleton height={200} width={140} />
              ) : (
                <div className='content-left' style={{ backgroundImage: `url('${data.images.webp.image_url}')` }} />
              )}
              <div className='content-right'>
                <List>
                  <List.Item>
                    <Badge size='xs' style={{ marginRight: 10 }}>
                      {isLoading ? <Skeleton width={20} /> : Number(data.score)}
                    </Badge>
                    {isLoading ? (
                      <Skeleton width={100} />
                    ) : (
                      <span style={{ fontSize: '0.7rem', color: '#7a7a7a' }}>({Number(data.scored_by).toLocaleString()} users)</span>
                    )}
                  </List.Item>
                  <List.Item>{isLoading ? <Skeleton width={100} /> : <Text fz={12}>Ranked #{data.rank}</Text>}</List.Item>
                  <List.Item>{isLoading ? <Skeleton width={50} /> : <Text fz={12}>{data.type}</Text>}</List.Item>
                  <List.Item style={{ lineHeight: isLoading ? '1.25rem' : '1rem' }}>
                    {isLoading ? (
                      <>
                        <Skeleton width={50} />
                        <Skeleton width={150} />
                      </>
                    ) : (
                      <>
                        <Text fw={500} style={{ fontSize: '0.7rem', marginRight: 10 }}>
                          Aired
                        </Text>
                        <Text fz={11} style={{ margin: 0 }}>
                          {data.aired.string}
                        </Text>
                      </>
                    )}
                  </List.Item>
                  <List.Item style={{ lineHeight: isLoading ? '1.25rem' : '1rem' }}>
                    {isLoading ? (
                      <>
                        <Skeleton width={50} />
                        <Skeleton width={75} />
                      </>
                    ) : (
                      <>
                        <Text fw={500} style={{ fontSize: '0.7rem', marginRight: 10 }}>
                          Studios
                        </Text>
                        <Text fz={12} style={{ margin: 0 }}>
                          {data.studios.map((studio, index) => (
                            <Text key={index}>{studio.name}</Text>
                          ))}
                        </Text>
                      </>
                    )}
                  </List.Item>
                  <List.Item style={{ marginTop: 10 }}>
                    {isLoading ? (
                      <Skeleton width={100} />
                    ) : (
                      <>
                        <InformationModal opened={opened} close={() => setOpened(false)} data={data} />
                        <Group position='center'>
                          <Anchor onClick={() => setOpened(true)}>
                            <Text fz={12}>More Information</Text>
                          </Anchor>
                        </Group>
                      </>
                    )}
                  </List.Item>
                </List>
              </div>
            </div>
          </div>
          <div className='content-main' style={{ fontSize: '100%', padding: '0 10px 10px 10px' }}>
            <h2 style={{ fontSize: '14px' }}>{isLoading ? <Skeleton width={70} /> : 'Synopsis'}</h2>
            {isLoading ? (
              <Skeleton height={120} />
            ) : (
              <>
                <Spoiler maxHeight={120} showLabel='Show more' hideLabel='Hide' mt={5} fz='xs'>
                  {data.synopsis}
                </Spoiler>
              </>
            )}
          </div>
          <div style={{ margin: '10px 0' }}>
            <Accordion value={accordionValue} chevronPosition='left' onChange={(e) => setAccordionValue(e)}>
              <Accordion.Item value='characters'>
                <Accordion.Control>{isLoading ? <Skeleton width={200} /> : 'Characters & Voice Actors'}</Accordion.Control>
                <Accordion.Panel>
                  {isLoading ? (
                    <CarouselLoading>
                      <Skeleton height={126} width={90} />
                    </CarouselLoading>
                  ) : (
                    <Suspense>
                      <Characters />
                    </Suspense>
                  )}
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value='staff'>
                <Accordion.Control>{isLoading ? <Skeleton width={200} /> : 'Staff'}</Accordion.Control>
                <Accordion.Panel>
                  {isLoading ? (
                    <CarouselLoading>
                      <Skeleton height={126} width={90} />
                    </CarouselLoading>
                  ) : (
                    <Suspense>
                      <Staff />
                    </Suspense>
                  )}
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value='recomendations'>
                <Accordion.Control>{isLoading ? <Skeleton width={200} /> : 'Recomendations'}</Accordion.Control>
                <Accordion.Panel>
                  {isLoading ? (
                    <CarouselLoading>
                      <Skeleton height={126} width={90} />
                    </CarouselLoading>
                  ) : (
                    <Suspense>
                      <Recommendation />
                    </Suspense>
                  )}
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </div>
        </>
      ) : (
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
                    <Image imageProps={{ loading: 'lazy' }} width={225} src={data.images.webp.large_image_url} alt={data.title} withPlaceholder />
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
                <Tabs value={activeTab} onTabChange={setActiveTab} keepMounted={false}>
                  <Tabs.List>
                    <Tabs.Tab value='details'>Detail</Tabs.Tab>
                    <Tabs.Tab value='characters'>Characters & Voice Actors</Tabs.Tab>
                    <Tabs.Tab value='staff'>Staff</Tabs.Tab>
                  </Tabs.List>
                  <Tabs.Panel value='details'>
                    <Suspense>
                      <Information data={data} loading={isLoading} />
                    </Suspense>
                  </Tabs.Panel>
                  <Tabs.Panel value='characters'>
                    <Suspense>
                      <Characters activeTab={activeTab} />
                    </Suspense>
                  </Tabs.Panel>
                  <Tabs.Panel value='staff'>
                    <Suspense>
                      <Staff activeTab={activeTab} />
                    </Suspense>
                  </Tabs.Panel>
                </Tabs>
              </div>
            </div>
          </Card>
        </>
      )}
    </Layout>
  )
}
export default Detail

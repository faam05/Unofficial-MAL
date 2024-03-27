import Layout from '../../components/layouts'
import '../../styles/detail.css'
import DetailMobile from './Mobile'
import { useMobileDevice } from '../../hooks/useMobileDevice'
// desktop
import { Card, Flex, Image, Spoiler, Tabs, Text, Title } from '@mantine/core'
// import Characters from '../../components/Characters'
// import Information from '../../components/Information'
// import Staff from '../../components/Staff'
import { Suspense, lazy, useState } from 'react'
import { useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '../../utils'

const Information = lazy(() => import('../../components/Information'))
const Characters = lazy(() => import('../../components/Characters'))
const Staff = lazy(() => import('../../components/Staff'))

function Detail() {
  const { id } = useParams()
  const mobile = useMobileDevice()

  // Desktop
  const [activeTab, setActiveTab] = useState('details')

  // get details anime
  const { data, isLoading, isError } = useQuery({
    queryKey: ['details', id],
    queryFn: () => fetcher(`https://api.jikan.moe/v4/anime/${id}/full`),
    // retry: 10,
  })

  if (isError) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Text>Something went wrong</Text>
      </div>
    )
  }

  // mobile
  // const [id, setId] = useState(null)

  // const [opened, setOpened] = useState(false)
  // const [accordionValue, setAccordionValue] = useState('characters')

  // const [dataInformation, setDataInformation] = useState(null)

  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(false)

  // const getData = async () => {
  //   try {
  //     if (dataInformation === null || id != params.id) {
  //       const { data } = await axios(`https://api.jikan.moe/v4/anime/${params.id}/full`)
  //       setDataInformation(data.data)
  //       setId(data.data.mal_id)
  //       setLoading(false)
  //     }
  //   } catch (error) {
  //     console.error(error)
  //     setError(true)
  //     setLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   if (params.id != id) {
  //     setLoading(true)
  //     setAccordionValue('characters')
  //     getData()
  //   }
  // }, [params.id])

  return (
    <Layout>
      {mobile ? (
        <>
          <DetailMobile />
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

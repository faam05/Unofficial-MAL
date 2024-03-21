import { Card, Flex, Image, Spoiler, Tabs, Text, Title } from '@mantine/core'
import Characters from './Characters'
import Information from './Information'
import StaffDesktop from './Staff'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'

export default function DetailDesktop() {
  const params = useParams()

  const [id, setId] = useState(null)

  const [dataInformation, setDataInformation] = useState(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeTab, setActiveTab] = useState('loading-1')

  const getData = async () => {
    try {
      if (dataInformation === null || id != params.id) {
        const { data } = await axios(`https://api.jikan.moe/v4/anime/${params.id}/full`)
        setDataInformation(data.data)
        setId(data.data.mal_id)
        setActiveTab('details')
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      setError(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.id != id) {
      setDataInformation(null)
      setLoading(true)
      setActiveTab('loading-1')
      getData()
    }

    return () => {
      setDataInformation(null)
      setLoading(true)
      setActiveTab('loading-1')
    }
  }, [params.id])

  return (
    <>
      {!loading && !error ? (
        <Card shadow='sm' p='lg' radius='md' withBorder>
          <div className='h1 detail-title'>
            <Text fz={16}>{dataInformation.title}</Text>
          </div>
          <div className='detail content-wrapper'>
            <div className='detail content-left'>
              <Image
                imageProps={{ loading: 'lazy' }}
                width={225}
                src={dataInformation.images.jpg.large_image_url}
                alt={dataInformation.title}
                withPlaceholder
              />
              <div style={{ marginTop: 10 }}>
                <Title order={5} fz={12} style={{ borderStyle: 'solid', borderColor: '#bebebe', borderWidth: '0 0 1px' }} p='3px 0'>
                  Alternative Titles
                </Title>
                <Spoiler my={10} maxHeight={60} fz={12} showLabel='More titles' hideLabel='Less titles'>
                  <div>
                    {dataInformation.titles
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
                    {dataInformation.type && (
                      <>
                        <Text fw={700}>Type:</Text>
                        <Text ml={5}>{dataInformation.type}</Text>
                      </>
                    )}
                  </Flex>
                  <Flex>
                    {dataInformation.episodes && (
                      <>
                        <Text fw={700}>Episodes:</Text>
                        <Text ml={5}>{dataInformation.episodes}</Text>
                      </>
                    )}
                  </Flex>
                  <Flex>
                    {dataInformation.status && (
                      <>
                        <Text fw={700}>Status:</Text>
                        <Text ml={5}>{dataInformation.status}</Text>
                      </>
                    )}
                  </Flex>
                  <Flex>
                    {dataInformation.aired && (
                      <>
                        <Text fw={700}>Aired:</Text>
                        <Text ml={5}>{dataInformation.aired.string}</Text>
                      </>
                    )}
                  </Flex>
                  <Flex>
                    {dataInformation.producers.length === 0 ? null : (
                      <div>
                        <span style={{ fontWeight: 700 }}>Producers: </span>
                        {dataInformation.producers.map((item, index) => {
                          return <span key={index}>{index !== dataInformation.producers.length - 1 ? ' ' + item.name + ', ' : item.name}</span>
                        })}
                      </div>
                    )}
                  </Flex>
                  <Flex>
                    {dataInformation.licensors.length === 0 ? null : (
                      <div>
                        <span style={{ fontWeight: 700 }}>Licensors: </span>
                        {dataInformation.licensors.map((item, index) => {
                          return <span key={index}>{index !== dataInformation.licensors.length - 1 ? item.name + ', ' : item.name}</span>
                        })}
                      </div>
                    )}
                  </Flex>
                  <Flex>
                    {dataInformation.studios.length === 0 ? null : (
                      <div>
                        <span style={{ fontWeight: 700 }}>Studios: </span>
                        {dataInformation.studios.map((item, index) => {
                          return <span key={index}>{index !== dataInformation.studios.length - 1 ? item.name + ', ' : item.name}</span>
                        })}
                      </div>
                    )}
                  </Flex>
                  <Flex>
                    {dataInformation.source && (
                      <>
                        <Text fw={700}>Source:</Text>
                        <Text ml={5}>{dataInformation.source}</Text>
                      </>
                    )}
                  </Flex>
                  <Flex>
                    {dataInformation.genres.length === 0 ? null : (
                      <div>
                        <span style={{ fontWeight: 700 }}>Genres: </span>
                        {dataInformation.genres.map((item, index) => {
                          return <span key={index}>{index !== dataInformation.genres.length - 1 ? item.name + ', ' : item.name}</span>
                        })}
                      </div>
                    )}
                  </Flex>
                  <Flex>
                    {dataInformation.themes.length === 0 ? null : (
                      <div>
                        <span style={{ fontWeight: 700 }}>Themes: </span>
                        {dataInformation.themes.map((item, index) => {
                          return <span key={index}>{index !== dataInformation.themes.length - 1 ? item.name + ', ' : item.name}</span>
                        })}
                      </div>
                    )}
                  </Flex>
                  <Flex>
                    {dataInformation.demographics.length === 0 ? null : (
                      <div>
                        <span style={{ fontWeight: 700 }}>Demographics: </span>
                        {dataInformation.demographics.map((item, index) => {
                          return <span key={index}>{index !== dataInformation.demographics.length - 1 ? item.name + ', ' : item.name}</span>
                        })}
                      </div>
                    )}
                  </Flex>
                  <Flex>
                    {dataInformation.duration && (
                      <>
                        <Text fw={700}>Duration:</Text>
                        <Text ml={5}>{dataInformation.duration}</Text>
                      </>
                    )}
                  </Flex>
                  <Flex>
                    {dataInformation.rating && (
                      <>
                        <Text fw={700}>Rating:</Text>
                        <Text ml={5}>{dataInformation.rating}</Text>
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
                    {dataInformation.score && (
                      <>
                        <Text fw={700}>Score : </Text>
                        <Text ml={5}>
                          {dataInformation.score} (scored by {Number(dataInformation.scored_by).toLocaleString()} users)
                        </Text>
                      </>
                    )}
                  </Flex>
                  <Flex>
                    {dataInformation.rank && (
                      <>
                        <Text fw={700}>Ranked : </Text>
                        <Text ml={5}>#{dataInformation.rank}</Text>
                      </>
                    )}
                  </Flex>
                  <Flex>
                    {dataInformation.popularity && (
                      <>
                        <Text fw={700}>Popularity : </Text>
                        <Text ml={5}>#{dataInformation.popularity}</Text>
                      </>
                    )}
                  </Flex>
                  <Flex>
                    {dataInformation.members && (
                      <>
                        <Text fw={700}>Members : </Text>
                        <Text ml={5}>{Number(dataInformation.members).toLocaleString()}</Text>
                      </>
                    )}
                  </Flex>
                  <Flex>
                    {dataInformation.favorites && (
                      <>
                        <Text fw={700}>Favorites : </Text>
                        <Text ml={5}>{Number(dataInformation.favorites).toLocaleString()}</Text>
                      </>
                    )}
                  </Flex>
                </div>
              </div>
            </div>
            <div className='detail content-right' style={{ maxWidth: '400px' }}>
              <Tabs value={activeTab} onTabChange={setActiveTab}>
                <Tabs.List>
                  <Tabs.Tab value='details'>Detail</Tabs.Tab>
                  <Tabs.Tab value='characters'>Characters & Voice Actors</Tabs.Tab>
                  <Tabs.Tab value='staff'>Staff</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value='details'>
                  <Information data={dataInformation} loading={loading} error={error} />
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
      ) : error ? (
        <p>Something went wrong</p>
      ) : (
        <Card shadow='sm' p='lg' radius='md' withBorder>
          <div className='h1 detail-title'>
            <Skeleton />
          </div>
          <div className='detail content-wrapper'>
            <div className='detail content-left'>
              <Skeleton width={225} height={330} />
              <div style={{ marginTop: 10 }}>
                <Title order={5} fz={12} style={{ borderStyle: 'solid', borderColor: '#bebebe', borderWidth: '0 0 1px' }} p='3px 0'>
                  <Skeleton width={100} />
                </Title>
                <Skeleton height={60} />
              </div>

              <div>
                <Title order={5} fz={12} style={{ borderStyle: 'solid', borderColor: '#bebebe', borderWidth: '0 0 1px' }} p='3px 0'>
                  <Skeleton />
                </Title>
                <div style={{ padding: '3px 0', fontSize: 11, lineHeight: '1.53m' }}>
                  <Flex>
                    <Text fw={700}>
                      <Skeleton count={10} width={110} />
                    </Text>
                    <Text ml={5}>
                      <Skeleton count={10} width={110} />
                    </Text>
                  </Flex>
                </div>
              </div>

              <div>
                <Title order={5} fz={12} style={{ borderStyle: 'solid', borderColor: '#bebebe', borderWidth: '0 0 1px' }} p='3px 0'>
                  <Skeleton count={2} />
                </Title>
                <div style={{ padding: '3px 0', fontSize: 11, lineHeight: '1.53m' }}>
                  <Flex>
                    <Text fw={700}>
                      <Skeleton count={10} width={110} />
                    </Text>
                    <Text ml={5}>
                      <Skeleton count={10} width={110} />
                    </Text>
                  </Flex>
                </div>
              </div>
            </div>

            <div className='detail content-right' style={{ maxWidth: '400px' }}>
              <Tabs value={activeTab} onTabChange={setActiveTab}>
                <Tabs.List>
                  <Tabs.Tab value='loading-1'>
                    <Skeleton width={100} />
                  </Tabs.Tab>
                  <Tabs.Tab value='loading-2'>
                    <Skeleton width={100} />
                  </Tabs.Tab>
                  <Tabs.Tab value='loading-3'>
                    <Skeleton width={100} />
                  </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value='loading-1'>
                  <Information data={dataInformation} loading={loading} error={error} />
                </Tabs.Panel>
                <Tabs.Panel value='loading-2'>
                  <Information data={dataInformation} loading={loading} error={error} />
                </Tabs.Panel>
                <Tabs.Panel value='loading-3'>
                  <Information data={dataInformation} loading={loading} error={error} />
                </Tabs.Panel>
              </Tabs>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}

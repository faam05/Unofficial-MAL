import { Carousel } from '@mantine/carousel'
import { Badge, Card, Flex, Image, SimpleGrid, Text, Title } from '@mantine/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { NavLink, useParams } from 'react-router-dom'
import MyCarousel from '../../../components/Carousel'

export default function Information({ data, loading, error }) {
  const { id } = useParams()

  const [dataOpening, setDataOpening] = useState([])
  const [dataEnding, setDataEnding] = useState([])
  const [dataRecommendation, setDataRecommendation] = useState([])

  const [loadingData, setLoadingData] = useState(true)

  const getDataVideos = async () => {
    try {
      if (data) {
        const { data } = await axios(`https://api.jikan.moe/v4/anime/${id}/videos`)
        setDataOpening(data.data.music_videos.filter((item) => item.title.toLowerCase().includes('op')))
        setDataEnding(data.data.music_videos.filter((item) => item.title.toLowerCase().includes('ed')))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getRecommendation = async () => {
    try {
      if (data) {
        const { data } = await axios(`https://api.jikan.moe/v4/anime/${id}/recommendations`)
        setDataRecommendation(data.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!loading && !error && data) {
      getDataVideos()
      getRecommendation()
      testData()
      setLoadingData(false)
    }

    return () => {}
  }, [loading])

  const testData = async () => {
    try {
      if (data) {
        const { data } = await axios(`http://localhost:3000/anime`)
        // console.log('data', data)
        // setDataOpening(data.data.music_videos.filter((item) => item.title.toLowerCase().includes('op')))
        // setDataEnding(data.data.music_videos.filter((item) => item.title.toLowerCase().includes('ed')))
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (!loading && !loadingData) {
    return (
      <>
        <Card bg={'#f8f8f8'}>
          <Flex>
            <div style={{ display: 'block', textAlign: 'center' }}>
              <Badge size='xs'>Score</Badge>
              <Title order={5} fw={800}>
                {data.score ? data.score : 'N/A'}
              </Title>
              <Text fz={10}>{data.scored_by ? Number(data.scored_by).toLocaleString() : '-'} users</Text>
            </div>
            <div style={{ display: 'inline-block', marginLeft: 10, paddingLeft: 10, borderWidth: '0 0px 0 1px', borderStyle: 'solid' }}>
              <Flex mt='auto'>
                <SimpleGrid cols={3}>
                  <div style={{ textAlign: 'center' }}>
                    <Flex>
                      <Text c={'dimmed'} style={{ marginRight: 5 }}>
                        Ranked
                      </Text>
                      <Text fw={700}>{data.rank ? '#' + data.rank : 'N/A'}</Text>
                    </Flex>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <Flex>
                      <Text c={'dimmed'} style={{ marginRight: 5 }}>
                        Popularity
                      </Text>
                      <Text fw={700}>{data.popularity ? '#' + data.popularity : 'N/A'}</Text>
                    </Flex>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <Flex>
                      <Text c={'dimmed'} style={{ marginRight: 5 }}>
                        Members
                      </Text>
                      <Text fw={700}>{data.members ? Number(data.members).toLocaleString() : 'N/A'}</Text>
                    </Flex>
                  </div>
                </SimpleGrid>
              </Flex>
              <Text style={{ marginTop: '5%' }} fz={10}>
                <span style={{ padding: '0px 5px 0 0', borderStyle: 'solid', borderWidth: '0 1px 0 0' }}>
                  {data.season && data.season.charAt(0).toUpperCase() + data.season.slice(1)} {data.year}
                </span>
                <span style={{ padding: '0px 5px', borderStyle: 'solid', borderWidth: '0 1px 0 0' }}>{data.type}</span>
                {data.studios.map((item, index) => {
                  return (
                    <span style={{ paddingLeft: 5 }} key={index}>
                      {item.name}
                    </span>
                  )
                })}
              </Text>
            </div>
          </Flex>
        </Card>
        <div>
          <h2
            style={{
              fontSize: 14,
              borderColor: '#bebebe',
              borderStyle: 'solid',
              borderWidth: '0 0 1px',
              color: 'black',
              fontWeight: 700,
              padding: '3px 0',
            }}>
            Synopsis
          </h2>
          <p style={{ lineHeight: '1.5em', margin: 0, padding: 0, fontSize: 12 }}>{data.synopsis ? data.synopsis : 'No Synopsis given.'}</p>
        </div>
        <div>
          <h2
            style={{
              fontSize: 14,
              borderColor: '#bebebe',
              borderStyle: 'solid',
              borderWidth: '0 0 1px',
              color: 'black',
              fontWeight: 700,
              padding: '3px 0',
            }}>
            Background
          </h2>
          <p style={{ lineHeight: '1.5em', margin: 0, padding: 0, fontSize: 12 }}>{data.background ? data.background : 'No Background given.'}</p>
        </div>
        <SimpleGrid cols={2} mt={10}>
          <div>
            <h2
              style={{
                fontSize: 14,
                borderColor: '#bebebe',
                borderStyle: 'solid',
                borderWidth: '0 0 1px',
                color: 'black',
                fontWeight: 700,
              }}>
              Opening Theme
            </h2>
            <div>
              {dataOpening.length === 0 ? (
                <Text fz={12}>Opening not update yet</Text>
              ) : (
                dataOpening.map((item, index) => (
                  <Flex key={index} mb={10}>
                    <Image imageProps={{ loading: 'lazy' }} width={100} height={55} src={item.video.images.image_url} />
                    <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                      <Text fz={12}>{item.title}</Text>
                      <Text fz={10}>
                        {item.meta.title} by {item.meta.author}
                      </Text>
                    </div>
                  </Flex>
                ))
              )}
            </div>
          </div>
          <div>
            <h2
              style={{
                fontSize: 14,
                borderColor: '#bebebe',
                borderStyle: 'solid',
                borderWidth: '0 0 1px',
                color: 'black',
                fontWeight: 700,
              }}>
              Ending Theme
            </h2>
            <div>
              {dataEnding.length === 0 ? (
                <Text fz={12}>Ending not update yet</Text>
              ) : (
                dataEnding.map((item, index) => (
                  <Flex key={index} mb={10}>
                    <Image imageProps={{ loading: 'lazy' }} width={100} height={55} src={item.video.images.image_url} />
                    <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                      <Text fz={12}>{item.title}</Text>
                      <Text fz={10}>
                        {item.meta.title} by {item.meta.author}
                      </Text>
                    </div>
                  </Flex>
                ))
              )}
            </div>
          </div>
        </SimpleGrid>
        <div>
          <h2
            style={{
              fontSize: 14,
              borderColor: '#bebebe',
              borderStyle: 'solid',
              borderWidth: '0 0 1px',
              color: 'black',
              fontWeight: 700,
            }}>
            Recommendations
          </h2>
          <div>
            {dataRecommendation.length === 0 ? (
              <Text fz={12}>Recommendation not update yet</Text>
            ) : (
              <MyCarousel slideGap='xs'>
                {dataRecommendation.map((item, index) => {
                  return (
                    <Carousel.Slide
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        marginTop: '5px',
                      }}>
                      <NavLink
                        to={`/detail/${item.entry.mal_id}`}
                        style={{
                          position: 'relative',
                        }}>
                        <Image
                          imageProps={{ loading: 'lazy' }}
                          height={220}
                          width={140}
                          src={item.entry.images.jpg.image_url}
                          withPlaceholder
                          style={{ position: 'relative' }}
                        />
                        <Text
                          color='white'
                          fz={14}
                          style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            fontWeight: 600,
                            padding: '0px 5px',
                            background: `linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)`,
                          }}>
                          {item.votes != null || item.votes != 0 ? <span>{item.votes} users</span> : 'N / A'}
                        </Text>
                        <Text
                          style={{
                            width: '100%',
                            fontSize: '11px',
                            fontWeight: 400,
                            padding: '15px 5px 5px',
                            bottom: 0,
                            position: 'absolute',
                            color: '#fff',
                            background: `linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)`,
                          }}>
                          {item.entry.title}
                        </Text>
                      </NavLink>
                    </Carousel.Slide>
                  )
                })}
              </MyCarousel>
            )}
          </div>
        </div>
        <div>A</div>
      </>
    )
  } else if (error) {
    return <div>Data failed to load</div>
  } else if (loading || loadingData) {
    return (
      <>
        <Card bg={'#f8f8f8'}>
          <Flex>
            <div style={{ display: 'block', textAlign: 'center' }}>
              <Skeleton height={20} width={50} count={3} />
            </div>
            <div style={{ display: 'inline-block', marginLeft: 10, paddingLeft: 10, borderWidth: '0 0px 0 1px', borderStyle: 'solid' }}>
              <Flex mt='auto'>
                <SimpleGrid cols={3}>
                  <Skeleton height={20} width={100} />
                  <Skeleton height={20} width={100} />
                  <Skeleton height={20} width={100} />
                </SimpleGrid>
              </Flex>
              <Flex style={{ marginTop: '5%' }}>
                <span style={{ padding: '0px 5px 0 0', borderStyle: 'solid', borderWidth: '0 1px 0 0' }}>
                  <Skeleton width={20} />
                </span>
                <span style={{ padding: '0px 5px', borderStyle: 'solid', borderWidth: '0 1px 0 0' }}>
                  <Skeleton width={20} />
                </span>
                <span style={{ paddingLeft: 5 }}>
                  <Skeleton width={20} />
                </span>
              </Flex>
            </div>
          </Flex>
        </Card>
        <div>
          <h2
            style={{
              fontSize: 14,
              borderColor: '#bebebe',
              borderStyle: 'solid',
              borderWidth: '0 0 1px',
              color: 'black',
              fontWeight: 700,
              padding: '3px 0',
            }}>
            <Skeleton />
          </h2>
          <p style={{ lineHeight: '1.5em', margin: 0, padding: 0, fontSize: 12 }}>
            <Skeleton />
          </p>
        </div>

        <div>
          <h2
            style={{
              fontSize: 14,
              borderColor: '#bebebe',
              borderStyle: 'solid',
              borderWidth: '0 0 1px',
              color: 'black',
              fontWeight: 700,
              padding: '3px 0',
            }}>
            <Skeleton />
          </h2>
          <p style={{ lineHeight: '1.5em', margin: 0, padding: 0, fontSize: 12 }}>
            <Skeleton />
          </p>
        </div>

        <SimpleGrid cols={2} mt={10}>
          <div>
            <h2
              style={{
                fontSize: 14,
                borderColor: '#bebebe',
                borderStyle: 'solid',
                borderWidth: '0 0 1px',
                color: 'black',
                fontWeight: 700,
              }}>
              <Skeleton />
            </h2>
            <div>
              {Array(3)
                .fill()
                .map((item, index) => (
                  <Flex key={index} mb={10}>
                    <Skeleton height={55} width={100} />
                    <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                      <Skeleton height={12} width={100} />
                      <Skeleton height={10} width={100} />
                    </div>
                  </Flex>
                ))}
            </div>
          </div>
          <div>
            <h2
              style={{
                fontSize: 14,
                borderColor: '#bebebe',
                borderStyle: 'solid',
                borderWidth: '0 0 1px',
                color: 'black',
                fontWeight: 700,
              }}>
              <Skeleton />
            </h2>
            <div>
              {Array(3)
                .fill()
                .map((item, index) => (
                  <Flex key={index} mb={10}>
                    <Skeleton height={55} width={100} />
                    <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                      <Skeleton height={12} width={100} />
                      <Skeleton height={10} width={100} />
                    </div>
                  </Flex>
                ))}
            </div>
          </div>
        </SimpleGrid>

        <div>
          <h2
            style={{
              fontSize: 14,
              borderColor: '#bebebe',
              borderStyle: 'solid',
              borderWidth: '0 0 1px',
              color: 'black',
              fontWeight: 700,
            }}>
            <Skeleton />
          </h2>
          <div>
            <MyCarousel slideGap='xs'>
              {Array(10)
                .fill()
                .map((item, index) => (
                  <Carousel.Slide
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      marginTop: '5px',
                    }}>
                    <div>
                      <Skeleton height={220} width={140} />
                    </div>
                  </Carousel.Slide>
                ))}
            </MyCarousel>
          </div>
        </div>
      </>
    )
  }
}

import {
  Anchor,
  Aside,
  Avatar,
  Badge,
  Button,
  Card,
  Center,
  Container,
  Flex,
  Group,
  Image,
  List,
  MediaQuery,
  Modal,
  SimpleGrid,
  Spoiler,
  StarIcon,
  Tabs,
  Text,
  Title,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../../styles/detail.css'
import InformationModal from './InformationModal'

export default function Detail() {
  const params = useParams()
  const { tabValue } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [opened, setOpened] = useState(false)

  const getData = async () => {
    const { data } = await axios(`https://api.jikan.moe/v4/anime/${params.id}/full`)
    setData(data.data)
  }
  useEffect(() => {
    getData()
  }, [params])

  const matches = useMediaQuery('(min-width: 800px)')

  return (
    <>
      {data ? (
        <>
          {matches ? (
            <>
              <Card shadow='sm' p='lg' radius='md' withBorder>
                <div className='h1 detail-title'>
                  <Text fz={16}>{data.title}</Text>
                </div>
                <div className='detail content-wrapper'>
                  <div className='detail content-left'>
                    <Image src={data.images.jpg.image_url} alt={data.title} />
                    <div style={{ marginTop: 10 }}>
                      <Title order={5} fz={12} style={{ borderStyle: 'solid', borderColor: '#bebebe', borderWidth: '0 0 1px' }} p='3px 0'>
                        Alternative Titles
                      </Title>
                      <Spoiler my={10} maxHeight={120} fz={12} showLabel='More titles' hideLabel='Less titles'>
                        {data.titles.map((item, index) => {
                          return (
                            <div style={{ padding: '3px 0', fontSize: 11, lineHeight: '1.53m' }} key={index}>
                              <Flex>
                                <Text fw={700}>{item.type} : </Text>
                                <Text ml={5}>{item.title}</Text>
                              </Flex>
                            </div>
                          )
                        })}
                      </Spoiler>
                    </div>
                    <div>
                      <Title order={5} fz={12} style={{ borderStyle: 'solid', borderColor: '#bebebe', borderWidth: '0 0 1px' }} p='3px 0'>
                        Information
                      </Title>
                      <div style={{ padding: '3px 0', fontSize: 11, lineHeight: '1.53m' }}>
                        <Flex>
                          <Text fw={700}>Type : </Text>
                          <Text ml={5}>{data.type}</Text>
                        </Flex>
                        <Flex>
                          <Text fw={700}>Episodes : </Text>
                          <Text ml={5}>{data.episodes}</Text>
                        </Flex>
                        <Flex>
                          <Text fw={700}>Status : </Text>
                          <Text ml={5}>{data.status}</Text>
                        </Flex>
                        <Flex>
                          <Text fw={700}>Aired : </Text>
                          <Text ml={5}>{data.aired.string}</Text>
                        </Flex>
                        <Flex>
                          <Text fw={700}>Producers : </Text>
                          {data.producers.map((item, index) => {
                            return (
                              <Text ml={5} key={index}>
                                {item.name}
                              </Text>
                            )
                          })}
                        </Flex>
                        <Flex>
                          <Text fw={700}>Licensors : </Text>
                          {data.licensors.map((item, index) => {
                            return (
                              <Text ml={5} key={index}>
                                {item.name}
                              </Text>
                            )
                          })}
                        </Flex>
                        <Flex>
                          <Text fw={700}>Studios : </Text>
                          {data.studios.map((item, index) => {
                            return (
                              <Text ml={5} key={index}>
                                {item.name}
                              </Text>
                            )
                          })}
                        </Flex>
                        <Flex>
                          <Text fw={700}>Source : </Text>
                          <Text ml={5}>{data.source}</Text>
                        </Flex>
                        <Flex>
                          <Text fw={700}>Genres : </Text>
                          {data.genres.map((item, index) => {
                            return (
                              <Text ml={5} key={index}>
                                {item.name}
                              </Text>
                            )
                          })}
                        </Flex>
                        <Flex>
                          <Text fw={700}>Themes : </Text>
                          {data.themes.map((item, index) => {
                            return (
                              <Text ml={5} key={index}>
                                {item.name}
                              </Text>
                            )
                          })}
                        </Flex>
                        <Flex>
                          <Text fw={700}>Demographics : </Text>
                          {data.demographics.map((item, index) => {
                            return (
                              <Text ml={5} key={index}>
                                {item.name}
                              </Text>
                            )
                          })}
                        </Flex>
                        <Flex>
                          <Text fw={700}>Duration : </Text>
                          <Text ml={5}>{data.duration}</Text>
                        </Flex>
                        <Flex>
                          <Text fw={700}>Rating : </Text>
                          <Text ml={5}>{data.rating}</Text>
                        </Flex>
                      </div>
                    </div>
                    <div>
                      <Title order={5} fz={12} style={{ borderStyle: 'solid', borderColor: '#bebebe', borderWidth: '0 0 1px' }} p='3px 0'>
                        Statistics
                      </Title>
                      <div style={{ padding: '3px 0', fontSize: 11, lineHeight: '1.53m' }}>
                        <Flex>
                          <Text fw={700}>Score : </Text>
                          <Text ml={5}>
                            {data.score} (scored by {Number(data.scored_by).toLocaleString()} users)
                          </Text>
                        </Flex>
                        <Flex>
                          <Text fw={700}>Ranked : </Text>
                          <Text ml={5}>#{data.rank}</Text>
                        </Flex>
                        <Flex>
                          <Text fw={700}>Popularity : </Text>
                          <Text ml={5}>#{data.popularity}</Text>
                        </Flex>
                        <Flex>
                          <Text fw={700}>Members : </Text>
                          <Text ml={5}>{Number(data.members).toLocaleString()}</Text>
                        </Flex>
                        <Flex>
                          <Text fw={700}>Favorites : </Text>
                          <Text ml={5}>{data.favorites}</Text>
                        </Flex>
                      </div>
                    </div>
                  </div>
                  <div className='detail content-right'>
                    <Tabs defaultValue={`${params.id}`} value={tabValue} onTabChange={(value) => navigate(`/detail/${value}`)}>
                      <Tabs.List>
                        <Tabs.Tab value={`${params.id}`}>Detail</Tabs.Tab>
                        <Tabs.Tab value={`${params.id}/characters`}>Characters</Tabs.Tab>
                      </Tabs.List>
                      <Tabs.Panel value={`${params.id}`} pt='xs'>
                        <Card bg={'#f8f8f8'}>
                          <Flex>
                            <div style={{ display: 'block', textAlign: 'center' }}>
                              <Badge>Score</Badge>
                              <Title order={3} fw={700}>
                                {data.score}
                              </Title>
                              <Text fz={10}>{Number(data.scored_by).toLocaleString()} users</Text>
                            </div>
                            <div
                              style={{ display: 'inline-block', marginLeft: 10, paddingLeft: 10, borderWidth: '0 0px 0 1px', borderStyle: 'solid' }}>
                              <Flex>
                                <SimpleGrid cols={3}>
                                  <div style={{ textAlign: 'center' }}>
                                    <Badge>Ranked</Badge>
                                    <Text fw={700}>#{data.rank}</Text>
                                  </div>
                                  <div style={{ textAlign: 'center' }}>
                                    <Badge>Popularity</Badge>
                                    <Text fw={700}>#{data.popularity}</Text>
                                  </div>
                                  <div style={{ textAlign: 'center' }}>
                                    <Badge>Members</Badge>
                                    <Text fw={700}>{Number(data.members).toLocaleString()}</Text>
                                  </div>
                                </SimpleGrid>
                              </Flex>
                              <Text style={{ float: 'left!important', padding: '0px 15px' }} fz={11} mt={5}>
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
                          <p style={{ lineHeight: '1.5em', margin: 0, padding: 0, fontSize: 12 }}>{data.synopsis}</p>
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
                          <p style={{ lineHeight: '1.5em', margin: 0, padding: 0, fontSize: 12 }}>{data.background}</p>
                        </div>
                      </Tabs.Panel>
                      <Tabs.Panel value={`${params.id}/characters`} pt='xs'>
                        Characters tab content
                      </Tabs.Panel>
                    </Tabs>
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <>
              <div className='top'>
                <div className='h1 detail-title'>
                  <Text fz={16}>{data.title}</Text>
                </div>
                <div className='content-wrapper'>
                  <div className='content-left' style={{ backgroundImage: `url('${data.images.jpg.image_url}')` }}></div>
                  <div className='content-right'>
                    <List>
                      <List.Item>
                        <Badge style={{ marginRight: 10 }}>{Number(data.score)}</Badge>
                        <span style={{ fontSize: '0.7rem', color: '#7a7a7a' }}>({data.scored_by} users)</span>
                      </List.Item>
                      <List.Item>
                        <span>Ranked #{data.rank}</span>
                      </List.Item>
                      <List.Item>{data.type}</List.Item>
                      <List.Item style={{ lineHeight: '1rem' }}>
                        <span style={{ fontSize: '0.7rem', marginRight: 10 }}>Aired</span>
                        <br />
                        <span style={{ margin: 0, fontSize: '1rem' }}>{data.aired.string}</span>
                      </List.Item>
                      <List.Item style={{ lineHeight: '1rem' }}>
                        <span style={{ fontSize: '0.7rem', marginRight: 10 }}>Studios</span>
                        <br />
                        <span style={{ margin: 0, fontSize: '1rem' }}>{data.studios.map((studio) => studio.name)}</span>
                      </List.Item>
                      <List.Item style={{ marginTop: 10 }}>
                        <InformationModal opened={opened} close={() => setOpened(false)} data={data} />
                        <Group position='center'>
                          <Anchor onClick={() => setOpened(true)}>More Information</Anchor>
                        </Group>
                      </List.Item>
                    </List>
                  </div>
                </div>
              </div>
              <div className='content-main' style={{ fontSize: '100%' }}>
                <h2 className='fs16'>Synopsis</h2>
                <Spoiler maxHeight={120} showLabel='Show more' hideLabel='Hide' mt={10} fz='sm'>
                  {data.synopsis}
                </Spoiler>
              </div>
            </>
          )}
        </>
      ) : (
        <p> Loading...</p>
      )}
    </>
  )
}

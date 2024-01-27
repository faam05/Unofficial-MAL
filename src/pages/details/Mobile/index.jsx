import { Anchor, Badge, Group, List, Spoiler, Text, Accordion, Flex } from '@mantine/core'
import { useEffect, useState } from 'react'
import InformationModal from './InformationModal'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import CharactersMobile from './Characters'
import Skeleton from 'react-loading-skeleton'
import StaffMobile from './Staff'
import RecommendationM from './Recommendation'
import CarouselLoading from '../../../components/loading/CarouselLoading'

export default function DetailMobile() {
  const params = useParams()

  const [id, setId] = useState(null)

  const [opened, setOpened] = useState(false)
  const [accordionValue, setAccordionValue] = useState('characters')

  const [dataInformation, setDataInformation] = useState(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const getData = async () => {
    try {
      if (dataInformation === null || id != params.id) {
        const { data } = await axios(`https://api.jikan.moe/v4/anime/${params.id}/full`)
        setDataInformation(data.data)
        setId(data.data.mal_id)
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
      setLoading(true)
      setAccordionValue('characters')
      getData()
    }
  }, [params.id])

  if (!loading && !error) {
    return (
      <>
        <div className='top'>
          <div className='h1 detail-title'>
            <Text fz={16}>{dataInformation.title}</Text>
          </div>
          <div className='content-wrapper'>
            <div className='content-left' style={{ backgroundImage: `url('${dataInformation.images.jpg.large_image_url}')` }}></div>
            <div className='content-right'>
              <List>
                <List.Item>
                  <Badge size='xs' style={{ marginRight: 10 }}>
                    {Number(dataInformation.score)}
                  </Badge>
                  <span style={{ fontSize: '0.7rem', color: '#7a7a7a' }}>({Number(dataInformation.scored_by).toLocaleString()} users)</span>
                </List.Item>
                <List.Item>
                  <Text fz={12}>Ranked #{dataInformation.rank}</Text>
                </List.Item>
                <List.Item>
                  <Text fz={12}>{dataInformation.type}</Text>
                </List.Item>
                <List.Item style={{ lineHeight: '1rem' }}>
                  <Text fw={500} style={{ fontSize: '0.7rem', marginRight: 10 }}>
                    Aired
                  </Text>
                  <Text fz={11} style={{ margin: 0 }}>
                    {dataInformation.aired.string}
                  </Text>
                </List.Item>
                <List.Item style={{ lineHeight: '1rem' }}>
                  <Text fw={500} style={{ fontSize: '0.7rem', marginRight: 10 }}>
                    Studios
                  </Text>
                  <Text fz={12} style={{ margin: 0 }}>
                    {dataInformation.studios.map((studio, index) => (
                      <Text key={index}>{studio.name}</Text>
                    ))}
                  </Text>
                </List.Item>
                <List.Item style={{ marginTop: 10 }}>
                  <InformationModal opened={opened} close={() => setOpened(false)} data={dataInformation} />
                  <Group position='center'>
                    <Anchor onClick={() => setOpened(true)}>
                      <Text fz={12}>More Information</Text>
                    </Anchor>
                  </Group>
                </List.Item>
              </List>
            </div>
          </div>
        </div>
        <div className='content-main' style={{ fontSize: '100%', padding: '0 10px 10px 10px' }}>
          <h2 style={{ fontSize: '14px' }}>Synopsis</h2>
          <Spoiler maxHeight={120} showLabel='Show more' hideLabel='Hide' mt={5} fz='xs'>
            {dataInformation.synopsis}
          </Spoiler>
        </div>
        <div style={{ margin: '10px 0' }}>
          <Accordion value={accordionValue} chevronPosition='left' onChange={(e) => setAccordionValue(e)}>
            <Accordion.Item value='characters'>
              <Accordion.Control>Characters & Voice Actors</Accordion.Control>
              <Accordion.Panel>
                <CharactersMobile accordionValue={accordionValue} id={id} loaded={!loading} />
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value='staff'>
              <Accordion.Control>Staff</Accordion.Control>
              <Accordion.Panel>
                <StaffMobile accordionValue={accordionValue} id={id} loaded={!loading} />
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value='recomendations'>
              <Accordion.Control>Recomendations</Accordion.Control>
              <Accordion.Panel>
                <RecommendationM accordionValue={accordionValue} id={id} loaded={!loading} />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      </>
    )
  } else if (error) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Text>Something went wrong</Text>
      </div>
    )
  } else if (loading) {
    return (
      <>
        <div className='top'>
          <div className='h1 detail-title'>
            <Skeleton />
          </div>
          <div className='content-wrapper'>
            <Skeleton height={200} width={140} />
            <div className='content-right' style={{ width: '100%' }}>
              <List>
                <List.Item>
                  <Flex align='center'>
                    <Badge size='xs' style={{ marginRight: 10 }}>
                      <Skeleton width={20} />
                    </Badge>
                    <Skeleton width={100} />
                  </Flex>
                </List.Item>
                <List.Item>
                  <Skeleton width={100} />
                </List.Item>
                <List.Item>
                  <Skeleton width={50} />
                </List.Item>
                <List.Item style={{ lineHeight: '1.25rem' }}>
                  <Skeleton width={50} />
                  <Skeleton width={150} />
                </List.Item>
                <List.Item style={{ lineHeight: '1.25rem' }}>
                  <Skeleton width={50} />
                  <Skeleton width={75} />
                </List.Item>
                <List.Item style={{ marginTop: 10 }}>
                  <Skeleton width={100} />
                </List.Item>
              </List>
            </div>
          </div>
        </div>
        <div className='content-main' style={{ fontSize: '100%', padding: '0 10px 10px 10px' }}>
          <h2 style={{ fontSize: '14px' }}>
            <Skeleton width={70} />
          </h2>
          <Skeleton height={120} />
        </div>
        <div style={{ margin: '10px 0' }}>
          <Accordion defaultValue={accordionValue} chevronPosition='left'>
            <Accordion.Item value='characters'>
              <Accordion.Control>
                <Skeleton width={200} />
              </Accordion.Control>
              <Accordion.Panel>
                <CharactersMobile accordionValue={accordionValue} id={id} loaded={!loading} />
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value='staff'>
              <Accordion.Control>
                <Skeleton width={200} />
              </Accordion.Control>
              <Accordion.Panel>
                <CarouselLoading carouselStyle={{ display: 'flex', flexDirection: 'column', maxWidth: '90px', marginRight: 1 }}>
                  <Skeleton width={90} height={126} />
                  <Skeleton width={30} />
                  <Skeleton width={80} />
                </CarouselLoading>
                <StaffMobile accordionValue={accordionValue} id={id} loaded={!loading} />
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value='recomendations'>
              <Accordion.Control>
                <Skeleton width={200} />
              </Accordion.Control>
              <Accordion.Panel>
                <CarouselLoading>
                  <Skeleton height={126} width={90} />
                </CarouselLoading>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      </>
    )
  }
}

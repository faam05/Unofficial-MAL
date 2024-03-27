import { Suspense, lazy, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Anchor, Badge, Group, List, Spoiler, Text, Accordion } from '@mantine/core'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import InformationModal from './InformationModal'
import CharactersMobile from './Characters'
// import StaffMobile from './Staff'
import RecommendationM from './Recommendation'
import CarouselLoading from '../../../components/loading/CarouselLoading'

const StaffMobile = lazy(() => import('./Staff'))

export default function DetailMobile() {
  const { id } = useParams()

  const [opened, setOpened] = useState(false)
  const [accordionValue, setAccordionValue] = useState('characters')

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

  return (
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
              <CharactersMobile accordionValue={accordionValue} id={id} loaded={!isLoading} />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value='staff'>
            <Accordion.Control>{isLoading ? <Skeleton width={200} /> : 'Staff'}</Accordion.Control>
            <Accordion.Panel>
              <Suspense>
                <StaffMobile />
              </Suspense>
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
                <RecommendationM accordionValue={accordionValue} id={data.mal_id} loaded={!isLoading} />
              )}
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  )
}

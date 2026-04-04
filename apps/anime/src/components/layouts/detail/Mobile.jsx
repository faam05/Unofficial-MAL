import { useState } from 'react'

import { useDetail } from '@hooks/useDetail'

import { Accordion, Anchor, Badge, Group, List, Spoiler, Text } from '@mantine/core'
import Skeleton from 'react-loading-skeleton'
import InformationModal from '../../molecules/InformationModal'
import Characters from '../Characters'
import Recommendation from '../Recommendation'
import Staff from '../Staff'

const DetailMobile = ({ id }) => {
  const { data, isLoading, isError, accordionValue, setAccordionValue } = useDetail(id)
  const [opened, setOpened] = useState(false)

  if (isError) return <ErrorMessage message='Something went wrong when fetching Details Anime' />

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
                <Badge size='xs' className='mr-[10px]'>
                  {isLoading ? <Skeleton width={20} /> : Number(data.score)}
                </Badge>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <span className='text-[#7a7a7a]' style={{ fontSize: '0.7rem' }}>
                    ({Number(data.scored_by).toLocaleString()} users)
                  </span>
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
                    <Text mr={10} fw={500} style={{ fontSize: '0.7rem' }}>
                      Aired
                    </Text>
                    <Text fz={11} m={0}>
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
                    <Text mr={10} fw={500} style={{ fontSize: '0.7rem' }}>
                      Studios
                    </Text>
                    {data.studios.map((studio, index) => (
                      <Text m={0} key={index} fz={12}>
                        {studio.name}
                      </Text>
                    ))}
                  </>
                )}
              </List.Item>
              <List.Item className='mb-3'>
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
          <Spoiler maxHeight={120} showLabel='Show more' hideLabel='Hide' mt={5} fz='xs'>
            {data.synopsis}
          </Spoiler>
        )}
      </div>
      <div className='my-[10px]'>
        <Accordion value={accordionValue} chevronPosition='left' onChange={(e) => setAccordionValue(e)}>
          <Accordion.Item value='characters'>
            <Accordion.Control>{isLoading ? <Skeleton width={200} /> : 'Characters & Voice Actors'}</Accordion.Control>
            <Accordion.Panel>
              <Characters loading={isLoading} />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value='staff'>
            <Accordion.Control>{isLoading ? <Skeleton width={200} /> : 'Staff'}</Accordion.Control>
            <Accordion.Panel>
              <Staff loading={isLoading} />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value='recomendations'>
            <Accordion.Control>{isLoading ? <Skeleton width={200} /> : 'Recomendations'}</Accordion.Control>
            <Accordion.Panel>
              <Recommendation loading={isLoading} />
            </Accordion.Panel>
          </Accordion.Item>

          {/* <Accordion.Item value='episodes'> */}
          {/* <Accordion.Control disabled={isLoading}>{isLoading ? <Skeleton width={200} /> : 'Episodes'}</Accordion.Control> */}
          {/* <Accordion.Panel>{!isLoading && <Episodes id={data?.title.replace(/[^\w\s]/gi, '').replace(/[" "]/g, '-')} />}</Accordion.Panel> */}
          {/* <Accordion.Panel>{!isLoading && <Episodes datas={data} />}</Accordion.Panel> */}
          {/* </Accordion.Item> */}
        </Accordion>
      </div>
    </>
  )
}

export default DetailMobile

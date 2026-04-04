import { Suspense } from 'react'

import { useDetail } from '@hooks/useDetail'

import { Card, Flex, Spoiler, Tabs, Text, Title } from '@mantine/core'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Skeleton from 'react-loading-skeleton'
import Characters from '../Characters'
import Staff from '../Staff'
import Information from './../Information'

const DetailDesktop = ({ id }) => {
  const { data, isLoading, isError, activeTab, setActiveTab } = useDetail(id)

  if (isError) return <ErrorMessage message='Something went wrong when fetching Details Anime' />

  return (
    <Card shadow='sm' p='lg' radius='md' withBorder>
      <div className='h1 detail-title'>
        {isLoading ? (
          <Skeleton />
        ) : (
          <Text className='hover:cursor-pointer' fz={16}>
            {data.title}
          </Text>
        )}
      </div>
      <div className='detail content-wrapper'>
        <div className='detail content-left'>
          {isLoading ? (
            <>
              <Skeleton width={225} height={330} />
              <div className='mt-[10px]'>
                <Title order={5} fz={12} className='border-solid border-[#bebebe]' style={{ borderWidth: '0 0 1px' }} p='3px 0'>
                  <Skeleton width={100} />
                </Title>
                <Skeleton height={60} />
              </div>
            </>
          ) : (
            <>
              <LazyLoadImage
                width={225}
                src={data.images?.webp?.large_image_url}
                alt={data.title.replace(/[ , -]/g, '_')}
                placeholderSrc={data.images.webp.small_image_url}
                effect='blur'
              />
              <div className='mt-[10px] pb-[10px]'>
                <Title order={5} fz={12} className='border-solid border-[#bebebe]' style={{ borderWidth: '0 0 1px' }} p='3px 0'>
                  Alternative Titles
                </Title>
                <Spoiler my={10} maxHeight={60} fz={12} showLabel='More titles' hideLabel='Less titles'>
                  {data.titles
                    .filter((item) => item.type != 'Default')
                    .map((item, index) => {
                      return (
                        <div key={index}>
                          <span className='font-bold'>{item.type + ': '}</span>
                          <span>{item.title}</span>
                        </div>
                      )
                    })}
                </Spoiler>
              </div>
              <div>
                <Title order={5} fz={12} className='border-solid border-[#bebebe]' style={{ borderWidth: '0 0 1px' }} p='3px 0'>
                  Information
                </Title>
                <div style={{ padding: '3px 0', fontSize: 12, lineHeight: '1.53m' }}>
                  {data.type && (
                    <Flex>
                      <Text inherit fw={700}>
                        Type:
                      </Text>
                      <Text inherit ml={5}>
                        {data.type}
                      </Text>
                    </Flex>
                  )}
                  {data.episodes && (
                    <Flex>
                      <Text inherit fw={700}>
                        Episodes:
                      </Text>
                      <Text inherit ml={5}>
                        {data.episodes}
                      </Text>
                    </Flex>
                  )}
                  {data.status && (
                    <Flex>
                      <Text inherit fw={700}>
                        Status:
                      </Text>
                      <Text inherit ml={5}>
                        {data.status}
                      </Text>
                    </Flex>
                  )}
                  {data.aired && (
                    <Flex>
                      <Text inherit fw={700}>
                        Aired:
                      </Text>
                      <Text inherit ml={5}>
                        {data.aired.string}
                      </Text>
                    </Flex>
                  )}
                  <Flex>
                    {data.producers.length === 0 ? null : (
                      <div>
                        <span className='font-bold'>Producers: </span>
                        {data.producers.map((item, index) => {
                          return <span key={index}>{index !== data.producers.length - 1 ? ' ' + item.name + ', ' : item.name}</span>
                        })}
                      </div>
                    )}
                  </Flex>
                  <Flex>
                    {data.licensors.length === 0 ? null : (
                      <div>
                        <span className='font-bold'>Licensors: </span>
                        {data.licensors.map((item, index) => {
                          return <span key={index}>{index !== data.licensors.length - 1 ? item.name + ', ' : item.name}</span>
                        })}
                      </div>
                    )}
                  </Flex>
                  <Flex>
                    {data.studios.length === 0 ? null : (
                      <div>
                        <span className='font-bold'>Studios: </span>
                        {data.studios.map((item, index) => {
                          return <span key={index}>{index !== data.studios.length - 1 ? item.name + ', ' : item.name}</span>
                        })}
                      </div>
                    )}
                  </Flex>
                  {data.source && (
                    <Flex>
                      <Text inherit fw={700}>
                        Source:
                      </Text>
                      <Text inherit ml={5}>
                        {data.source}
                      </Text>
                    </Flex>
                  )}
                  <Flex>
                    {data.genres.length === 0 ? null : (
                      <div>
                        <span className='font-bold'>Genres: </span>
                        {data.genres.map((item, index) => {
                          return <span key={index}>{index !== data.genres.length - 1 ? item.name + ', ' : item.name}</span>
                        })}
                      </div>
                    )}
                  </Flex>
                  <Flex>
                    {data.themes.length === 0 ? null : (
                      <div>
                        <span className='font-bold'>Themes: </span>
                        {data.themes.map((item, index) => {
                          return <span key={index}>{index !== data.themes.length - 1 ? item.name + ', ' : item.name}</span>
                        })}
                      </div>
                    )}
                  </Flex>
                  <Flex>
                    {data.demographics.length === 0 ? null : (
                      <div>
                        <span className='font-bold'>Demographics: </span>
                        {data.demographics.map((item, index) => {
                          return <span key={index}>{index !== data.demographics.length - 1 ? item.name + ', ' : item.name}</span>
                        })}
                      </div>
                    )}
                  </Flex>
                  {data.duration && (
                    <Flex>
                      <Text inherit fw={700}>
                        Duration:
                      </Text>
                      <Text inherit ml={5}>
                        {data.duration}
                      </Text>
                    </Flex>
                  )}
                  {data.rating && (
                    <Flex>
                      <Text inherit fw={700}>
                        Rating:
                      </Text>
                      <Text inherit ml={5}>
                        {data.rating}
                      </Text>
                    </Flex>
                  )}
                </div>
              </div>
              <div>
                <Title order={5} fz={12} className='border-solid border-[#bebebe]' style={{ borderWidth: '0 0 1px' }} p='3px 0'>
                  Statistics
                </Title>
                <div style={{ padding: '3px 0', fontSize: 11, lineHeight: '1.53m' }}>
                  {data.score && data.score !== 0 ? (
                    <Flex>
                      <Text inherit fw={700}>
                        Score :{' '}
                      </Text>
                      <Text inherit ml={5}>
                        {data.score} (scored by {Number(data.scored_by).toLocaleString()} users)
                      </Text>
                    </Flex>
                  ) : null}
                  {data.rank && (
                    <Flex>
                      <Text inherit fw={700}>
                        Ranked :{' '}
                      </Text>
                      <Text inherit ml={5}>
                        #{data.rank}
                      </Text>
                    </Flex>
                  )}
                  {data.popularity && (
                    <Flex>
                      <Text inherit fw={700}>
                        Popularity :{' '}
                      </Text>
                      <Text inherit ml={5}>
                        #{data.popularity}
                      </Text>
                    </Flex>
                  )}
                  {data.members && (
                    <Flex>
                      <Text inherit fw={700}>
                        Members :{' '}
                      </Text>
                      <Text inherit ml={5}>
                        {Number(data.members).toLocaleString()}
                      </Text>
                    </Flex>
                  )}
                  {data.favorites && (
                    <Flex>
                      <Text inherit fw={700}>
                        Favorites :{' '}
                      </Text>
                      <Text inherit ml={5}>
                        {Number(data.favorites).toLocaleString()}
                      </Text>
                    </Flex>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <div className='detail content-right max-w-[400px]'>
          <Tabs value={activeTab} onChange={setActiveTab} keepMounted={false}>
            <Tabs.List>
              <Tabs.Tab value='details'>Detail</Tabs.Tab>
              <Tabs.Tab value='characters'>Characters & Voice Actors</Tabs.Tab>
              <Tabs.Tab value='staff'>Staff</Tabs.Tab>
              {/* <Tabs.Tab value='episodes'>Episodes</Tabs.Tab> */}
            </Tabs.List>
            <Tabs.Panel value='details'>
              <Suspense>
                <Information data={data} loading={isLoading} />
              </Suspense>
            </Tabs.Panel>
            <Tabs.Panel value='characters'>
              <Characters />
            </Tabs.Panel>
            <Tabs.Panel value='staff'>
              <Staff />
            </Tabs.Panel>
            {/* <Tabs.Panel value='episodes'> */}
            {/* <Episodes id={data?.title?.replace(/[^\w\s]/gi, '').replace(/[" "]/g, '-')} activeTab={activeTab} /> */}
            {/* <Episodes datas={data} /> */}
            {/* </Tabs.Panel> */}
          </Tabs>
        </div>
      </div>
    </Card>
  )
}

export default DetailDesktop

import { Badge, Card, Flex, Image, SimpleGrid, Text, Title } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import useFetcher from '../hooks/useFetcher'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Recommendation from './Recommendation'

export default function Information({ data, loading }) {
  const { id } = useParams()

  // get videos
  const queryVideos = useFetcher(`https://api.jikan.moe/v4/anime/${id}/videos`, ['videos', id])

  // get recommendation
  const queryClient = useQueryClient()
  const queryRecommendation = queryClient.getQueryState(['recommendations', id])

  return (
    <>
      <Card bg={'#f8f8f8'}>
        <Flex>
          <div className='block text-center'>
            {loading ? (
              <Skeleton height={20} width={50} count={3} />
            ) : (
              <>
                <Badge size='xs'>Score</Badge>
                <Title order={5} fw={800}>
                  {data.score ? data.score : 'N/A'}
                </Title>
                <Text fz={10}>{data.scored_by ? Number(data.scored_by).toLocaleString() : '-'} users</Text>
              </>
            )}
          </div>
          <div
            className='ml-[10px] flex flex-col justify-between overflow-hidden border-solid pl-[10px]'
            style={{
              borderWidth: '0 0px 0 1px',
            }}>
            <div className='flex flex-wrap' style={{ gap: '3px 16px' }}>
              <div className='text-center'>
                <Flex>
                  <Text c={'dimmed'} mr={5}>
                    Ranked
                  </Text>
                  <Text fw={700}>{loading ? <Skeleton width={50} /> : data.rank ? `#${data.rank}` : 'N/A'}</Text>
                </Flex>
              </div>
              <div className='text-center'>
                <Flex>
                  <Text c={'dimmed'} mr={5}>
                    Popularity
                  </Text>
                  <Text fw={700}>{loading ? <Skeleton width={50} /> : data.popularity ? '#' + data.popularity : 'N/A'}</Text>
                </Flex>
              </div>
              <div className='text-center'>
                <Flex>
                  <Text c={'dimmed'} mr={5}>
                    Members
                  </Text>
                  <Text fw={700}>{loading ? <Skeleton width={50} /> : data.members ? Number(data.members).toLocaleString() : 'N/A'}</Text>
                </Flex>
              </div>
            </div>
            <Text style={{ display: loading && 'flex' }} fz={10}>
              <span className='border-solid' style={{ padding: '0px 5px 0 0', borderWidth: '0 1px 0 0' }}>
                {loading ? <Skeleton width={20} /> : data.season && `${data.season.charAt(0).toUpperCase()}${data.season.slice(1)} ${data.year}`}
              </span>
              <span className='border-solid' style={{ padding: '0px 5px', borderWidth: '0 1px 0 0' }}>
                {loading ? <Skeleton width={20} /> : data.type}
              </span>
              {loading ? (
                <Skeleton width={20} />
              ) : (
                data.studios.map((item, index) => {
                  return (
                    <span className='pl-[5px]' key={index}>
                      {item.name}
                    </span>
                  )
                })
              )}
            </Text>
          </div>
        </Flex>
      </Card>
      <div>
        <h2
          className='border-solid border-[#bebebe] text-sm font-bold text-black'
          style={{
            fontSize: 14,
            borderWidth: '0 0 1px',
            padding: '3px 0',
          }}>
          {loading ? <Skeleton /> : 'Synopsis'}
        </h2>
        <p className='m-0 p-0 text-xs' style={{ lineHeight: '1.5em' }}>
          {loading ? <Skeleton height={50} /> : data.synopsis ? data.synopsis : 'No Synopsis given.'}
        </p>
      </div>

      <div>
        <h2
          className='border-solid border-[#bebebe] font-bold text-black'
          style={{
            fontSize: 14,
            borderWidth: '0 0 1px',
            padding: '3px 0',
          }}>
          {loading ? <Skeleton /> : 'Background'}
        </h2>
        <p className='m-0 p-0 text-xs' style={{ lineHeight: '1.5em' }}>
          {loading ? <Skeleton height={50} /> : data.background ? data.background : 'No Background given.'}
        </p>
      </div>

      {/* Videos */}
      {queryVideos.isError ? (
        <div className='text-center'>
          <Text>Something went wrong when fetching List Videos</Text>
        </div>
      ) : (
        <SimpleGrid cols={2} mt={10}>
          {/* Opening */}
          <div>
            <h2
              className='border-solid border-[#bebebe] text-sm font-bold text-black'
              style={{
                borderWidth: '0 0 1px',
              }}>
              {queryVideos.isLoading ? <Skeleton /> : 'Opening Theme'}
            </h2>
            <div>
              {queryVideos.isLoading ? (
                Array(3)
                  .fill()
                  .map((item, index) => (
                    <Flex key={index} mb={10}>
                      <Skeleton height={55} width={100} />
                      <div className='ml-auto text-right'>
                        <Skeleton height={12} width={100} />
                        <Skeleton height={10} width={100} />
                      </div>
                    </Flex>
                  ))
              ) : queryVideos.data.music_videos.filter((item) => item.title.toLowerCase().includes('op')).length === 0 ? (
                <Text fz={12}>Opening not update yet</Text>
              ) : (
                queryVideos.data.music_videos
                  .filter((item) => item.title.toLowerCase().includes('op'))
                  .map((item, index) => (
                    <Flex key={index} mb={10}>
                      <Image w={100} h={55} src={item.video.images.image_url} alt={item.title?.replace(/[ , -]/g, '_')} />
                      <div className='ml-auto text-right'>
                        <Text fz={12}>{item.title}</Text>
                        <Text fz={10}>{item.meta.title && item.meta.author ? `${item.meta.title} by ${item.meta.author}` : 'N/A'}</Text>
                      </div>
                    </Flex>
                  ))
              )}
            </div>
          </div>
          {/* Ending */}
          <div>
            <h2
              className='border-solid border-[#bebebe] text-sm font-bold text-black'
              style={{
                borderWidth: '0 0 1px',
              }}>
              {queryVideos.isLoading ? <Skeleton /> : 'Ending Theme'}
            </h2>
            <div>
              {queryVideos.isLoading ? (
                Array(3)
                  .fill()
                  .map((item, index) => (
                    <Flex key={index} mb={10}>
                      <Skeleton height={55} width={100} />
                      <div className='ml-auto text-right'>
                        <Skeleton height={12} width={100} />
                        <Skeleton height={10} width={100} />
                      </div>
                    </Flex>
                  ))
              ) : queryVideos.data.music_videos.filter((item) => item.title.toLowerCase().includes('ed')).length === 0 ? (
                <Text fz={12}>Ending not update yet</Text>
              ) : (
                queryVideos.data.music_videos
                  .filter((item) => item.title.toLowerCase().includes('ed'))
                  .map((item, index) => (
                    <Flex key={index} mb={10}>
                      <Image w={100} h={55} src={item.video.images.image_url} alt={item.meta?.title?.replace(/[ , -]/g, '_')} />
                      <div className='ml-auto text-right'>
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
      )}

      {/* recommendation */}
      {queryRecommendation.status === 'error' ? (
        <div className='text-center'>
          <Text>Something went wrong when fetching List Recommendation</Text>
        </div>
      ) : (
        <div>
          <h2
            className='border-solid border-[#bebebe] text-sm font-bold text-black'
            style={{
              borderWidth: '0 0 1px',
            }}>
            {queryRecommendation.status === 'pending' ? <Skeleton /> : 'Recommendations'}
          </h2>
          <div>
            <Recommendation />
          </div>
        </div>
      )}
    </>
  )
}

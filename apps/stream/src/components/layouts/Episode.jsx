import { useState } from 'react'

import { useMobileDevice } from '@shared/hooks/useMobileDevice'

import { Button, Menu, Text } from '@mantine/core'
import { IconPlayerTrackNextFilled, IconPlayerTrackPrevFilled } from '@tabler/icons-react'
import Skeleton from 'react-loading-skeleton'
import { IframePlayer } from './IframePlayer'

import 'react-loading-skeleton/dist/skeleton.css'

const EpisodeLayout = ({ data, isLoading, isError }) => {
  const initialVideo = data?.data?.video_player

  const isMobile = useMobileDevice()

  const [selectedVideo, setCurrentVideo] = useState(null)

  const currentVideo = selectedVideo ?? initialVideo

  const qualities = !isLoading && !isError ? Object.keys(data?.data?.mirrors ?? {}) : []

  return (
    <div className='rounded bg-[#fafafa] p-2'>
      <section>
        <div className='rounded bg-[#e1e7f5] p-2 md:text-center'>
          <h1 className='md:text-md text-sm font-bold'>{isLoading ? <Skeleton /> : data?.data?.judul}</h1>
        </div>

        <div className='mt-2 size-full'>
          {isLoading || !currentVideo ? (
            <Skeleton className='h-[200px] md:h-[400px]' />
          ) : (
            <IframePlayer src={currentVideo} title={data?.data?.judul} />
          )}
        </div>

        <div className='my-2 flex items-center justify-between gap-1 overflow-x-auto sm:my-3 sm:gap-2'>
          {qualities.length > 0 && (
            <div className='flex size-full items-center gap-1 sm:gap-2'>
              {qualities.map((quality) => (
                <Menu key={quality} shadow='md' width={200}>
                  <Menu.Target>
                    <Button size='compact-sm' variant='outline' color='grape'>
                      {quality}
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    {data?.data?.mirrors[quality]?.length > 0 ? (
                      data?.data?.mirrors[quality]?.map((item, index) => (
                        <Menu.Item
                          key={index}
                          bg={item.url === currentVideo ? 'red' : ''}
                          c={item.url === currentVideo ? 'white' : 'dark'}
                          onClick={() => setCurrentVideo(item.url)}>
                          <Text>{item.label}</Text>
                        </Menu.Item>
                      ))
                    ) : (
                      <Menu.Item disabled>
                        <Text>No available sources</Text>
                      </Menu.Item>
                    )}
                  </Menu.Dropdown>
                </Menu>
              ))}
            </div>
          )}

          {data?.data?.mirror && (
            <Menu shadow='md' width={200}>
              <Menu.Target>
                <Button size='compact-sm' variant='outline' color='grape'>
                  Mirror
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                {(data.data.mirror.length > 0 &&
                  data.data?.mirror?.map((item, index) => (
                    <Menu.Item key={index} onClick={() => setCurrentVideo(item.value)}>
                      <Text c={'red'}>{item.label}</Text>
                    </Menu.Item>
                  ))) || (
                  <Menu.Item disabled>
                    <Text>No available sources</Text>
                  </Menu.Item>
                )}
              </Menu.Dropdown>
            </Menu>
          )}

          <div className='ml-auto flex gap-1 whitespace-nowrap sm:gap-2'>
            {isLoading ? (
              <div className='h-6 w-16 sm:h-8 sm:w-18'>
                <Skeleton inline className='size-full' />
              </div>
            ) : (
              data?.data?.prev_episode && (
                <Button component='a' size='compact-sm' variant='outline' color='red' href={`/episode/${data.data.prev_episode}`}>
                  {isMobile ? <IconPlayerTrackPrevFilled stroke={2} /> : 'Prev Eps.'}
                </Button>
              )
            )}

            {isLoading ? (
              <div className='h-6 w-16 sm:h-8 sm:w-18'>
                <Skeleton inline className='size-full' />
              </div>
            ) : (
              data?.data?.next_episode && (
                <Button component='a' size='compact-sm' variant='outline' href={`/episode/${data.data.next_episode}`}>
                  {isMobile ? <IconPlayerTrackNextFilled stroke={2} /> : 'Next Eps.'}
                </Button>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default EpisodeLayout

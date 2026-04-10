import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import { Button, Menu, Text } from '@mantine/core'

import 'react-loading-skeleton/dist/skeleton.css'

const EpisodeLayout = ({ data, isLoading, isError }) => {
  const [currentVideo, setCurrentVideo] = useState(null)

  useEffect(() => {
    if (data?.data?.video_player) {
      setCurrentVideo(data.data.video_player)
    }
  }, [data?.data?.video_player])

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
            <iframe
              src={currentVideo}
              className='h-[200px] w-full rounded-xl md:h-[400px]'
              allowFullScreen
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope'
              loading='eager'
            />
          )}
        </div>

        <div className='sm: flex items-center justify-between gap-1 overflow-x-auto p-2 sm:gap-2 sm:p-3'>
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
                        <Menu.Item key={index} onClick={() => setCurrentVideo(item.url)}>
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

          <div className='ml-auto flex gap-1 whitespace-nowrap sm:gap-2'>
            {isLoading ? (
              <div className='sm:w-18 h-6 w-16 sm:h-8'>
                <Skeleton inline className='size-full' />
              </div>
            ) : (
              data?.data?.prev_episode && (
                <Button component='a' size='compact-sm' variant='outline' color='red' href={`/episode/${data.data.prev_episode}`}>
                  Previous Eps.
                </Button>
              )
            )}

            {isLoading ? (
              <div className='sm:w-18 h-6 w-16 sm:h-8'>
                <Skeleton inline className='size-full' />
              </div>
            ) : (
              data?.data?.next_episode && (
                <Button component='a' size='compact-sm' variant='outline' href={`/episode/${data.data.next_episode}`}>
                  Next Eps.
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

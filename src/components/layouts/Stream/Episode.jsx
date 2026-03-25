import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { NavLink } from 'react-router-dom'

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
    <div className='rounded bg-[#fafafa] p-2 md:mx-auto md:w-5/6'>
      <section>
        <div className='rounded bg-[#e1e7f5] p-2 md:text-center'>
          <h1 className='md:text-md text-sm font-bold'>{isLoading ? <Skeleton /> : data?.data?.judul}</h1>
        </div>

        <div className='mt-2'>
          {isLoading || !currentVideo ? (
            <Skeleton className='h-[200px] md:h-[400px]' />
          ) : (
            <iframe
              src={currentVideo}
              className='h-[200px] w-full md:h-[400px]'
              allowFullScreen
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope'
              loading='eager'
            />
          )}
        </div>

        <div className='flex items-center justify-between py-2'>
          {qualities.length > 0 && (
            <div className='flex gap-3'>
              {qualities.map((quality) => (
                <Menu key={quality} shadow='md' width={200}>
                  <Menu.Target>
                    <Button>{quality}</Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    {data?.data?.mirrors[quality]?.map((item, index) => (
                      <Menu.Item key={index} onClick={() => setCurrentVideo(item.url)}>
                        <Text>{item.label}</Text>
                      </Menu.Item>
                    ))}
                  </Menu.Dropdown>
                </Menu>
              ))}
            </div>
          )}

          <div className='space-x-2'>
            {isLoading ? (
              <Skeleton width={80} height={36} inline />
            ) : (
              data?.data?.prev_episode && (
                <NavLink to={`/stream/episode/${data.data.prev_episode}`}>
                  <Button>Previous Eps.</Button>
                </NavLink>
              )
            )}

            {isLoading ? (
              <Skeleton width={80} height={36} inline />
            ) : (
              data?.data?.next_episode && (
                <NavLink to={`/stream/episode/${data.data.next_episode}`}>
                  <Button>Next Eps.</Button>
                </NavLink>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default EpisodeLayout

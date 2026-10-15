import { Button, Menu, Text } from '@mantine/core'
import { IconPlayerTrackNextFilled, IconPlayerTrackPrevFilled } from '@tabler/icons-react'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { NavLink, useLocation } from 'react-router'

import { useMobileDevice } from '@shared/hooks/useMobileDevice'

import { IframePlayer } from './IframePlayer'

import 'react-loading-skeleton/dist/skeleton.css'

const { VITE_USE_SERVER_ANIME, VITE_MAIN_SERVICE_CLOUD } = import.meta.env

const isCloudServer = VITE_USE_SERVER_ANIME.toLowerCase() === 'cloud'

const EpisodeLayout = ({ data, isLoading, isError }) => {
  const { pathname } = useLocation()

  const initialVideo = useMemo(() => {
    if (isLoading || isError) return null

    if (isCloudServer) return data?.defaultStreamingUrl
    else return data?.video_player
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError, data, pathname])

  const isMobile = useMobileDevice()

  const [selectedVideo, setCurrentVideo] = useState(null)
  const [selectedCurrentVideoId, setSelectedCurrentVideoId] = useState(null)

  const currentVideo = selectedVideo || initialVideo

  useEffect(() => {
    return () => {
      setCurrentVideo(null)
    }
  }, [pathname])

  const qualities = useMemo(() => {
    if (isLoading || isError) return []

    if (isCloudServer) return data?.server?.qualities || []

    return Object.keys(data?.mirrors ?? {}) || []
  }, [data, isLoading, isError])

  const handleCloudChangeCurrentVideo = async (id) => {
    setSelectedCurrentVideoId(id)
    const { data } = await axios(`${VITE_MAIN_SERVICE_CLOUD}/server/${id}`)
    setCurrentVideo(data.data.url)
  }

  return (
    <div className='size-full rounded bg-[#fafafa] p-2'>
      <section className='size-full'>
        <div className='rounded bg-[#e1e7f5] p-2 md:text-center'>
          <h1 className='md:text-md text-sm font-bold'>{isLoading ? <Skeleton /> : data?.judul || data?.title}</h1>
        </div>

        <div className='mt-2 size-full'>
          {isLoading ? (
            <Skeleton className='h-[200px] md:h-[400px]' />
          ) : (
            <IframePlayer key={initialVideo} src={currentVideo} title={data?.judul || data?.title} />
          )}
        </div>

        <div className='flex items-center justify-between gap-1 overflow-x-auto py-2 sm:my-3 sm:gap-2'>
          {qualities.length > 0 && (
            <div className='flex size-full items-center gap-1 sm:gap-2'>
              {isCloudServer
                ? qualities.map((quality) => (
                    <Menu key={quality.title} shadow='md' width={200}>
                      <Menu.Target>
                        <Button size='compact-sm' variant='outline' color='grape'>
                          {quality.title}
                        </Button>
                      </Menu.Target>
                      <Menu.Dropdown>
                        {quality.serverList.length > 0 ? (
                          quality.serverList.map((item, index) => (
                            <Menu.Item
                              key={index}
                              bg={item.serverId === selectedCurrentVideoId ? 'red' : ''}
                              c={item.serverId === selectedCurrentVideoId ? 'white' : 'dark'}
                              onClick={() => handleCloudChangeCurrentVideo(item.serverId)}>
                              <Text>{item.title}</Text>
                            </Menu.Item>
                          ))
                        ) : (
                          <Menu.Item disabled>
                            <Text>No available sources</Text>
                          </Menu.Item>
                        )}
                      </Menu.Dropdown>
                    </Menu>
                  ))
                : qualities.map((quality) => (
                    <Menu key={quality} shadow='md' width={200}>
                      <Menu.Target>
                        <Button size='compact-sm' variant='outline' color='grape'>
                          {quality}
                        </Button>
                      </Menu.Target>
                      <Menu.Dropdown>
                        {data?.mirrors[quality]?.length > 0 ? (
                          data?.mirrors[quality]?.map((item, index) => (
                            <Menu.Item
                              key={index}
                              bg={item.url === selectedVideo ? 'red' : ''}
                              c={item.url === selectedVideo ? 'white' : 'dark'}
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

          {data?.mirror && (
            <Menu shadow='md' width={200}>
              <Menu.Target>
                <Button size='compact-sm' variant='outline' color='grape'>
                  Mirror
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                {(data.mirror.length > 0 &&
                  data.mirror.map((item, index) => (
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
              (data?.prev_episode || data?.prevEpisode) && (
                <NavLink to={`/episode/${data?.prev_episode || data?.prevEpisode.episodeId}`}>
                  <Button size='compact-sm' variant='outline' color='red'>
                    {isMobile ? <IconPlayerTrackPrevFilled stroke={2} /> : 'Prev Eps.'}
                  </Button>
                </NavLink>
              )
            )}

            {isLoading ? (
              <div className='h-6 w-16 sm:h-8 sm:w-18'>
                <Skeleton inline className='size-full' />
              </div>
            ) : (
              (data?.next_episode || data?.nextEpisode) && (
                <NavLink to={`/episode/${data?.next_episode || data.nextEpisode?.episodeId}`}>
                  <Button size='compact-sm' variant='outline'>
                    {isMobile ? <IconPlayerTrackNextFilled stroke={2} /> : 'Next Eps.'}
                  </Button>
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

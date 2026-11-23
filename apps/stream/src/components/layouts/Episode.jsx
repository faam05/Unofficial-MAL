import { Button, Menu, Text } from '@mantine/core'
import { IconPlayerTrackNextFilled, IconPlayerTrackPrevFilled } from '@tabler/icons-react'
import axios from 'axios'
import { Fragment, useEffect, useMemo, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { NavLink, useLocation, useNavigate } from 'react-router'

import { useMobileDevice } from '@shared/hooks/useMobileDevice'
import { IframePlayer } from './IframePlayer'

import 'react-loading-skeleton/dist/skeleton.css'

const { VITE_USE_SERVER_ANIME, VITE_MAIN_SERVICE_CLOUD } = import.meta.env

const isCloudServer = VITE_USE_SERVER_ANIME.toLowerCase() === 'cloud'

const EpisodeLayout = ({ data, isLoading, isError }) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [selectedVideo, setCurrentVideo] = useState(null)
  const [selectedCurrentVideoId, setSelectedCurrentVideoId] = useState(null)

  const initialVideo = useMemo(() => {
    if (isLoading || isError) return null

    if (isCloudServer) {
      if (data?.defaultStreamingUrl) {
        return `${VITE_MAIN_SERVICE_CLOUD}/stream?url=${encodeURIComponent(data?.defaultStreamingUrl)}`
      } else {
        return data.stream.find((item) => item.quality === '720p')?.embedUrl
          ? `${VITE_MAIN_SERVICE_CLOUD}/stream?url=${data.stream.find((item) => item.quality === '720p')?.embedUrl}`
          : `${VITE_MAIN_SERVICE_CLOUD}/stream?url=${encodeURIComponent(data.stream[0]?.embedUrl)}`
      }
    } else return data?.video_player
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError, data, pathname])

  const isMobile = useMobileDevice()

  const currentVideo = selectedVideo || initialVideo

  useEffect(() => {
    return () => {
      setCurrentVideo(null)
    }
  }, [pathname])

  const qualities = useMemo(() => {
    if (isLoading || isError) return []

    if (isCloudServer) {
      if (data && 'source' in data) {
        if (data.source === 'sokuja') return data.stream
        else return data.streamByQuality
      } else return data?.server?.qualities
    }

    return Object.keys(data?.mirrors ?? {}) || []
  }, [data, isLoading, isError])

  const handleCloudChangeCurrentVideo = async (id) => {
    console.log('id', id)
    if (!id.startsWith('http')) {
      setSelectedCurrentVideoId(id)

      const { data } = await axios(`${VITE_MAIN_SERVICE_CLOUD}/server/${id}`)
      if ('embedUrl' in data) {
        const info = await fetch(`${VITE_MAIN_SERVICE_CLOUD}/stream-info?url=${encodeURIComponent(data.embedUrl)}`).then((r) => r.json())
        if (!info.success) {
          setCurrentVideo(data.embedUrl)
        } else {
          setCurrentVideo(`${VITE_MAIN_SERVICE_CLOUD}/stream?url=${encodeURIComponent(data.embedUrl)}`)
        }
      } else {
        setCurrentVideo(data.data.url)
      }
    } else {
      const currentId = data?.stream.find((item) => item.embedUrl === id).id

      setSelectedCurrentVideoId(currentId)
      setCurrentVideo(`${VITE_MAIN_SERVICE_CLOUD}/stream?url=${id}`)
    }
  }

  console.log('qualities', qualities)

  return (
    <>
      {data && 'series' in data && 'slug' in data.series ? (
        <NavLink to={`/anime/${data.series.slug}`} className='max-w-full'>
          <Button size='compact-xs' variant='outline' color='red'>
            <span className='max-w-[calc(100vw-4rem)] truncate sm:max-w-[calc(100vw-8rem)]'>Kembali ke {data.series.judul ?? data.series.title}</span>
          </Button>
        </NavLink>
      ) : (
        <Button size='compact-xs' variant='outline' color='red' onClick={() => navigate(-1)}>
          Kembali
        </Button>
      )}

      <div className='mt-2 rounded bg-[#fafafa]'>
        <section className='flex size-full flex-col gap-2'>
          <div className='rounded bg-[#e1e7f5] p-2 md:text-center'>
            <h1 className='md:text-md text-sm font-bold'>{isLoading ? <Skeleton /> : data?.judul || data?.title}</h1>
          </div>

          <div className='flex-1'>
            {isLoading ? (
              <Skeleton className='h-[200px] md:h-[400px]' />
            ) : (
              <IframePlayer key={initialVideo} src={currentVideo} title={data?.judul || data?.title} />
            )}
          </div>

          <div className='flex items-center justify-between gap-1 overflow-x-auto py-2 sm:gap-2'>
            {qualities.length > 0 && (
              <div className='flex size-full items-center gap-1 sm:gap-2'>
                {isCloudServer ? (
                  <>
                    {qualities.map((quality, index) => (
                      <Fragment key={index}>
                        {'id' in quality && 'embedUrl' in quality && quality.id && quality.embedUrl ? (
                          <Button
                            key={quality.id}
                            size='compact-xs'
                            bg={quality.id === selectedCurrentVideoId ? 'red' : ''}
                            onClick={() => handleCloudChangeCurrentVideo(quality.embedUrl)}>
                            <Text>{quality.quality}</Text>
                          </Button>
                        ) : (
                          <Menu key={quality.title} shadow='md' width={200}>
                            <Menu.Target>
                              <Button size='compact-sm' variant='outline' color='grape'>
                                {quality.title || quality.quality}
                              </Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                              {quality?.serverList?.length > 0 ? (
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
                        )}
                      </Fragment>
                    ))}
                  </>
                ) : (
                  qualities.map((quality) => (
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
                  ))
                )}
              </div>
            )}

            {isCloudServer && data && 'source' in data && data.source === 'sanka' && qualities && typeof qualities === 'object' && (
              <>
                {Object.entries(qualities).map(([quality, servers]) => (
                  <Menu key={quality} shadow='md' width={200}>
                    <Menu.Target>
                      <Button size='compact-sm' variant='outline' color='grape'>
                        {quality}
                      </Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                      {servers.map((server) => (
                        <Menu.Item
                          key={server.serverId}
                          bg={server.serverId === selectedCurrentVideoId ? 'red' : ''}
                          c={server.serverId === selectedCurrentVideoId ? 'white' : 'dark'}
                          onClick={() => handleCloudChangeCurrentVideo(server.serverId)}>
                          <Text>{server.server}</Text>
                        </Menu.Item>
                      ))}
                    </Menu.Dropdown>
                  </Menu>
                ))}
              </>
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
                (data?.prev_episode || data?.prevEpisode || data?.navigation?.prev) && (
                  <NavLink to={`/episode/${data?.prev_episode || data?.prevEpisode?.episodeId || data?.navigation?.prev?.slug}`}>
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
                (data?.next_episode || data?.nextEpisode || data?.navigation?.next) && (
                  <NavLink to={`/episode/${data?.next_episode || data.nextEpisode?.episodeId || data?.navigation?.next?.slug}`}>
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
    </>
  )
}

export default EpisodeLayout

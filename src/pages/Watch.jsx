import { useEffect, useRef, useState } from 'react'
import { Button, Card, Flex } from '@mantine/core'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IconPlayerTrackNext, IconPlayerTrackPrev } from '@tabler/icons-react'
import Skeleton from 'react-loading-skeleton'
import useFetcher from '../hooks/useFetcher'
import VideoPlayer from '../components/VideoPlayer'
import ErrorMessage from '../components/ErrorMessage'
import 'react-loading-skeleton/dist/skeleton.css'

function titleCase(str) {
  var splitStr = str.toLowerCase().split('-')
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  // Directly return the joined string
  return splitStr.join(' ')
}

const Watch = () => {
  const playerRef = useRef(null)
  const { id } = useParams()
  const navigate = useNavigate()
  const [options, setOptions] = useState({
    // autoplay: true,
    // fullscreen: false,
    controls: true,
    responsive: true,
    fluid: true,
    preload: 'metadata',
  })

  const handlePlayerReady = (player) => {
    playerRef.current = player
  }

  const url = `${import.meta.env.DEV ? import.meta.env.VITE_LOCAL_URL : import.meta.env.VITE_PUBLIC_URL}/anime/gogoanime/watch/${id}`
  const { data, isLoading, isError } = useFetcher(url, ['watch', id], true)

  useEffect(() => {
    if (data) {
      let source = []
      let filter = data.sources.filter((item) => {
        if (item.quality === '1080p' || item.quality === 'backup') return true
      })
      filter.map((item) => {
        source.push({
          src: item.url,
        })
      })
      setOptions({
        ...options,
        sources: source,
      })
    }
  }, [isLoading, id])

  let findID = id.substring(0, id.indexOf('-episode'))
  let current = id.split('-').pop()
  const urlEpisode = `${import.meta.env.DEV ? import.meta.env.VITE_LOCAL_URL : import.meta.env.VITE_PUBLIC_URL}/anime/gogoanime/info/${findID}`
  const episode = useFetcher(urlEpisode, ['episodes', findID], true)

  return (
    <>
      {isLoading || episode.isLoading ? (
        <>
          <Skeleton />
          <Skeleton height='calc(100vh - 155px)' />
        </>
      ) : current > episode.data.totalEpisodes ? (
        <ErrorMessage message='Not Found' />
      ) : isError || episode.isError ? (
        <ErrorMessage message='Error when fetching Data, please try again later' />
      ) : (
        <>
          <p className='mb-3 capitalize'>Watch {id.replace(/[ , -]/g, ' ')}</p>
          <Card shadow='sm' padding='xs' withBorder>
            <VideoPlayer options={options} onReady={handlePlayerReady} />
            <Flex className='p-2'>
              {current != 1 && current <= episode.data.totalEpisodes && (
                <Link to={`/watch/${findID}-episode-${Number(current) - 1}`} className='flex items-center'>
                  <IconPlayerTrackPrev color='#B67352' />
                  <span className='ml-1 text-[#B67352]'>{`${titleCase(`${findID}-episode-${Number(current) - 1}`)}`}</span>
                </Link>
              )}
              {current < episode.data.totalEpisodes && (
                <Link to={`/watch/${findID}-episode-${Number(current) + 1}`} className='ml-auto flex items-center'>
                  <span className='mr-1 text-[#B67352]'>{`${titleCase(`${findID}-episode-${Number(current) + 1}`)}`}</span>
                  <IconPlayerTrackNext color='#B67352' />
                </Link>
              )}
            </Flex>
          </Card>
          <Button color='#5BBCFF' mt={10} onClick={() => navigate(-1)}>
            Back
          </Button>
        </>
      )}
    </>
  )
}

export default Watch

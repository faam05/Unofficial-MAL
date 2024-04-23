import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import useFetcher from '../hooks/useFetcher'
import VideoPlayer from '../components/VideoPlayer'
import 'react-loading-skeleton/dist/skeleton.css'
import { Button, Card } from '@mantine/core'

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

  return (
    <div>
      {isLoading ? (
        <>
          <Skeleton />
          <Skeleton height='calc(100vh - 155px)' />
        </>
      ) : isError ? (
        <>
          <div className='flex justify-center flex-col h-[calc(100vh-105px)]'>
            <p className='text-center'>Error when fetching Data, please try again later</p>
          </div>
        </>
      ) : (
        <>
          <p className='mb-3 capitalize'>Watch {id.replace(/[ , -]/g, ' ')}</p>
          <Card shadow='sm' padding='xs' withBorder>
            <VideoPlayer options={options} onReady={handlePlayerReady} />
          </Card>
          <Button mt={10} onClick={() => navigate(-1)}>
            Back
          </Button>
        </>
      )}
    </div>
  )
}

export default Watch

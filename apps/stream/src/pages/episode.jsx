import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useParams, useSearchParams } from 'react-router'

import EpisodeLayout from '../components/layouts/Episode'

const { VITE_MAIN_SERVICE, VITE_USE_SERVER_ANIME, VITE_MAIN_SERVICE_CLOUD } = import.meta.env

const isCloudServer = VITE_USE_SERVER_ANIME.toLowerCase() === 'cloud'

const Episode = () => {
  const { slug } = useParams()
  const queryClient = useQueryClient()
  const [params] = useSearchParams()

  const type = params.get('type') || 'anime'

  let url = ''

  switch (type) {
    case 'movie':
      url = `${VITE_MAIN_SERVICE}/episode2?slug=${slug}`
      break

    default:
      // anime
      if (isCloudServer) url = `${VITE_MAIN_SERVICE_CLOUD}/episode/${slug}`
      else url = `${VITE_MAIN_SERVICE}/episode?slug=${slug}`
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['stream-episode', slug],
    queryFn: async () => await axios(url),
    select: (res) => {
      switch (type) {
        case 'movie':
          return res.data

        default:
          // anime
          if (isCloudServer) return res.data.data
          else return res.data
      }
    },
  })

  if (isError) {
    return (
      <div className='flex flex-col items-center'>
        <p>There was an error, please refresh or click Retry Button</p>
        <button onClick={() => queryClient.invalidateQueries({ queryKey: ['stream-episode', slug], exact: true })}>Retry</button>
      </div>
    )
  }

  return <EpisodeLayout data={data} isError={isError} isLoading={isLoading} />
}

export default Episode

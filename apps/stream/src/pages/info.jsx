import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useParams, useSearchParams } from 'react-router'

import InfoPage from '../components/layouts/Info'

const { VITE_MAIN_SERVICE, VITE_USE_SERVER_ANIME, VITE_MAIN_SERVICE_CLOUD } = import.meta.env

const isCloudServer = VITE_USE_SERVER_ANIME.toLowerCase() === 'cloud'

const InfoAnime = () => {
  const { slug } = useParams()
  const [params] = useSearchParams()

  const type = params.get('type') || 'anime'

  const queryClient = useQueryClient()

  let queryKey, url

  switch (type) {
    case 'movie':
      queryKey = ['stream-movie-info', slug]
      url = `${VITE_MAIN_SERVICE}/anime2?slug=${slug}`

      break

    default:
      // anime
      queryKey = ['stream-anime-info', slug]
      if (isCloudServer) url = `${VITE_MAIN_SERVICE_CLOUD}/anime/${slug}`
      else url = `${VITE_MAIN_SERVICE}/anime?slug=${slug}`

      break
  }

  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: async () => await axios.get(url),
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
        <button onClick={() => queryClient.invalidateQueries({ queryKey: ['stream-anime-info', slug], exact: true })}>Retry</button>
      </div>
    )
  }

  return <InfoPage data={data} isLoading={isLoading} type={type} />
}

export default InfoAnime

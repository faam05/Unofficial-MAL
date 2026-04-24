import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useParams, useSearchParams } from 'react-router-dom'

import InfoPage from '../components/layouts/Info'

const { VITE_MAIN_SERVICE } = import.meta.env

const InfoAnime = () => {
  const { slug } = useParams()
  const [params] = useSearchParams()

  const type = params.get('type') || 'anime'

  let queryKey = ['stream-anime-info', slug]
  let url = `${VITE_MAIN_SERVICE}/anime?slug=${slug}`

  const queryClient = useQueryClient()

  switch (type) {
    case 'movie':
      queryKey = ['stream-movie-info', slug]
      url = `${VITE_MAIN_SERVICE}/anime2?slug=${slug}`

      break

    default:
      // anime
      queryKey = ['stream-anime-info', slug]
      url = `${VITE_MAIN_SERVICE}/anime?slug=${slug}`

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
          return res.data
      }
    },
  })

  if (isError || (data && !isLoading && !isError && !data.judul)) {
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

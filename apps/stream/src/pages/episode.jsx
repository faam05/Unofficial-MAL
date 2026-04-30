import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useParams, useSearchParams } from 'react-router'

import EpisodeLayout from '../components/layouts/Episode'

const { VITE_MAIN_SERVICE } = import.meta.env

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
      url = `${VITE_MAIN_SERVICE}/episode?slug=${slug}`
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['stream-episode', slug],
    queryFn: async () => await axios(url),
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

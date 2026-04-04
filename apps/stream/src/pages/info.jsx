import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import InfoPage from '../components/layouts/Info'

const { VITE_MAIN_SERVICE } = import.meta.env

const InfoAnime = () => {
  const { slug } = useParams()
  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['stream-anime-info', slug],
    queryFn: async () => {
      const res = await axios.get(`${VITE_MAIN_SERVICE}/anime?slug=${slug}`)
      return res.data
    },
  })

  if (isError || (!isLoading && !data)) {
    return (
      <div className='flex flex-col items-center'>
        <p>There was an error, please refresh or click Retry Button</p>
        <button onClick={() => queryClient.invalidateQueries({ queryKey: ['stream-anime-info', slug], exact: true })}>Retry</button>
      </div>
    )
  }

  return <InfoPage data={data} isLoading={isLoading} />
}

export default InfoAnime

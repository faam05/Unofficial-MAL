import { useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import InfoPage from '../../components/pages/stream/Info'

const InfoAnime = () => {
  const { VITE_STREAM_URL } = import.meta.env
  const { slug } = useParams()
  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['stream-anime-info', slug],
    queryFn: async () => {
      const res = await axios.get(`${VITE_STREAM_URL}/anime?slug=${slug}`)
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

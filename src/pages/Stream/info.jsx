import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import InfoPage from '../../components/pages/stream/Info'

const InfoAnime = () => {
  const { DEV, VITE_LOCAL_URL, VITE_PUBLIC_URL } = import.meta.env
  const { slug } = useParams()
  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['stream-anime-info', slug],
    queryFn: async () => await axios(`${DEV ? VITE_LOCAL_URL : VITE_PUBLIC_URL}/stream/anime/${slug}`),
  })
  if (isError) {
    return (
      <div className='flex flex-col items-center'>
        <p>There was an error, please refresh or click Retry Button</p>
        <button
          onClick={() =>
            queryClient.invalidateQueries({
              queryKey: ['stream-anime-info', slug],
              exact: true,
            })
          }>
          Retry
        </button>
      </div>
    )
  }
  return <InfoPage data={data} isLoading={isLoading} isError={isError} />
}

export default InfoAnime

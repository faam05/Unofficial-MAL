import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import EpisodeLayout from '../../components/layouts/Stream/Episode'

const Episode = () => {
  const { DEV, VITE_LOCAL_URL, VITE_PUBLIC_URL } = import.meta.env
  const { slug } = useParams()
  const { data, isLoading, isError, status } = useQuery({
    queryKey: ['stream-episode', slug],
    queryFn: async () => await axios(`${DEV ? VITE_LOCAL_URL : VITE_PUBLIC_URL}/stream/episode/${slug}`),
  })
  if (isError) {
    return (
      <div className='flex flex-col items-center'>
        <p>There was an error, please refresh or click Retry Button</p>
        <button onClick={() => queryClient.invalidateQueries('nowAnime')}>Retry</button>
      </div>
    )
  }
  return <EpisodeLayout data={data} isError={isError} isLoading={isLoading} status={status} />
}

export default Episode

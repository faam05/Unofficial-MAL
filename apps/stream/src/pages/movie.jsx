import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'

import MoviePage from '../components/layouts/Movie'

import 'react-loading-skeleton/dist/skeleton.css'

const { VITE_MAIN_SERVICE } = import.meta.env

const Movie = () => {
  const [activePage, setPage] = useState(1)

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['stream-movie', activePage],
    queryFn: async () => await axios(`${VITE_MAIN_SERVICE}/home?page=${activePage}`),
  })

  if (!isLoading && (typeof data !== 'object' || !data || isError || !data.data || !data.data.ongoing)) {
    return (
      <div className='flex flex-col items-center'>
        <p>There was an error, please refresh or click Retry Button</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    )
  }

  return <MoviePage data={data} isLoading={isLoading} activePage={activePage} setPage={setPage} />
}

export default Movie

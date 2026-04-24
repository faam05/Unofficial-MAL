import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import HomePage from '../components/layouts/Home'

import 'react-loading-skeleton/dist/skeleton.css'

const { VITE_MAIN_SERVICE } = import.meta.env

const Home = () => {
  const {
    data: animeData,
    isLoading: isAnimeLoading,
    isError: isAnimeError,
    refetch: refetchAnime,
  } = useQuery({
    queryKey: ['stream-home', 1],
    queryFn: async () => await axios(`${VITE_MAIN_SERVICE}/home?page=1`),
    select: (res) => res.data.ongoing,
  })

  const {
    data: movieData,
    isLoading: isMovieLoading,
    isError: isMovieError,
    refetch: refetchMovie,
  } = useQuery({
    queryKey: ['stream-movie', 1],
    queryFn: async () => await axios(`${VITE_MAIN_SERVICE}/home-movie2?page=1`),
    select: (res) => res.data.movie,
  })

  if (!isAnimeLoading && (typeof animeData !== 'object' || !animeData || isAnimeError)) {
    return (
      <div className='flex flex-col items-center'>
        <p>There was an error, please refresh or click Retry Button</p>
        <button onClick={() => refetchAnime()}>Retry</button>
      </div>
    )
  }

  if (!isMovieLoading && (typeof movieData !== 'object' || !movieData || isMovieError)) {
    return (
      <div className='flex flex-col items-center'>
        <p>There was an error, please refresh or click Retry Button</p>
        <button onClick={() => refetchMovie()}>Retry</button>
      </div>
    )
  }

  return <HomePage dataAnime={animeData} isLoadingAnime={isAnimeLoading} dataMovie={movieData} isLoadingMovie={isMovieLoading} />
}

export default Home

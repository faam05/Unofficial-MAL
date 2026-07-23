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

  return (
    <HomePage
      dataAnime={animeData}
      isLoadingAnime={isAnimeLoading}
      isAnimeError={isAnimeError}
      refetchAnime={refetchAnime}
      dataMovie={movieData}
      isLoadingMovie={isMovieLoading}
      isMovieError={isMovieError}
      refetchMovie={refetchMovie}
    />
  )
}

export default Home

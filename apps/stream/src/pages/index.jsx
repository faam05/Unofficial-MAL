import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import HomePage from '../components/layouts/Home'

import 'react-loading-skeleton/dist/skeleton.css'

const { VITE_MAIN_SERVICE, VITE_USE_SERVER_ANIME, VITE_MAIN_SERVICE_CLOUD } = import.meta.env

const isCloudServer = VITE_USE_SERVER_ANIME.toLowerCase() === 'cloud'

const Home = () => {
  const {
    data: animeData,
    isLoading: isAnimeLoading,
    isError: isAnimeError,
    refetch: refetchAnime,
  } = useQuery({
    queryKey: ['stream-home', 1],
    queryFn: async () => await axios(isCloudServer ? `${VITE_MAIN_SERVICE_CLOUD}/home` : `${VITE_MAIN_SERVICE}/home?page=1`),
    select: (res) => {
      if (isCloudServer) {
        if ('ongoing' in res.data.data) {
          return res.data.data.ongoing.animeList
        } else {
          return res.data.data
        }
      } else {
        return res.data.ongoing
      }
    },
  })

  const {
    data: movieData,
    isLoading: isMovieLoading,
    isError: isMovieError,
    refetch: refetchMovie,
  } = useQuery({
    queryKey: ['stream-movie', 1],
    queryFn: async () =>
      await axios(isCloudServer ? `${VITE_MAIN_SERVICE_CLOUD}/browse?type=movie&page=1` : `${VITE_MAIN_SERVICE}/home-movie2?page=1`),
    select: (res) => {
      if (isCloudServer) {
        return res.data.items
      } else {
        return res.data.movies
      }
    },
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

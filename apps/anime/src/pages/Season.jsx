import { useState } from 'react'

import { getCurrentSeasonInfo } from '../helpers/date'
import { useAnimeSeason } from '../hooks/useAnimeSeason'

import { AnimeCard } from '../components/layouts/AnimeCard'

import '../styles/season.css'

const ButtonNavigation = ({ season, year = '2026', isActive, setSession, isLoading }) => {
  return (
    <button
      className={`group flex flex-col items-center justify-center ${isActive ? 'text-blue-700 hover:text-blue-700/70' : 'text-black/70 hover:text-blue-700/90'}`}
      onClick={() => setSession(season.toUpperCase())}
      disabled={isLoading}>
      <span className='font-bold capitalize md:text-lg'>{season.toLowerCase()}</span>
      <span className='text-sm text-black/40 md:text-base'>{year}</span>
    </button>
  )
}

const LIST_SEASON = ['WINTER', 'SPRING', 'SUMMER', 'FALL']

const SeasonPage = () => {
  const { season, year } = getCurrentSeasonInfo()
  const [currentSeason, setCurrentSeason] = useState(season)

  const { data: animeList, isLoading, isError, error } = useAnimeSeason(currentSeason, year)

  if (isError) return <div className='p-10 text-red-500'>Error: {error.message}</div>

  return (
    <>
      <section className='mb-2 space-y-2 rounded-md bg-slate-100 pt-2 shadow-md md:mb-4 md:space-y-4 md:pt-4'>
        <h1 className='px-2 text-lg font-bold md:px-4 md:text-2xl'>Anime Seasonal</h1>
        <div className='flex items-center justify-evenly gap-3 rounded-b-md bg-slate-200 p-2'>
          {LIST_SEASON.map((s) => (
            <ButtonNavigation key={s} season={s} year={year} isActive={currentSeason === s} setSession={setCurrentSeason} />
          ))}
        </div>
      </section>

      <section className='grid grid-cols-1 gap-3 py-2 md:py-4 lg:grid-cols-2 xl:grid-cols-3 xl:gap-6 2xl:grid-cols-4'>
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => <AnimeCard key={index} isLoading={true} />)
          : animeList.map((anime) => <AnimeCard key={anime.id} isCurrentSeason={season === anime.season} anime={anime} isLoading={isLoading} />)}
      </section>
    </>
  )
}

export default SeasonPage

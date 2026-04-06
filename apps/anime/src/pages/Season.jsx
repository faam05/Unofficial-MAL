import { useState } from 'react'

import { useMobileDevice } from '@shared'
import { getCurrentSeasonInfo } from '../helpers/date'
import { useAnimeSeason } from '../hooks/useAnime'

import { AnimeCard } from '../components/layouts/AnimeCard'

const ButtonNavigation = ({ season, year = '2026', isActive, setSession }) => {
  return (
    <button
      className={`group flex flex-col items-center justify-center ${isActive ? 'text-blue-700 hover:text-blue-700/70' : 'text-black/70 hover:text-blue-700/90'}`}
      onClick={() => setSession(season.toUpperCase())}>
      <span className='font-bold capitalize md:text-lg'>{season.toLowerCase()}</span>
      <span className='text-sm text-black/40 md:text-base'>{year}</span>
    </button>
  )
}

const LIST_SEASON = ['WINTER', 'SPRING', 'SUMMER', 'FALL']

const SeasonPage = () => {
  const { season, year } = getCurrentSeasonInfo()
  const mobile = useMobileDevice()
  const [currentSeason, setCurrentSeason] = useState(season)

  const { data: animeList, isLoading, isError, error } = useAnimeSeason(currentSeason, year)

  if (isLoading) return <div className='p-10 text-white'>Loading data dari AniList...</div>
  if (isError) return <div className='p-10 text-red-500'>Error: {error.message}</div>

  return (
    <div className='min-h-svh'>
      <section className='mb-2 space-y-2 rounded-md bg-slate-100 pt-2 shadow-md md:mb-4 md:space-y-4 md:pt-4'>
        <h1 className='px-2 text-lg font-bold md:px-4 md:text-2xl'>Anime Seasonal</h1>
        <div className='flex items-center justify-evenly gap-3 rounded-b-md bg-slate-200 p-2'>
          {LIST_SEASON.map((s) => (
            <ButtonNavigation key={s} season={s} year={year} isActive={currentSeason === s} setSession={setCurrentSeason} />
          ))}
        </div>
      </section>

      <section className='grid grid-cols-1 gap-6 p-2 sm:grid-cols-2 md:p-4 lg:grid-cols-4'>
        {animeList.map((anime) => (
          <AnimeCard key={anime.id} isCurrentSeason={season === anime.season} anime={anime} />
        ))}
      </section>
    </div>
  )
}

export default SeasonPage

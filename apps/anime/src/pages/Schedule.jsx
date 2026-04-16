import { getStartDayWeekRange } from '../helpers'
import { useAnimeSchedule } from '../hooks/useAnimeSchedule'

import { AnimeCard } from '../components/layouts/AnimeCard'

import '../styles/season.css'

const SchedulePage = () => {
  const { airingAtGreater, airingAtLesser } = getStartDayWeekRange()

  // const { data: animeList, isLoading, isError, error } = useAnimeSchedule(1, airingAtGreater, airingAtLesser)
  const { data: animeList, isLoading, isError, error } = useAnimeSchedule(airingAtGreater, airingAtLesser)

  if (isError) return <div className='p-10 text-red-500'>Error: {error.message}</div>

  return (
    <div className='size-full space-y-2 p-2 md:space-y-4 md:p-4'>
      <section className='size-full space-y-2 xl:space-y-4'>
        {isLoading ? (
          <div className='grid grid-cols-1 gap-3 py-2 md:py-4 lg:grid-cols-2 xl:grid-cols-3 xl:gap-6 2xl:grid-cols-4'>
            {Array.from({ length: 12 }).map((_, index) => (
              <AnimeCard key={index} isLoading={true} />
            ))}
          </div>
        ) : (
          Object.entries(animeList).map(([day, animeArray], index) => (
            <div key={index} className='space-y-2 xl:space-y-4'>
              <h2 className='border-b-4 border-gray-300 pb-2 text-lg font-bold text-blue-400 md:text-2xl'>{day}</h2>
              <div key={index} className='space-y-2 rounded-md px-2 md:space-y-4 md:px-4'>
                <div className='grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3 xl:gap-6 2xl:grid-cols-4'>
                  {animeArray.map((anime, key) => (
                    <AnimeCard key={key} anime={anime} isLoading={isLoading} isCurrentSeason={true} />
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  )
}

export default SchedulePage

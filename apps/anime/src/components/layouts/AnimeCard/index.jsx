import { useMobileDevice } from '@shared'
import clsx from 'clsx'
import { useSeasonAnimeDetail } from '../../../hooks/useSeasonAnimeDetail'

import { IconUser } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import ImageSkeleton from '../ImageSkeleton'

import 'react-lazy-load-image-component/src/effects/blur.css'

export const AnimeCard = ({ anime, isCurrentSeason, isLoading }) => {
  const mobile = useMobileDevice(1280)

  if (isLoading) {
    return (
      <div className='animate-pulse  rounded-xl bg-slate-200 p-2 xl:p-4'>
        <div className='mb-2 h-36 w-full rounded bg-slate-300 xl:mb-4 xl:h-48' />
        <div className='h-4 w-3/4 rounded bg-slate-300' />
      </div>
    )
  }

  const { showEpisodeInfo, formattedAiringTime, filteredStudios, popularity } = useSeasonAnimeDetail(anime, isCurrentSeason)

  return (
    <div
      className={clsx(
        'group flex size-full max-h-80 overflow-hidden rounded-xl border border-slate-50 bg-slate-100 shadow-xl transition-all duration-300 hover:border-blue-500/70',
      )}>
      {/* left */}
      <div className='relative h-full min-h-56 w-1/2 overflow-hidden sm:w-2/5 xl:min-h-80 xl:w-[52%]'>
        <ImageSkeleton anime={anime} />
        <div className='absolute right-2 top-2 flex items-center gap-1 rounded border border-slate-100 bg-white px-2 py-1 text-[10px] font-bold backdrop-blur-md group-hover:border-blue-300 group-hover:text-blue-700'>
          <IconUser size={10} /> {popularity}
        </div>
        <div className='absolute left-2 top-2 flex items-center gap-1 rounded border border-slate-100 bg-white px-2 py-1 text-[10px] font-bold backdrop-blur-md group-hover:border-blue-300 group-hover:text-blue-700'>
          {anime.format}
        </div>

        <div className='absolute bottom-0 left-0 w-full space-y-1 bg-black/50 p-2 font-bold text-white backdrop-blur-sm lg:p-3 xl:group-hover:bg-blue-500/70'>
          <Link to={`/detail/${anime.idMal}`}>
            <h2 className='text-xs font-bold leading-tight transition-colors lg:text-sm'>{anime.title.romaji}</h2>
          </Link>
          <span className='line-clamp-1 text-[10px] font-bold lg:text-xs' style={{ color: anime.coverImage.color }}>
            {filteredStudios?.name}
          </span>
        </div>
      </div>

      {/* right */}
      <div className='flex max-h-full flex-1 flex-col justify-between overflow-hidden'>
        <div className='flex size-full flex-col gap-1 p-2 lg:gap-1.5 lg:p-4'>
          {showEpisodeInfo && <p className='text-xs text-slate-500 lg:text-sm'>{showEpisodeInfo}</p>}
          {formattedAiringTime && <p className='text-sm font-bold text-black/50 lg:text-lg'>{formattedAiringTime.replace('airing in', '')}</p>}
          {anime.description && (
            <div
              className='custom-scrollbar line-clamp-5 overflow-hidden text-[10px] text-slate-700 lg:max-h-32 lg:text-sm lg:hover:line-clamp-none lg:hover:flex-1 lg:hover:overflow-y-auto'
              dangerouslySetInnerHTML={{ __html: anime.description }}
            />
          )}
        </div>

        {/* Genre Tags */}
        <div className='flex content-end items-center justify-between border-t border-slate-300 bg-slate-200 p-2 lg:px-3 lg:py-3'>
          <div className='flex flex-wrap gap-1'>
            {anime.genres.length > 0 &&
              anime.genres.slice(0, mobile ? 2 : 3).map((genre) => (
                <span
                  key={genre}
                  className='lg"px-2 rounded-full px-1 py-1 text-[8px] font-bold uppercase text-white lg:text-[10px]'
                  style={{ backgroundColor: anime.coverImage.color }}>
                  {genre}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

import { IconUser } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import ImageSkeleton from '../ImageSkeleton'

const MobileAnimeCard = ({ anime, popularity, showEpisodeInfo, formattedAiringTime, filteredStudios }) => {
  return (
    <>
      <div className='w-1/2'>
        {/* IMAGE SECTION */}
        <div className='relative aspect-[3/4] overflow-hidden'>
          <ImageSkeleton anime={anime} />
          <div className='absolute right-2 top-2 flex items-center gap-1 rounded border border-slate-100 bg-white px-2 py-1 text-[10px] font-bold backdrop-blur-md group-hover:border-blue-300 group-hover:text-blue-700'>
            <IconUser size={10} /> {popularity}
          </div>
          <div className='absolute left-2 top-2 flex items-center gap-1 rounded border border-slate-100 bg-white px-2 py-1 text-[10px] font-bold backdrop-blur-md group-hover:border-blue-300 group-hover:text-blue-700'>
            {anime.format}
          </div>
        </div>

        {/* FOOTER SECTION - Tombol ini akan selalu terdorong ke bawah */}
        <div className='flex items-center justify-between border-t border-slate-300 bg-slate-200 p-4  pt-3'>
          <div className='flex flex-col'>
            <span className='line-clamp-1 text-xs font-bold' style={{ color: anime.coverImage.color }}>
              {filteredStudios?.name}
            </span>
            <span className='text-[10px] font-semibold uppercase tracking-wider text-slate-500'>
              {anime.season} {anime.seasonYear}
            </span>
          </div>
        </div>
      </div>

      {/* DETAIL SECTION - Tambahkan flex-1 di sini */}
      <div className='flex flex-1 flex-col justify-between gap-4'>
        {/* Judul dan Genre dibungkus agar tetap di atas */}
        <div className='flex flex-col justify-between gap-2 p-4'>
          <Link to={`/detail/${anime.idMal}`}>
            <h2 className='line-clamp-2 text-sm font-bold leading-tight transition-colors'>{anime.title.romaji}</h2>
          </Link>
          <div className='flex flex-wrap gap-1'>
            {anime.genres.length > 0 &&
              anime.genres.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className='rounded-full px-2 py-1 text-[10px] font-bold uppercase text-white'
                  style={{ backgroundColor: anime.coverImage.color }}>
                  {genre}
                </span>
              ))}
          </div>
          <div className=''>
            <p className='text-sm text-slate-500'>{showEpisodeInfo} airing in</p>
            <p className='text-lg font-bold text-black/50'>{formattedAiringTime.replace('airing in', '')}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileAnimeCard

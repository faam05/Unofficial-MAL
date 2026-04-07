import { Link } from 'react-router-dom'
import { IconClock, IconUser } from '@tabler/icons-react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const DesktopAnimeCard = ({ anime, popularity, showEpisodeInfo, formattedAiringTime, filteredStudios }) => {
  return (
    <>
      {/* IMAGE SECTION */}
      <div className='relative aspect-[3/4] overflow-hidden'>
        <LazyLoadImage
          src={anime.coverImage.large}
          placeholderSrc={anime.coverImage.color}
          alt={anime.title.romaji}
          effect='blur'
          className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110'
        />
        <div className='absolute right-2 top-2 flex items-center gap-1 rounded border border-slate-100 bg-white px-2 py-1 text-[10px] font-bold backdrop-blur-md group-hover:border-blue-300 group-hover:text-blue-700'>
          <IconUser size={10} /> {popularity}
        </div>
        <div className='absolute left-2 top-2 flex items-center gap-1 rounded border border-slate-100 bg-white px-2 py-1 text-[10px] font-bold backdrop-blur-md group-hover:border-blue-300 group-hover:text-blue-700'>
          {anime.format}
        </div>
        <div className='absolute bottom-2 left-2 flex items-center gap-1 rounded border border-slate-100 bg-white  px-2 py-1 text-[10px] font-bold backdrop-blur-md group-hover:border-blue-300 group-hover:text-blue-700'>
          <IconClock size={12} />
          {showEpisodeInfo}
          {formattedAiringTime}
        </div>
      </div>

      {/* DETAIL SECTION - Tambahkan flex-1 di sini */}
      <div className='flex flex-1 flex-col justify-between gap-4'>
        {/* Judul dan Genre dibungkus agar tetap di atas */}
        <div className='flex flex-col justify-between gap-2 p-4'>
          <h2 className='line-clamp-2 text-sm font-bold leading-tight transition-colors group-hover:text-blue-400'>{anime.title.romaji}</h2>
          <div className='flex flex-wrap gap-1'>
            {anime.genres.length > 0 &&
              anime.genres.slice(0, 2).map((genre) => (
                <span key={genre} className='rounded-full bg-blue-600 px-2 py-1 text-[10px] font-bold uppercase text-white'>
                  {genre}
                </span>
              ))}
          </div>
        </div>

        {/* FOOTER SECTION - Tombol ini akan selalu terdorong ke bawah */}
        <div className='flex items-center justify-between border-t border-slate-300 bg-slate-200 p-4  pt-3'>
          <div className='flex flex-col'>
            <span className='line-clamp-1 text-xs group-hover:text-blue-400'>{filteredStudios?.name}</span>
            <span className='text-[10px] font-semibold uppercase tracking-wider text-slate-500'>
              {anime.season} {anime.seasonYear}
            </span>
          </div>
          <Link
            to={`/detail/${anime.idMal}`}
            className='rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-500'>
            Detail
          </Link>
        </div>
      </div>
    </>
  )
}

export default DesktopAnimeCard

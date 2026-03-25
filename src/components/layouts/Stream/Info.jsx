import { LazyLoadImage } from 'react-lazy-load-image-component'
import Skeleton from 'react-loading-skeleton'
import { NavLink } from 'react-router-dom'

import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-loading-skeleton/dist/skeleton.css'

const Info = ({ data: resp, isLoading }) => {
  return (
    <div className='rounded bg-[#fafafa] text-xs sm:text-sm md:mx-auto md:w-5/6 md:p-2'>
      <section>
        <div className='rounded bg-[#e1e7f5] p-2 text-center text-xs sm:text-sm md:text-lg'>
          <h1 className='truncate font-bold'>{isLoading ? <Skeleton /> : resp.judul}</h1>
        </div>
        <div className='md:flex md:justify-between'>
          <div className='mx-auto mt-2 w-fit'>
            {isLoading ? (
              <Skeleton height={220} width={160} />
            ) : (
              // <LazyLoadImage src={data?.data.poster} effect='blur' width={200} height={280} className='object-cover size-full' />
              <LazyLoadImage src={resp.thumbnail} effect='blur' className='h-[220px] w-[160px] object-cover' />
            )}
          </div>
          <div className='flex-1 p-2 text-black'>
            <h2>
              <b className='inline-block sm:w-32'>Title</b>
              <span>: </span>
              <span>{isLoading ? <Skeleton width={200} className='ml-2' /> : resp.info.judul || 'N/A'}</span>
            </h2>
            <h2>
              <b className='inline-block sm:w-32'>Judul Synonim</b>
              <span>: </span>
              <span>{isLoading ? <Skeleton width={200} className='ml-2' /> : resp.info.japanese || 'N/A'}</span>
            </h2>
            <h2>
              <b className='inline-block sm:w-32'>Total Episode</b>
              <span>: </span>
              <span>{isLoading ? <Skeleton width={200} className='ml-2' /> : resp.info.total_episode || 'N/A'}</span>
            </h2>
            <h2>
              <b className='inline-block sm:w-32'>Type</b>
              <span>: </span>
              <span>{isLoading ? <Skeleton width={200} className='ml-2' /> : resp.info.tipe || 'N/A'}</span>
            </h2>
            <h2>
              <b className='inline-block sm:w-32'>Duration</b>
              <span>: </span>
              <span>{isLoading ? <Skeleton width={200} className='ml-2' /> : resp.info.durasi || 'N/A'}</span>
            </h2>
            <h2>
              <b className='inline-block sm:w-32'>Genre</b>
              <span>: </span>
              <span className='capitalize'>
                {isLoading ? (
                  <Skeleton width={200} className='ml-2' />
                ) : (
                  resp.info.genre.map((item, index) => `${item}${resp.info.genre.length === index + 1 ? '' : ', '}`)
                )}
              </span>
            </h2>
            <h2>
              <b className='inline-block sm:w-32'>Studio</b>
              <span>: </span>
              <span>{isLoading ? <Skeleton width={200} className='ml-2' /> : resp.info.studio || 'N/A'}</span>
            </h2>
            <h2>
              <b className='inline-block sm:w-32'>Release Date</b>
              <span>: </span>
              <span>{isLoading ? <Skeleton width={200} className='ml-2' /> : resp.info.tanggal_rilis || 'N/A'}</span>
            </h2>
            <h2>
              <b className='inline-block sm:w-32'>Status</b>
              <span>: </span>
              <span>{isLoading ? <Skeleton width={200} className='ml-2' /> : resp.info.status || 'N/A'}</span>
            </h2>
            <h2>
              <b className='inline-block sm:w-32'>Producers</b>
              <span>: </span>
              <span>{isLoading ? <Skeleton width={200} className='ml-2' /> : resp.info.produser || 'N/A'}</span>
            </h2>
            <h2>
              <b className='inline-block sm:w-32'>Rating</b>
              <span>: </span>
              <span>{isLoading ? <Skeleton width={200} className='ml-2' /> : resp.info.skor || 'N/A'}</span>
            </h2>
          </div>
        </div>
        {resp?.sinopsis && <p className='border-t-2 border-[#1c439b] p-2'>{resp.sinopsis}</p>}
      </section>

      <section>
        <div className='mt-3 bg-[#e1e7f5] p-2 font-semibold'>
          <h1>{isLoading ? <Skeleton /> : `${resp.info.judul} Episode List`}</h1>
        </div>
        <div className='bg-[#bac0ff] '>
          {isLoading ? (
            <Skeleton />
          ) : resp.episodes.length > 0 ? (
            resp.episodes.map((item, index) => (
              <NavLink key={item.slug} to={`/stream/episode/${item.slug}`}>
                <p className={`p-2 ${index % 2 == 1 && 'bg-slate-200'}`}>{item.judul}</p>
              </NavLink>
            ))
          ) : (
            ''
          )}
        </div>
      </section>

      <section>
        <div className='mt-3 bg-[#e1e7f5] p-2 font-semibold'>
          <h1>{isLoading ? <Skeleton /> : `${resp.info.judul} Batch`}</h1>
        </div>
        <div className='md:text-md bg-[#bac0ff] p-2 text-xs sm:text-sm'>
          <p>{isLoading ? <Skeleton /> : resp.batch ? (
            resp.batch.length > 0 && resp.batch.map((item, index) => (
             <NavLink key={item.slug} to={`/stream/batch/${item.slug}`}>
                <p className={`p-2 ${index % 2 == 1 && 'bg-slate-200'}`}>{item.judul}</p>
              </NavLink>
            ))
          ) : 'ASAP'}</p>
        </div>
      </section>
    </div>
  )
}

export default Info

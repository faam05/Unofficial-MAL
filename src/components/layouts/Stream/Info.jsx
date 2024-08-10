import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { NavLink } from 'react-router-dom'

const Info = ({ data, isLoading, isError }) => {
  return (
    <div className='rounded bg-[#fafafa] text-xs sm:text-sm md:mx-auto md:w-5/6 md:p-2'>
      <section>
        <div className='rounded bg-[#e1e7f5] p-2 text-center text-xs sm:text-sm md:text-lg'>
          <h1 className='truncate font-bold'>{isLoading ? <Skeleton /> : data.data.title}</h1>
        </div>
        <div className='md:flex md:justify-between'>
          <div className='mx-auto mt-2 w-fit'>
            {isLoading ? (
              <Skeleton height={280} width={200} />
            ) : (
              // <LazyLoadImage src={data?.data.poster} effect='blur' width={200} height={280} className='size-full object-cover' />
              <LazyLoadImage src={data?.data.poster} effect='blur' className='size-full object-cover md:h-[220px] md:w-[160px]' />
            )}
          </div>
          <div className='flex-1 p-2 text-black'>
            <h2>
              <b className='inline-block sm:w-32'>Title</b>
              <span>: </span>
              <span className='inline-flex'>{isLoading ? <Skeleton width={200} className='ml-2' /> : data.data.title || 'N/A'}</span>
            </h2>
            <h2>
              <b className='inline-block sm:w-32'>Judul Synonim</b>
              <span>: </span>
              <span>{isLoading ? <Skeleton width={200} className='ml-2' /> : data.data.japanese_title || 'N/A'}</span>
            </h2>
            <h2>
              <b className='inline-block sm:w-32'>Total Episode</b>
              <span>: </span>
              <span>{isLoading ? <Skeleton width={200} className='ml-2' /> : data.data.episode_count || 'N/A'}</span>
            </h2>
            <h2>
              <b className='inline-block sm:w-32'>Type</b>
              <span>: </span>
              <span>{isLoading ? <Skeleton width={200} className='ml-2' /> : data.data.type || 'N/A'}</span>
            </h2>
            <h2>
              <b className='inline-block sm:w-32'>Duration</b>
              <span>: </span>
              <span>{isLoading ? <Skeleton width={200} className='ml-2' /> : data.data.duration || 'N/A'}</span>
            </h2>
            <h2>
              <b className='inline-block sm:w-32'>Genre</b>
              <span>: </span>
              <span className='capitalize'>
                {isLoading ? (
                  <Skeleton width={200} className='ml-2' />
                ) : (
                  data.data.genres.map((item, index) => `${item.slug}${data.data.genres.length === index + 1 ? '' : ', '}`)
                )}
              </span>
            </h2>
            <h2>
              <b className='inline-block sm:w-32'>Studio</b>
              <span>: </span>
              <span>{isLoading ? <Skeleton width={200} className='ml-2' /> : data.data.studio || 'N/A'}</span>
            </h2>
            <h2>
              <b className='inline-block sm:w-32'>Release Date</b>
              <span>: </span>
              <span>{isLoading ? <Skeleton width={200} className='ml-2' /> : data.data.release_date || 'N/A'}</span>
            </h2>
            <h2>
              <b className='inline-block sm:w-32'>Status</b>
              <span>: </span>
              <span>{isLoading ? <Skeleton width={200} className='ml-2' /> : data.data.status || 'N/A'}</span>
            </h2>
            <h2>
              <b className='inline-block sm:w-32'>Producers</b>
              <span>: </span>
              <span>{isLoading ? <Skeleton width={200} className='ml-2' /> : data.data.produser || 'N/A'}</span>
            </h2>
            <h2>
              <b className='inline-block sm:w-32'>Rating</b>
              <span>: </span>
              <span>{isLoading ? <Skeleton width={200} className='ml-2' /> : data.data.rating || 'N/A'}</span>
            </h2>
          </div>
        </div>
        {data?.data.synopsis && <p className='border-t-2 border-[#1c439b] p-2'>{data.data.synopsis}</p>}
      </section>

      <section className=''>
        <div className='mt-3 bg-[#e1e7f5] p-2 font-semibold'>
          <h1>{isLoading ? <Skeleton /> : `${data.data.title} Episode List`}</h1>
        </div>
        <div className='bg-[#bac0ff] '>
          {isLoading ? (
            <Skeleton />
          ) : data.data.episode_lists.length > 0 ? (
            data.data.episode_lists.map((item, index) => (
              <NavLink key={item.slug} to={`/stream/episode/${item.slug}`}>
                <p className={`p-2 ${index % 2 == 1 && 'bg-slate-200'}`}>{item.episode}</p>
              </NavLink>
            ))
          ) : (
            ''
          )}
        </div>
      </section>

      <section>
        <div className='mt-3 bg-[#e1e7f5] p-2 font-semibold'>
          <h1>{isLoading ? <Skeleton /> : `${data.data.title} Batch`}</h1>
        </div>
        <div className='md:text-md bg-[#bac0ff] p-2 text-xs sm:text-sm'>
          <p>{isLoading ? <Skeleton /> : data.data.batch ? `${data.data.title} Batch` : 'ASAP'}</p>
        </div>
      </section>
    </div>
  )
}

export default Info

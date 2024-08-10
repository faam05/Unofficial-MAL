import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Accordion from '../../molecules/Accordion'
import { NavLink } from 'react-router-dom'

const EpisodeLayout = ({ data, isLoading, isError, status }) => {
  return (
    <div className='rounded bg-[#fafafa] p-2 md:mx-auto md:w-5/6'>
      <section>
        <div className='rounded bg-[#e1e7f5] p-2 md:text-center'>
          <h1 className='md:text-md text-sm font-bold'>{isLoading ? <Skeleton /> : data.data.episode}</h1>
        </div>
        <div className='mt-2'>{isLoading ? <Skeleton height={400} /> : <iframe src={data.data.stream_url} className='w-full md:h-[400px]' />}</div>
        <div className='flex justify-between'>
          {isLoading ? (
            <Skeleton width={30} />
          ) : (
            data.data.has_previous_episode && (
              <NavLink to={`/stream/episode/${data.data.previous_episode.slug}`} className='mx-1'>
                Prev Eps.
              </NavLink>
            )
          )}
          {isLoading ? (
            <Skeleton width={30} />
          ) : (
            data.data.has_next_episode && (
              <NavLink to={`/stream/episode/${data.data.next_episode.slug}`} className='mx-1'>
                Next Eps.
              </NavLink>
            )
          )}
        </div>
      </section>
      <section>
        <div className='mt-3 rounded bg-[#e1e7f5] p-2 md:text-center'>
          <h1 className='md:text-md text-sm font-bold'>{isLoading ? <Skeleton /> : 'Download'}</h1>
        </div>
        <div className='mt-2'>
          <div className='rounded-sm bg-[#e1e7f5] p-2'>
            <p className='mb-1 border-b border-black text-center'>{isLoading ? <Skeleton /> : '.MKV'}</p>
            {isLoading ? (
              <Skeleton count={3} />
            ) : (
              data.data.download_urls.mkv.map((res, index) => (
                <Accordion title={res.resolution} key={index}>
                  {res.urls.map((url, index) => (
                    <a key={index} href={url.url} target='_blank' className='sm:p-2'>
                      {url.provider}
                    </a>
                  ))}
                </Accordion>
              ))
            )}
          </div>
          <div className='rounded-sm border-t-4 border-[#1c439b] bg-[#e1e7f5] p-2'>
            <p className='mb-1 border-b border-black text-center'>{isLoading ? <Skeleton /> : '.MP4'}</p>
            {isLoading ? (
              <Skeleton count={3} />
            ) : (
              data.data.download_urls.mp4.map((res, index) => (
                <Accordion title={res.resolution} key={index}>
                  {res.urls.map((url, index) => (
                    <a key={index} href={url.url} target='_blank' className='p-2'>
                      {url.provider}
                    </a>
                  ))}
                </Accordion>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default EpisodeLayout

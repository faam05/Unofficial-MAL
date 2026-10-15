import { LazyLoadImage } from 'react-lazy-load-image-component'
import Skeleton from 'react-loading-skeleton'
import { NavLink } from 'react-router'

import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-loading-skeleton/dist/skeleton.css'

const isCloudServer = import.meta.env.VITE_USE_SERVER_ANIME.toLowerCase() === 'cloud'

const InfoPage = ({ data: resp, isLoading, type }) => {
  return (
    <div className='rounded bg-[#fafafa] text-xs sm:text-sm md:mx-auto md:p-2'>
      <section>
        <div className='rounded bg-[#e1e7f5] p-2 text-center text-xs sm:text-sm md:text-lg'>
          <h1 className='truncate font-bold'>{isLoading ? <Skeleton /> : isCloudServer ? resp?.title : resp?.judul}</h1>
        </div>
        <div className='md:flex md:justify-between'>
          <div className='mx-auto mt-2 w-fit'>
            {isLoading ? (
              <Skeleton height={220} width={160} />
            ) : (
              <LazyLoadImage src={isCloudServer ? resp?.poster : resp?.thumbnail} effect='blur' className='h-[220px] w-[160px] object-cover' />
            )}
          </div>
          <div className='flex-1 p-2 text-black'>
            {!isLoading && (resp?.info?.judul || resp.info?.title || resp?.title) && (
              <h2>
                <b className='inline-block sm:w-32'>Title</b>
                <span>: </span>
                <span>
                  {isLoading ? (
                    <Skeleton width={200} className='ml-2' />
                  ) : isCloudServer ? (
                    resp?.title || 'N/A'
                  ) : (
                    resp?.info?.judul || resp.info?.title || 'N/A'
                  )}
                </span>
              </h2>
            )}
            {!isLoading && (resp.info?.japanese || resp?.japanese) && (
              <h2>
                <b className='inline-block sm:w-32'>Judul Synonim</b>
                <span>: </span>
                <span>
                  {isLoading ? (
                    <Skeleton width={200} className='ml-2' />
                  ) : isCloudServer ? (
                    resp?.japanese || 'N/A'
                  ) : (
                    resp.info?.japanese || resp?.japanese || 'N/A'
                  )}
                </span>
              </h2>
            )}
            {!isLoading && (resp.info?.total_episode || resp?.episodes) && (
              <h2>
                <b className='inline-block sm:w-32'>Total Episode</b>
                <span>: </span>
                <span>
                  {isLoading ? (
                    <Skeleton width={200} className='ml-2' />
                  ) : isCloudServer ? (
                    resp?.episodes || 'N/A'
                  ) : (
                    resp.info?.total_episode || 'N/A'
                  )}
                </span>
              </h2>
            )}
            {!isLoading && resp.info?.episode && (
              <h2>
                <b className='inline-block sm:w-32'>Episode</b>
                <span>: </span>
                <span>{isLoading ? <Skeleton width={200} className='ml-2' /> : resp.info?.episode || 'N/A'}</span>
              </h2>
            )}
            <h2>
              <b className='inline-block sm:w-32'>Type</b>
              <span>: </span>
              <span>{isLoading ? <Skeleton width={200} className='ml-2' /> : isCloudServer ? resp?.type || 'N/A' : resp.info?.tipe || 'N/A'}</span>
            </h2>
            <h2>
              <b className='inline-block sm:w-32'>Duration</b>
              <span>: </span>
              <span>
                {isLoading ? <Skeleton width={200} className='ml-2' /> : isCloudServer ? resp?.duration || 'N/A' : resp.info?.durasi || 'N/A'}
              </span>
            </h2>
            {!isLoading && resp.info?.genre && (
              <h2>
                <b className='inline-block sm:w-32'>Genre</b>
                <span>: </span>
                <span className='capitalize'>
                  {isLoading ? (
                    <Skeleton width={200} className='ml-2' />
                  ) : resp.info?.genre.length > 0 ? (
                    resp.info.genre.map((item, index) => `${item}${resp.info?.genre.length === index + 1 ? '' : ', '}`)
                  ) : (
                    'N/A'
                  )}
                </span>
              </h2>
            )}
            {!isLoading && resp?.genreList && (
              <h2>
                <b className='inline-block sm:w-32'>Genre</b>
                <span>: </span>
                <span className='capitalize'>
                  {isLoading ? (
                    <Skeleton width={200} className='ml-2' />
                  ) : resp.genreList?.length > 0 ? (
                    resp.genreList.map((item, index) => `${item.title}${resp.genreList?.length === index + 1 ? '' : ', '}`)
                  ) : (
                    'N/A'
                  )}
                </span>
              </h2>
            )}
            {!isLoading && (resp.info?.studio || resp?.studios) && (
              <h2>
                <b className='inline-block sm:w-32'>Studio</b>
                <span>: </span>
                <span>
                  {isLoading ? <Skeleton width={200} className='ml-2' /> : isCloudServer ? resp?.studios || 'N/A' : resp.info?.studio || 'N/A'}
                </span>
              </h2>
            )}
            {!isLoading && (resp.info?.tanggal_rilis || resp?.aired) && (
              <h2>
                <b className='inline-block sm:w-32'>Release Date</b>
                <span>: </span>
                <span>
                  {isLoading ? <Skeleton width={200} className='ml-2' /> : isCloudServer ? resp?.aired || 'N/A' : resp.info?.tanggal_rilis || 'N/A'}
                </span>
              </h2>
            )}
            {!isLoading && resp.info?.dirilis && (
              <h2>
                <b className='inline-block sm:w-32'>Dirilis</b>
                <span>: </span>
                <span>{isLoading ? <Skeleton width={200} className='ml-2' /> : resp.info?.dirilis || 'N/A'}</span>
              </h2>
            )}
            {!isLoading && resp.info?.diperbarui_pada && (
              <h2>
                <b className='inline-block sm:w-32'>Diperbarui Pada</b>
                <span>: </span>
                <span>{isLoading ? <Skeleton width={200} className='ml-2' /> : resp.info?.diperbarui_pada || 'N/A'}</span>
              </h2>
            )}
            <h2>
              <b className='inline-block sm:w-32'>Status</b>
              <span>: </span>
              <span>
                {isLoading ? <Skeleton width={200} className='ml-2' /> : isCloudServer ? resp?.status || 'N/A' : resp.info?.status || 'N/A'}
              </span>
            </h2>
            {!isLoading && (resp.info?.produser || resp?.producers) && (
              <h2>
                <b className='inline-block sm:w-32'>Producers</b>
                <span>: </span>
                <span>
                  {isLoading ? <Skeleton width={200} className='ml-2' /> : isCloudServer ? resp?.producers || 'N/A' : resp.info?.produser || 'N/A'}
                </span>
              </h2>
            )}
            {!isLoading && (resp.info?.skor || resp?.score) && (
              <h2>
                <b className='inline-block sm:w-32'>Rating</b>
                <span>: </span>
                <span>{isLoading ? <Skeleton width={200} className='ml-2' /> : isCloudServer ? resp?.score || 'N/A' : resp.info?.skor || 'N/A'}</span>
              </h2>
            )}
          </div>
        </div>
        {!isLoading && resp?.sinopsis && <p className='border-t-2 border-[#1c439b] p-2'>{resp?.sinopsis}</p>}
        {!isLoading &&
          resp?.synopsis &&
          resp?.synopsis?.length > 0 &&
          resp?.synopsis.map((item) => <p className='border-t-2 border-[#1c439b] p-2'>{item}</p>)}
      </section>

      <section>
        <div className='mt-3 bg-[#e1e7f5] p-2 font-semibold'>
          <h1>{isLoading ? <Skeleton /> : `${resp.info?.judul || resp.title} Episode List`}</h1>
        </div>
        <div className='flex flex-col bg-[#bac0ff]'>
          {isLoading ? (
            <Skeleton />
          ) : resp.episodes?.length > 0 ? (
            resp.episodes.map((item, index) => {
              let url

              switch (type) {
                case 'movie':
                  url = `/episode/${item.slug}?type=movie`
                  break

                default:
                  // anime
                  url = `/episode/${item.slug}`
              }

              return (
                <NavLink key={item.slug} to={url} className={`p-2${index % 2 == 1 ? ' bg-slate-200' : ''}`}>
                  {item.judul}
                </NavLink>
              )
            })
          ) : resp.episodeList?.length > 0 ? (
            resp.episodeList.map((item, index) => {
              return (
                <NavLink key={item.episodeId} to={`/episode/${item.episodeId}`} className={`p-2${index % 2 == 1 ? ' bg-slate-200' : ''}`}>
                  {item.title}
                </NavLink>
              )
            })
          ) : (
            <span className='p-2'>Episode Not Found</span>
          )}
        </div>
      </section>

      {/* {!isLoading && resp.batch && (
        <section>
          <div className='mt-3 bg-[#e1e7f5] p-2 font-semibold'>
            <h1>{isLoading ? <Skeleton /> : `${resp.info?.judul || resp.title} Batch`}</h1>
          </div>
          <div className='md:text-md bg-[#bac0ff] p-2 text-xs sm:text-sm'>
            <p>
              {isLoading ? (
                <Skeleton />
              ) : resp.batch?.length > 0 ? (
                resp.batch.map((item, index) => (
                  <NavLink key={item.slug} to={`/batch/${item.slug}`}>
                    <span className={`p-2${index % 2 == 1 ? ' bg-slate-200' : ''}`}>{item.judul}</span>
                  </NavLink>
                ))
              ) : (
                <span>Batch Not Found</span>
              )}
            </p>
          </div>
        </section>
      )} */}
    </div>
  )
}

export default InfoPage

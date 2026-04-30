import { Text } from '@mantine/core'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { NavLink } from 'react-router'

import Skeleton from 'react-loading-skeleton'

import 'react-lazy-load-image-component/src/effects/blur.css'

const HomePage = ({ dataAnime, isLoadingAnime, dataMovie, isLoadingMovie }) => {
  return (
    <div className='size-full space-y-4'>
      <section>
        <div className='flex items-center justify-between border-b'>
          <h2 className='font-bold'>{isLoadingAnime ? <Skeleton /> : 'On Going Anime'}</h2>
          <NavLink to='/list-all?type=ongoing' className='text-red-500'>
            See All
          </NavLink>
        </div>
        {/* Ongoing */}
        <div className='mt-2 grid grid-cols-3 gap-1 sm:grid-cols-3 md:grid-cols-5'>
          {isLoadingAnime
            ? Array(15)
                .fill()
                .map((_, index) => <Skeleton key={index} className='h-28 max-h-[220px] sm:h-36 md:h-[220px]' />)
            : dataAnime.slice(0, 10).map((item) => (
                <NavLink
                  key={`${item.slug}_${item.current_episode}`}
                  to={`/anime/${item.slug}`}
                  className='relative overflow-hidden rounded-md text-xs text-white'>
                  <LazyLoadImage
                    src={item.thumbnail}
                    placeholderSrc={item.thumbnail}
                    // effect='blur'
                    // width={160}
                    // height={220}
                    wrapperProps={{
                      style: { transitionDelay: '1s' },
                    }}
                    className='size-full object-cover duration-500 hover:scale-110'
                  />
                  <p className='absolute top-0 bg-black bg-opacity-70 p-0.5 sm:text-sm'>{item.episode}</p>
                  <p className='absolute top-1/2 bg-red-500 bg-opacity-70 p-0.5 sm:text-sm'>{item.tanggal}</p>
                  <p className='absolute right-0 top-0 hidden bg-black bg-opacity-70 p-0.5 sm:block'>{item.hari}</p>
                  <Text
                    lineClamp={1}
                    fz={12}
                    fw={400}
                    w='100%'
                    p='15px 5px 0px'
                    mb='5px'
                    bottom={0}
                    pos='absolute'
                    bg='linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)'
                    style={{
                      // whiteSpace: 'nowrap',
                      boxShadow: '0 5px 0 #000',
                    }}>
                    {item.judul}
                  </Text>
                </NavLink>
              ))}
        </div>
      </section>

      <section>
        <div className='flex items-center justify-between border-b'>
          <h2 className='font-bold'>{isLoadingMovie ? <Skeleton /> : 'Movie'}</h2>
          <NavLink to='/list-all?type=movie' className='text-red-500'>
            See All
          </NavLink>
        </div>
        {/* Movie */}
        <div className='mt-2 grid grid-cols-3 gap-1 sm:grid-cols-3 md:grid-cols-5'>
          {isLoadingMovie
            ? Array(15)
                .fill()
                .map((_, index) => <Skeleton key={index} className='h-28 max-h-[220px] sm:h-36 md:h-[220px]' />)
            : dataMovie.slice(0, 10).map((item) => (
                <NavLink
                  key={`${item.slug}_${item.current_episode}`}
                  to={`/anime/${item.slug}?type=movie`}
                  className='relative overflow-hidden rounded-md text-xs text-white'>
                  <LazyLoadImage
                    src={item.thumbnail}
                    placeholderSrc={item.thumbnail}
                    // effect='blur'
                    // width={160}
                    // height={220}
                    wrapperProps={{
                      style: { transitionDelay: '1s' },
                    }}
                    className='size-full object-cover duration-500 hover:scale-110'
                  />
                  <p className='absolute top-0 bg-black bg-opacity-70 p-0.5 sm:text-sm'>{item.episode}</p>
                  <p className='absolute top-1/2 bg-red-500 bg-opacity-70 p-0.5 sm:text-sm'>{item.tanggal}</p>
                  <p className='absolute right-0 top-0 hidden bg-black bg-opacity-70 p-0.5 sm:block'>{item.hari}</p>
                  <Text
                    lineClamp={1}
                    fz={12}
                    fw={400}
                    w='100%'
                    p='15px 5px 0px'
                    mb='5px'
                    bottom={0}
                    pos='absolute'
                    bg='linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)'
                    style={{
                      // whiteSpace: 'nowrap',
                      boxShadow: '0 5px 0 #000',
                    }}>
                    {item.judul}
                  </Text>
                </NavLink>
              ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage

import { Text } from '@mantine/core'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import Skeleton from 'react-loading-skeleton'
import { NavLink } from 'react-router-dom'

const Home = ({ data, isLoading, isError }) => {
  return (
    <>
      <h1 className='border-b font-bold'>{isLoading ? <Skeleton /> : 'On Going Anime'}</h1>
      <div className='grid grid-cols-3 gap-1 sm:grid-cols-3 md:grid-cols-5'>
        {isLoading
          ? Array(15)
              .fill()
              .map((_, index) => <Skeleton key={index} className='h-28 max-h-[220px] sm:h-36 md:h-[220px]' />)
          : data.data.ongoing_anime.map((item) => (
              <NavLink key={`${item.slug}_${item.current_episode}`} to={`/stream/anime/${item.slug}`} className='relative overflow-hidden'>
                <LazyLoadImage
                  src={item.poster}
                  placeholderSrc={item.poster}
                  effect='blur'
                  // width={160}
                  // height={220}
                  className='size-full object-cover'
                />
                <p className='absolute top-0 bg-black bg-opacity-70 p-0.5 text-xs text-white sm:text-sm'>{item.current_episode}</p>
                <p className='absolute top-8 bg-black bg-opacity-70 p-0.5 text-xs text-white'>{item.newest_release_date}</p>
                <p className='absolute right-0 top-0 hidden bg-black bg-opacity-70 p-0.5 text-xs  text-white sm:block'>{item.release_day}</p>
                <Text
                  lineClamp={1}
                  fz={12}
                  fw={400}
                  w='100%'
                  c='#fff'
                  p='15px 5px 0px'
                  mb='5px'
                  bottom={0}
                  pos='absolute'
                  bg='linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)'
                  style={{
                    // whiteSpace: 'nowrap',
                    boxShadow: '0 5px 0 #000',
                  }}>
                  {item.title}
                </Text>
              </NavLink>
            ))}
      </div>
    </>
  )
}

export default Home

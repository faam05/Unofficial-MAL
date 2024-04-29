import { Text } from '@mantine/core'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const HomeCard = ({ item, topText }) => {
  return (
    <NavLink aria-labelledby={`${item.mal_id}_${item.title.replace(/ /g, '')}`} to={`/detail/${item.mal_id}`} className='relative'>
      <LazyLoadImage
        src={item.images.webp.image_url}
        placeholderSrc={item.images.webp.small_image_url}
        width={160}
        height={220}
        alt={item.title.replace(/[ , -]/g, '_')}
        effect='blur'
      />
      {topText && (
        <Text
          c='white'
          fz={14}
          fw={600}
          pos='absolute'
          top={0}
          right={0}
          p='0px 5px'
          bg='linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)'>
          {topText}
        </Text>
      )}
      <Text
        lineClamp={2}
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
  )
}

export default HomeCard

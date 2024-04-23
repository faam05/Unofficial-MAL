import { Carousel } from '@mantine/carousel'
import { Image, Text } from '@mantine/core'
import React from 'react'
import { NavLink } from 'react-router-dom'

const HomeCard = ({ index, item, isRank }) => {
  return (
    <NavLink
      aria-labelledby={`${item.mal_id}_${item.title.replace(/ /g, '')}`}
      to={`/detail/${item.mal_id}`}
      style={{
        position: 'relative',
      }}>
      <Image
        className='hover:ease-in-out transition-all transform'
        h={220}
        w={160}
        src={item.images.webp.image_url}
        alt={item.title.replace(/[ , -]/g, '_')}
      />
      {isRank && (
        <Text
          c='white'
          fz={14}
          fw={600}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            padding: '0px 5px',
            background: `linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)`,
          }}>
          # {index + 1}
        </Text>
      )}
      <Text
        lineClamp={2}
        fz={12}
        fw={400}
        w='100%'
        c='#fff'
        style={{
          // whiteSpace: 'nowrap',
          padding: '15px 5px 0px',
          marginBottom: '5px',
          boxShadow: '0 5px 0 #000',
          bottom: 0,
          position: 'absolute',
          background: `linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)`,
        }}>
        {item.title}
      </Text>
    </NavLink>
  )
}

export default HomeCard

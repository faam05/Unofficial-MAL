import { useState } from 'react'

import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function ImageSkeleton({ anime }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className='relative size-full'>
      {!loaded && (
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: anime.coverImage.color,
            animation: 'pulse 1.5s infinite',
          }}
        />
      )}

      <LazyLoadImage
        src={anime.coverImage.large}
        alt={anime.title.romaji}
        effect='blur'
        onLoad={() => setLoaded(true)}
        wrapperClassName='size-full'
        className='size-full object-cover transition-transform duration-500'
      />
    </div>
  )
}

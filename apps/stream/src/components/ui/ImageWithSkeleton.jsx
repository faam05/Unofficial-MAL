'use client'

import { useState } from 'react'
import clsx from 'clsx'

const ImageWithSkeleton = ({ loaderClassName, containersClassName, children, ...rest }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <>
      <div className={clsx('relative flex size-full items-center justify-center', containersClassName)}>
        {!imageLoaded && <div className={`absolute size-full animate-pulse rounded bg-gray-200 ${loaderClassName || ''}`} />}
        <img
          {...rest}
          alt={rest.alt || ''}
          onLoad={() => {
            setImageLoaded(true)
          }}
          onError={(e) => {
            console.error('Image failed to load for:', rest.src, e) // Tambahkan log error ini
          }}
          className={clsx('size-full object-cover duration-500', imageLoaded ? 'opacity-100' : 'opacity-0', rest.className)}
        />
        {imageLoaded && children}
      </div>
    </>
  )
}

export default ImageWithSkeleton

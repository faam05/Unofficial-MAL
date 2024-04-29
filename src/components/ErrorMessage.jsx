import React from 'react'

const ErrorMessage = ({ message }) => {
  return (
    <div className='flex justify-center gap-1 p-2 font-mono text-red-600'>
      <span>{message}</span>
      <span className='relative flex h-3 w-3'>
        <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75'></span>
        <span className='relative inline-flex h-3 w-3 rounded-full bg-red-500'></span>
      </span>
    </div>
  )
}

export default ErrorMessage

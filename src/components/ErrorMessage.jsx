import React from 'react'

const ErrorMessage = ({ message }) => {
  return (
    <div className='flex gap-1 text-red-600 font-mono p-2 justify-center'>
      <span>{message}</span>
      <span class='relative flex h-3 w-3'>
        <span class='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
        <span class='relative inline-flex rounded-full h-3 w-3 bg-red-500'></span>
      </span>
    </div>
  )
}

export default ErrorMessage

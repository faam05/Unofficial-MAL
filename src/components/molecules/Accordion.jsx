import React from 'react'

const Accordion = ({ title, children }) => {
  return (
    <div className='relative overflow-hidden'>
      <input type='checkbox' className='peer absolute inset-x-0 top-0 z-10 h-12 w-full cursor-pointer opacity-0' />
      <div className='flex h-12 w-full items-center bg-[#bac0ff] pl-5'>
        <h1>{title}</h1>
      </div>
      <div className='absolute right-3 top-3 rotate-0 transition-transform duration-500 peer-checked:-rotate-90'>
        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
        </svg>
      </div>
      <div className='max-h-0 overflow-hidden bg-white transition-all duration-500 peer-checked:max-h-40'>
        <div className='grid grid-cols-2 border-t p-5 text-center sm:block sm:text-left'>{children}</div>
      </div>
    </div>
  )
}

export default Accordion

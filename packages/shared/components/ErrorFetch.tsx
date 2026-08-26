import { ReactNode } from 'react'

const ErrorFetch = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex flex-col items-center'>
      <p>There was an error, please refresh or click Retry Button</p>
      {children}
    </div>
  )
}

export default ErrorFetch

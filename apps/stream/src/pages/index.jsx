import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import StreamPage from '../components/layouts/Home'

import 'react-loading-skeleton/dist/skeleton.css'

const { VITE_MAIN_SERVICE } = import.meta.env

const Stream = () => {
  const { data, isLoading, isError, refetch } = useQuery({ queryKey: ['stream-home'], queryFn: async () => await axios(`${VITE_MAIN_SERVICE}/home`) })

  if (!isLoading && (typeof data !== 'object' || !data || isError || !data.data || !data.data.ongoing)) {
    return (
      <div className='flex flex-col items-center'>
        <p>There was an error, please refresh or click Retry Button</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    )
  }

  return <StreamPage data={data} isLoading={isLoading} />
}

export default Stream

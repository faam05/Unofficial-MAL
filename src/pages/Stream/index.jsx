import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import 'react-loading-skeleton/dist/skeleton.css'
import StreamPage from '../../components/pages/stream/Home'

const Stream = () => {
  const { DEV, VITE_LOCAL_URL, VITE_PUBLIC_URL } = import.meta.env

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['stream-home'],
    queryFn: async () => await axios(`${DEV ? VITE_LOCAL_URL : VITE_PUBLIC_URL}/stream/home`),
  })

  if (isError) {
    return (
      <div className='flex flex-col items-center'>
        <p>There was an error, please refresh or click Retry Button</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    )
  }
  return <StreamPage data={data} isError={isError} isLoading={isLoading} />
}

export default Stream

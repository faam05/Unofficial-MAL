import { Text } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import Skeleton from 'react-loading-skeleton'
import { useFirstLetter } from '../hooks/useFirstLetter'
import CardLoading from '../components/loading/CardLoading'
import DisplayCard from '../components/DisplayCard'

export default function ComingSoon() {
  const { VITE_MAIN_URL } = import.meta.env
  const { data, isLoading, isError } = useQuery({
    queryKey: ['comingSoon'],
    queryFn: async () => {
      const response = await fetch(`${VITE_MAIN_URL}/seasons/upcoming`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const { data } = await response.json()
      return data
    },
  })

  if (isError) return <Text>Something went wrong</Text>

  return (
    <>
      <Text
        variant='gradient'
        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
        sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
        ta='center'
        size='xl'
        className='capitalize'
        fw={700}>
        {!isLoading ? `coming soon` : <Skeleton />}
      </Text>
      {!isLoading ? data.length > 0 ? <DisplayCard data={data} /> : <p>Tidak ada data</p> : <CardLoading />}
    </>
  )
}

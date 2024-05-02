import { Text } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import Skeleton from 'react-loading-skeleton'
import { useFirstLetter } from '../hooks/useFirstLetter'
import CardLoading from '../components/loading/CardLoading'
import DisplayCard from '../components/DisplayCard'

export default function ComingSoon() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['comingSoon'],
    queryFn: async () => {
      const response = await fetch('https://api.jikan.moe/v4/seasons/upcoming')
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
        fw={700}>
        {!isLoading ? `${useFirstLetter(data[0].season)}` : <Skeleton />}
      </Text>
      {!isLoading ? data.length > 0 ? <DisplayCard data={data} /> : <p>Tidak ada data</p> : <CardLoading />}
    </>
  )
}

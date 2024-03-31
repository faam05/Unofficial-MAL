import { Center, Text } from '@mantine/core'
import { useParams } from 'react-router-dom'
import CardLoading from '../components/loading/CardLoading'
import DisplayCard from '../components/DisplayCard'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '../utils'

export default function Search() {
  const { value } = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['search', value],
    queryFn: async () =>
      fetcher(`
    https://api.jikan.moe/v4/anime?q=${value}`),
    // retry: 10,
  })

  if (isError)
    return (
      <Center>
        <Text>Something went wrong when fetching Search</Text>
      </Center>
    )

  return (
    <>
      <Text
        variant='gradient'
        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
        sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
        ta='center'
        fz='xl'
        fw={700}>
        Result
      </Text>
      {!isLoading ? data.length > 0 ? <DisplayCard data={data} /> : <p>Tidak ada data</p> : <CardLoading />}
    </>
  )
}

import { Center, Text } from '@mantine/core'
import { useParams } from 'react-router-dom'
import CardLoading from '../components/loading/CardLoading'
import DisplayCard from '../components/DisplayCard'
import useFetcher from '../hooks/useFetcher'

export default function Search() {
  const { value } = useParams()

  const { data, isLoading, isError } = useFetcher(`https://api.jikan.moe/v4/anime?q=${value}`, ['search', value])

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

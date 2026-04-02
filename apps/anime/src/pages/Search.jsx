import { useParams } from 'react-router-dom'

import { useFetcher } from '@shared'

import { Center, Text } from '@mantine/core'
import DisplayCard from '../components/molecules/DisplayCard'
import CardLoading from '../components/loading/CardLoading'

const { VITE_MAIN_SERVICE_URL } = import.meta.env

export default function Search() {
  const { value } = useParams()

  const { data, isLoading, isError } = useFetcher(`${VITE_MAIN_SERVICE_URL}/anime?q=${value}`, ['search', value])

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

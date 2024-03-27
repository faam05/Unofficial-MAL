import { Text } from '@mantine/core'
import { useParams } from 'react-router-dom'
import Layout from '../components/layouts'
import CardLoading from '../components/loading/CardLoading'
import DisplayCard from '../components/DisplayCard'
import { useQuery } from '@tanstack/react-query'

export default function Search() {
  const params = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['search', params.value],
    queryFn: async () => {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${params.value}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const { data } = await response.json()
      return data
    },
    // retry: 10,
  })

  if (isError) return <Text>Something went wrong</Text>

  return (
    <Layout>
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
    </Layout>
  )
}

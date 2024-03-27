import { Text } from '@mantine/core'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/layouts'
import CardLoading from '../components/loading/CardLoading'
import DisplayCard from '../components/DisplayCard'

export default function Search() {
  const params = useParams()
  const [data, setData] = useState(null)

  const getData = async () => {
    setData(null)
    const { data } = await axios(`https://api.jikan.moe/v4/anime?q=${params.value}`)
    setData(data.data)
  }
  useEffect(() => {
    getData()

    return () => setData(null)
  }, [params])

  // const matches = useMediaQuery('(min-width: 720px)')
  // const matches = useMobileDevice()

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
      {data ? data.length > 0 ? <DisplayCard data={data} /> : <p>Tidak ada data</p> : <CardLoading />}
    </Layout>
  )
}

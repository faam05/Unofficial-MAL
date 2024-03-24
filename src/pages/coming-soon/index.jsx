import { Text } from '@mantine/core'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/layouts'
import CardLoading from '../../components/loading/CardLoading'
import DisplayCard from '../../components/DisplayCard'
import Skeleton from 'react-loading-skeleton'
import { useFirstLetter } from '../../hooks'

export default function ComingSoon() {
  const params = useParams()
  const [data, setData] = useState(null)

  useEffect(() => {
    const getData = async () => {
      setData(null)
      try {
        const { data } = await axios(`https://api.jikan.moe/v4/seasons/upcoming`)
        setData(data.data)
        // console.log(data.data[0].season)
        console.log(data.data[0].season.charAt(0).toUpperCase() + data.data[0].season.slice(1))
      } catch (error) {
        console.error('error', error)
      }
    }
    getData()

    return () => setData(null)
  }, [params])

  // const matches = useMediaQuery('(min-width: 720px)')
  //   const matches = useMobileDevice()

  return (
    <Layout>
      <Text
        variant='gradient'
        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
        sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
        ta='center'
        fz='xl'
        fw={700}>
        {data ? `${useFirstLetter(data[0].season)} Anime` : <Skeleton />}
      </Text>
      {data ? data.length > 0 ? <DisplayCard data={data} /> : <p>Tidak ada data</p> : <CardLoading />}
    </Layout>
  )
}

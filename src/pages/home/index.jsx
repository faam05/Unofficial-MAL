import React, { useEffect, useState } from 'react'
import Layout from '../../components/layouts'
import Layout3 from '../../components/layouts/index3'
import { useMediaQuery } from '@mantine/hooks'
import HomeDesktop from './Desktop/HomeDesktop'
import HomeMobile from './Mobile/HomeMobile'
import { Text } from '@mantine/core'
import axios from 'axios'

export default function Home() {
  const matches = useMediaQuery('(min-width: 768px)')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    setLoading(true)
    try {
      const { data } = await axios(`https://api.jikan.moe/v4/seasons/now`)
      setData(data.data)
    } catch (e) {
      console.log('error', e)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getData()
    localStorage.removeItem('search')
  }, [])

  return (
    <Layout>
      {!loading && data && data.length > 0 ? <>{matches ? <HomeDesktop data={data} /> : <HomeMobile data={data} />}</> : <Text>Loading...</Text>}
    </Layout>
  )
}

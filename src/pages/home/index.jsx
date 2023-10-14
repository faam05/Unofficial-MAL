import React, { useEffect, useState } from 'react'
import Layout from '../../components/layouts'
import Layout3 from '../../components/layouts/index3'
import { useMediaQuery } from '@mantine/hooks'
import HomeDesktop from './Desktop/HomeDesktop'
import HomeMobile from './Mobile/HomeMobile'
import axios from 'axios'
import { Text } from '@mantine/core'
import useMobileDevice from '../../hooks/useMobile'

export default function Home() {
  // const matches = useMediaQuery('(min-width: 720px)')
  const mobile = useMobileDevice()
  const [data, setData] = useState([])
  const [schedule, setSchedule] = useState([])
  const [topAnime, setTopAnime] = useState([])
  const [loading, setLoading] = useState(true)

  const getDate = new Date()
  const date = getDate.toLocaleString('en-EN', { weekday: 'long' })

  const getData = async () => {
    setLoading(true)
    setTimeout(async () => {
      try {
        const { data } = await axios(`https://api.jikan.moe/v4/seasons/now`)
        setData(data.data)
      } catch (e) {
        console.log('error', e)
      }
    }, 500)
    setTimeout(async () => {
      try {
        const res = await axios(`https://api.jikan.moe/v4/schedules?filter=${date.toLowerCase()}`)
        setSchedule(res.data.data)
      } catch (e) {
        console.log('error', e)
      }
    }, 500)
    setTimeout(async () => {
      try {
        const resTop = await axios(`https://api.jikan.moe/v4/top/anime`)
        setTopAnime(resTop.data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }, 500)
  }
  useEffect(() => {
    getData()
    localStorage.removeItem('search')
  }, [])

  return (
    <Layout>
      {mobile ? (
        <HomeMobile topAnime={topAnime} loading={loading} schedule={schedule} data={data} />
      ) : (
        <HomeDesktop topAnime={topAnime} loading={loading} schedule={schedule} data={data} />
      )}
      {/* {!loading && data && data.length > 0 ? (
        matches ? (
          <HomeDesktop schedule={schedule} data={data} loading={loading} />
        ) : (
          <HomeMobile schedule={schedule} data={data} loading={loading} />
        )
      ) : (
        <Text>Loading...</Text>
      )} */}
    </Layout>
  )
}

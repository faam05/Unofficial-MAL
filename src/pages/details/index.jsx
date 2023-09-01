import { useMediaQuery } from '@mantine/hooks'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/layouts'
import '../../styles/detail.css'
import DetailDesktop from './Desktop'
import DetailMobile from './Mobile'

function Detail() {
  const params = useParams()
  const [data, setData] = useState(null)
  const [dataAccordion, setDataAccordion] = useState(null)
  const [characters, setCharacters] = useState([])
  const [opened, setOpened] = useState(false)

  const [activeTab, setActiveTab] = useState('details')
  const [accordionValue, setAccordionValue] = useState('characters')

  const getDataDesktop = async () => {
    try {
      if (activeTab == 'details') {
        const { data } = await axios(`https://api.jikan.moe/v4/anime/${params.id}/full`)
        setData(data.data)
      } else if (activeTab == 'characters') {
        const characters = await axios(`https://api.jikan.moe/v4/anime/${params.id}/characters`)
        setCharacters(characters.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getDataAccordion = async () => {
    try {
      if (accordionValue == 'characters') {
        const { data } = await axios(`https://api.jikan.moe/v4/anime/${params.id}/characters`)
        setDataAccordion(data.data)
      }
      // else if (accordionValue == 'reviews') {
      //   // setCharacters(characters.data.data)
      // }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDataDesktop()
  }, [activeTab, params.id])

  useEffect(() => {
    getDataAccordion()
  }, [params.id, accordionValue])

  const matches = useMediaQuery('(min-width: 768px)')

  return (
    <Layout>
      {data ? (
        <>
          {matches ? (
            <DetailDesktop data={data} characters={characters} activeTab={activeTab} setActiveTab={setActiveTab} />
          ) : (
            <DetailMobile
              data={data}
              opened={opened}
              setOpened={setOpened}
              accordionValue={accordionValue}
              setAccordionValue={setAccordionValue}
              dataAccordion={dataAccordion}
            />
          )}
        </>
      ) : (
        <p> Loading...</p>
      )}
    </Layout>
  )
}
export default Detail

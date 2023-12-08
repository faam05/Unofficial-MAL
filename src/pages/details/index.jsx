import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/layouts'
import '../../styles/detail.css'
import DetailDesktop from './Desktop'
import DetailMobile from './Mobile'
import useMobileDevice from '../../hooks/useMobile'

function Detail() {
  const params = useParams()

  const [id, setId] = useState(null)
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(false)

  // Data
  const [data, setData] = useState(null)
  // const [characters, setCharacters] = useState([])
  // const [dataStaff, setDataStaff] = useState([])

  // Desktop
  // const [activeTab, setActiveTab] = useState('details')

  // Mobiles
  const [opened, setOpened] = useState(false)
  const [accordionValue, setAccordionValue] = useState('characters')
  const [dataAccordion, setDataAccordion] = useState(null)

  const mobile = useMobileDevice()
  // const matches = useMediaQuery('(min-width: 720px)')

  // Desktop
  // const getDataDesktop = async () => {
  //   try {
  //     if (params.id != id) {
  //       setLoading(true)
  //       setActiveTab('details')
  //     }
  //     if (activeTab == 'details') {
  //       if (data === null || id != params.id) {
  //         setCharacters([])
  //         setDataStaff([])
  //         const { data } = await axios(`https://api.jikan.moe/v4/anime/${params.id}/full`)
  //         setData(data.data)
  //         setId(data.data.mal_id)
  //         setLoading(false)
  //       }
  //     } else if (activeTab == 'characters') {
  //       if (characters.length == 0 || id != params.id) {
  //         const { data } = await axios(`https://api.jikan.moe/v4/anime/${params.id}/characters`)
  //         setCharacters(data.data)
  //         setLoading(false)
  //       }
  //     } else if (activeTab == 'staff') {
  //       if (dataStaff.length == 0 || id != params.id) {
  //         const { data } = await axios(`https://api.jikan.moe/v4/anime/${params.id}/staff`)
  //         setDataStaff(data.data)
  //         setLoading(false)
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error)
  //     setError(true)
  //     setLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   setLoading(true)
  //   if (!mobile) getDataDesktop()

  //   return () => {
  //     // cleanup
  //   }
  // }, [activeTab, params.id])

  // Mobiles
  const getDataAccordion = async () => {
    try {
      const { data } = await axios(`https://api.jikan.moe/v4/anime/${params.id}/full`)
      setData(data.data)

      if (accordionValue == 'characters') {
        const { data } = await axios(`https://api.jikan.moe/v4/anime/${params.id}/characters`)
        setDataAccordion(data.data)
      }
      // else if (accordionValue == 'reviews') {
      //   // setCharacters(characters.data.data)
      // }
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }

  useEffect(() => {
    if (mobile) getDataAccordion()
  }, [params.id, accordionValue])

  return (
    <Layout>
      {/* {!loading ? (
        <>
          {!mobile ? (
            // <DetailDesktop data={data} characters={characters} staff={dataStaff} activeTab={activeTab} setActiveTab={setActiveTab} />
            <DetailDesktop />
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
      ) : error ? (
        <p>Something went wrong</p>
      ) : (
        <p> Loading...</p>
      )} */}
      {!mobile ? (
        // <DetailDesktop data={data} characters={characters} staff={dataStaff} activeTab={activeTab} setActiveTab={setActiveTab} />
        <DetailDesktop />
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
    </Layout>
  )
}
export default Detail

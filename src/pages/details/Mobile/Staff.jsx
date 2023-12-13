import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink, useParams } from 'react-router-dom'
import { Image, Text } from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import StaffMLoading from '../../../components/loading/LStaffM'
import MyCarousel from '../../../components/Carousel'

const StaffMobile = ({ accordionValue, id, loaded }) => {
  const params = useParams()
  const [dataStaff, setDataStaff] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const getData = async () => {
    try {
      if (dataStaff.length == 0 || id != params.id) {
        const { data } = await axios(`https://api.jikan.moe/v4/anime/${params.id}/staff`)
        setDataStaff(data.data)
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      setError(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (loaded && accordionValue == 'staff' && params.id == id) {
      getData()
    }
  }, [params.id, loaded, accordionValue])

  return (
    <>
      {loading && !error ? (
        <StaffMLoading />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <MyCarousel drag slideGap='1px' withControls={false} slideSize='fit-contain'>
          {dataStaff?.map((item, index) => {
            return (
              <Carousel.Slide
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: '90px',
                  marginRight: 1,
                }}>
                <NavLink to={item.person.url}>
                  <Image imageProps={{ loading: 'lazy' }} height={126} width={90} src={item.person.images.jpg.image_url} withPlaceholder />
                </NavLink>
                <Text fz={10} truncate>
                  {item.positions ? item.positions.join(', ') : ''}
                </Text>
                <NavLink to={item.person.url} style={{ textDecoration: 'none' }}>
                  <Text fz={10} truncate>
                    {item.person.name}
                  </Text>
                </NavLink>
              </Carousel.Slide>
            )
          })}
        </MyCarousel>
      )}
    </>
  )
}

export default StaffMobile

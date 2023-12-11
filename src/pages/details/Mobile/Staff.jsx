import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Image, Text } from '@mantine/core'
import CarouselM from '../../../components/CarouselM'
import { Carousel } from '@mantine/carousel'
import { NavLink } from 'react-router-dom'

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
    if (loaded && accordionValue == 'staff') {
      getData()
    }
  }, [params.id, loaded, accordionValue])

  if (!loading && !error) {
    return (
      <CarouselM drag slideGap='1px' withControls={false}>
        {dataStaff?.map((item, index) => {
          return (
            <Carousel.Slide
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                maxWidth: '90px',
              }}>
              <NavLink to={item.person.url}>
                <Image imageProps={{ loading: 'lazy' }} height={126} width={90} src={item.person.images.jpg.image_url} withPlaceholder />
              </NavLink>

              <Text fz={10} truncate style={{ alignSelf: 'baseline', width: '-webkit-fill-available' }}>
                {item.positions ? item.positions.join(', ') : ''}
              </Text>
              <NavLink to={item.person.url} style={{ textDecoration: 'none', alignSelf: 'baseline', width: '-webkit-fill-available' }}>
                <Text fz={10} truncate>
                  {item.person.name}
                </Text>
              </NavLink>
            </Carousel.Slide>
          )
        })}
      </CarouselM>
    )
  } else if (error) {
    return <Text>Something went wrong</Text>
  } else if (loading) {
    return <Text>Loading...</Text>
  }
}

export default StaffMobile

import { Autocomplete, Button, Group, Image, Text } from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

function DesktopSearch() {
  const AutoCompleteItem = forwardRef(({ description, value, image, ...others }, ref) => (
    <>
      <div ref={ref} {...others}>
        <Group noWrap>
          <Image width={60} src={image} imageProps={{ loading: 'lazy' }} />
          <div>
            <Text size='xs' lineClamp={4}>
              {value}
            </Text>
            <Text size='xs' c='dimmed'>
              {description}
            </Text>
          </div>
        </Group>
      </div>
    </>
  ))

  const navigate = useNavigate()
  const location = useLocation()

  //
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const searchRef = useRef(null)

  const search = useCallback(async () => {
    if (searchTerm !== '') {
      try {
        const response = await axios(`https://api.jikan.moe/v4/anime?q=${searchTerm}`)
        var date = new Date(response.data.data[0].aired.from)
        setResults(
          response.data.data.map((item) => ({
            group: item.genres.length > 0 ? item.genres[0].type : 'Unknown',
            value: item.title,
            description: item.year
              ? item.type !== null
                ? `(${item.type}, ${item.year})`
                : `(${item.year})`
              : item.type !== null
              ? `(${item.type}, ${date.getFullYear()})`
              : `${date.getFullYear()}`,
            id: item.mal_id,
            image: item.images.jpg.image_url,
          }))
        )
      } catch (error) {
        console.error('Error during search:', error)
      }
    }
  }, [searchTerm])

  useEffect(() => {
    const timerId = setTimeout(() => search(), 500) // Delay 500 ms

    return () => clearTimeout(timerId)
  }, [search])

  return (
    <>
      <NavLink to='/' style={{ textDecoration: 'none' }}>
        MAL
      </NavLink>
      <Group spacing={5}>
        <Button
          variant={location.pathname != '/' ? 'subtle' : 'filled'}
          style={{
            marginRight: 10,
          }}
          onClick={() => navigate('/')}>
          <Text>Home</Text>
        </Button>
        <Autocomplete
          ref={searchRef}
          dropdownComponent={({ children, ...others }) => <div style={{ width: 300, maxHeight: 300, overflow: 'auto' }}>{children}</div>}
          nothingFound={'Type to search'}
          value={searchTerm}
          limit={30}
          itemComponent={AutoCompleteItem}
          placeholder={'Search'}
          onChange={(e) => {
            if (e != '') {
              setSearchTerm(e)
            } else {
              setResults([])
              setSearchTerm(e)
            }
          }}
          icon={<IconSearch size={16} stroke={1.5} />}
          data={results}
          onItemSubmit={(item) => {
            setSearchTerm('')
            setResults([])
            navigate(`/detail/${item.id}`)
            searchRef.current.blur()
          }}
        />
      </Group>
    </>
  )
}

export default DesktopSearch

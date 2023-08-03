import { Autocomplete, Button, Flex, Group, Image, Text } from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import React, { forwardRef, useEffect, useState } from 'react'
import useDebounce from '../../../hooks/useDebounce'
import axios from 'axios'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

function DesktopSearch() {
  const AutoCompleteItem = forwardRef(({ description, value, image, ...others }, ref) => (
    <>
      <div ref={ref} {...others}>
        <Group noWrap>
          <Image width={60} height={70} src={image} />
          <div>
            <Text size={'xs'}>{value}</Text>
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

  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    setLoading(true)
    if (debouncedSearchTerm) {
      const fetchResults = async () => {
        await axios(`https://api.jikan.moe/v4/anime?q=${debouncedSearchTerm}`).then((res) => {
          setResults(
            res.data.data.map((item) => ({
              group: item.genres.length > 0 ? item.genres[0].type : 'Unknown',
              value: item.title,
              description: `(${item.type}, ${item.year})`,
              id: item.mal_id,
              image: item.images.jpg.small_image_url,
            }))
          )
        })
        setLoading(false)
      }
      fetchResults()
    }
    setLoading(false)
  }, [debouncedSearchTerm])

  return (
    <>
      <NavLink
        style={{ textDecoration: 'none' }}
        onClick={(event) => {
          event.preventDefault()
          navigate(`/`)
        }}>
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
          dropdownComponent={({ children, ...others }) => <div style={{ width: 300, maxHeight: 300, overflow: 'auto' }}>{children}</div>}
          nothingFound={debouncedSearchTerm ? (loading ? 'Loading...' : 'No results found') : 'Type to search'}
          value={searchTerm}
          limit={30}
          itemComponent={AutoCompleteItem}
          placeholder={'Search'}
          onChange={(e) => setSearchTerm(e)}
          icon={<IconSearch size={16} stroke={1.5} />}
          data={results}
          onItemSubmit={(item) => {
            setSearchTerm('')
            navigate(`/detail/${item.id}`)
          }}
        />
      </Group>
    </>
  )
}

export default DesktopSearch

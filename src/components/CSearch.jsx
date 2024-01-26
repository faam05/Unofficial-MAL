import { Autocomplete, Button, Group, Image, Text } from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import axios from 'axios'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CSearch = ({ dropdownStyle, buttonStyle, setOpenedModal, openedModal = null, grow = false }) => {
  const navigate = useNavigate()

  const AutoCompleteItem = forwardRef(({ description, value, image, alt, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap grow={grow}>
        <Image src={image} width={60} imageProps={{ loading: 'lazy' }} />
        <div>
          <Text size='xs' lineClamp={3}>
            {value}
          </Text>
          <Text size='xs' c='dimmed'>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  ))

  const searchRef = useRef(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const search = useCallback(async () => {
    if (searchTerm !== '') {
      try {
        const response = await axios(`https://api.jikan.moe/v4/anime?q=${searchTerm}`)
        var date = new Date(response.data.data[0].aired.from)
        setResults(
          response.data.data.map((item) => ({
            group: item.genres.length > 0 ? item.genres[0].type.charAt(0).toUpperCase() + item.genres[0].type.slice(1) : 'Unknowns',
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
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [searchTerm])

  useEffect(() => {
    const timerId = setTimeout(() => search(), 500) // Delay 500 ms

    return () => clearTimeout(timerId)
  }, [search])

  return (
    <Autocomplete
      ref={searchRef}
      dropdownComponent={({ children, ...others }) => (
        <div style={dropdownStyle}>
          {children}
          {results && !loading && results.length > 0 && (
            <Button
              style={{ width: '100%', position: 'sticky', bottom: 0, ...buttonStyle }}
              onClick={() => {
                setSearchTerm('')
                setResults([])
                searchRef.current.blur()
                navigate(`/search/${searchTerm}`)
              }}>
              Load more...
            </Button>
          )}
        </div>
      )}
      nothingFound={searchTerm ? (loading ? 'Loading...' : 'No results found') : 'Type to search'}
      value={searchTerm}
      limit={20}
      itemComponent={AutoCompleteItem}
      placeholder={'Search'}
      onChange={(e) => {
        setResults([])
        setLoading(true)
        setSearchTerm(e)
      }}
      icon={<IconSearch size={16} stroke={1.5} />}
      data={results}
      onItemSubmit={(item) => {
        setSearchTerm('')
        setResults([])
        navigate(`/detail/${item.id}`)
        searchRef.current.blur()
        openedModal && setOpenedModal(!openedModal)
      }}
    />
  )
}

export default CSearch

import { Autocomplete, Burger, Button, Container, Group, Header, Image, MediaQuery, Text, useMantineTheme } from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import axios from 'axios'
import React, { forwardRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useDebounce from '../../hooks/useDebounce'

export default function CustomHeader2() {
  const theme = useMantineTheme()
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])

  const [opened, setOpened] = useState(false)
  const [loading, setLoading] = useState(false)

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
    <Header height={{ base: 50, md: 70 }} p='md'>
      <Container
        size={1060}
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          justifyContent: 'space-between',
        }}>
        <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
          <Burger opened={opened} onClick={() => setOpened((o) => !o)} size='sm' color={theme.colors.gray[6]} mr='xl' />
        </MediaQuery>
        <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
          <Text component='a' href='/'>
            MAL
          </Text>
        </MediaQuery>
        <MediaQuery smallerThan='md' styles={{ display: 'none' }}>
          <Text component='a' href='/'>
            MAL
          </Text>
        </MediaQuery>
        <MediaQuery smallerThan='md' styles={{ display: 'none' }}>
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
                setValue('')
                navigate(`/detail/${item.id}`)
              }}
            />
          </Group>
        </MediaQuery>
      </Container>
    </Header>
  )
}

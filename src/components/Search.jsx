import { Button, Combobox, Group, Image, InputBase, ScrollArea, Text, TextInput, useCombobox } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import axios from 'axios'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMobileDevice } from '../hooks/useMobileDevice'

const CSearch = ({ setOpenedModal, openedModal = null }) => {
  const navigate = useNavigate()
  const mobile = useMobileDevice()

  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(openedModal ?? false)
  const searchRef = useRef(null)

  const search = useCallback(async () => {
    if (searchTerm !== '') {
      try {
        const response = await axios(`https://api.jikan.moe/v4/anime?q=${searchTerm}`)
        var date = new Date(response.data.data[0].aired.from)

        let array = []
        let filteredData = response.data.data.filter((item) => {
          if (!array.includes(item.title)) {
            array.push(item)
            return true
          }
          return false
        })
        setResults(
          filteredData.map((item) => ({
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
        if (import.meta.env.DEV) {
          console.error('Error during search:', error)
        }
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

  const combobox = useCombobox({
    opened: isOpen,
    onDropdownClose: () => combobox.resetSelectedOption(),
  })

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setSearchTerm('')
        setResults([])
        mobile ? setOpenedModal(false) : setIsOpen(false)
        searchRef.current.blur()
        navigate(`/detail/${val}`)
      }}>
      <Combobox.Target>
        <InputBase
          ref={searchRef}
          leftSection={<IconSearch />}
          leftSectionPointerEvents='none'
          placeholder='Type to search ...'
          value={searchTerm}
          onChange={(event) => {
            setResults([])
            setLoading(true)
            setSearchTerm(event.currentTarget.value)
            if (event.currentTarget.value != '') setIsOpen(true)
            else setIsOpen(false)
            combobox.updateSelectedOptionIndex()
          }}
          onClick={() => {
            if (searchTerm) setIsOpen(true)
            else setIsOpen(false)
          }}
          onFocus={() => {
            if (searchTerm) setIsOpen(true)
            else setIsOpen(false)
          }}
          onBlur={() => setIsOpen(false)}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize type='scroll' mah={300}>
            {!loading && results.length === 0 && searchTerm ? (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            ) : results.length > 0 && !loading ? (
              results.map((result, index) => {
                return (
                  <Combobox.Option key={index} value={result.id}>
                    <Group justify='space-between' align='center'>
                      <Image src={result.image} w={60} />
                      <div style={{ flex: 1 }}>
                        <Text size='xs' lineClamp={3}>
                          {result.value}
                        </Text>
                        <Text size='xs' c='dimmed'>
                          {result.description}
                        </Text>
                      </div>
                    </Group>
                  </Combobox.Option>
                )
              })
            ) : (
              <Combobox.Empty>Loading...</Combobox.Empty>
            )}
          </ScrollArea.Autosize>
          {!loading && searchTerm && (
            <Combobox.Footer
              onClick={() => {
                setResults([])
                setSearchTerm('')
                mobile ? setOpenedModal(false) : setIsOpen(false)
                navigate(`/search/${searchTerm}`)
              }}>
              <Button w='100%'>Show Details</Button>
            </Combobox.Footer>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}

export default CSearch

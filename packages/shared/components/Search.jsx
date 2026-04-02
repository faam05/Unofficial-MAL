import { Button, Combobox, Group, InputBase, ScrollArea, Text, useCombobox } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useMobileDevice } from '@shared'

import { IconSearch } from '@tabler/icons-react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import 'react-lazy-load-image-component/src/effects/blur.css'

const CSearch = ({ type = 'mal', setOpenedModal, openedModal = null, config = {} }) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const mobile = useMobileDevice()

  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')
  const [isOpen, setIsOpen] = useState(openedModal ?? false)
  const searchRef = useRef(null)

  const { MAIN_URL } = config

  useEffect(() => {
    setSearchTerm('')
    setDebouncedTerm('')
  }, [pathname])

  useEffect(() => {
    if (searchTerm === '') {
      setDebouncedTerm('')
      return
    }
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  const {
    data: dataMAL,
    status: statusMAL,
    isFetching: isFetchingMAL,
  } = useQuery({
    queryKey: ['search-mal', debouncedTerm],
    queryFn: async () => {
      if (!debouncedTerm) return null
      return await axios(`${MAIN_URL}/anime?q=${debouncedTerm}`)
    },
    enabled: type === 'mal' && debouncedTerm !== '',
  })

  const {
    data: dataSearch,
    status: statusSearch,
    isFetching: isFetchingStream,
  } = useQuery({
    queryKey: ['search-stream', debouncedTerm],
    queryFn: async () => {
      if (!debouncedTerm) return null
      return await axios(`${MAIN_URL}/search?q=${debouncedTerm}`)
    },
    enabled: type === 'stream' && debouncedTerm !== '',
  })

  const isTyping = searchTerm !== debouncedTerm // user masih ngetik, debounce belum kelar
  const isFetching = type === 'mal' ? isFetchingMAL : isFetchingStream
  const isLoading = isTyping || isFetching // loading = ngetik / fetching

  const results = (() => {
    if (isLoading) return [] // sedang loading, jangan derive dulu

    if (type === 'mal' && statusMAL === 'success' && dataMAL?.data?.data) {
      const rawData = dataMAL.data.data
      const groupedData = {}
      rawData.forEach((item) => {
        const date = new Date(item.aired.from)
        const group = item.type ?? 'Unknowns'
        if (!groupedData[group]) groupedData[group] = []
        groupedData[group].push({
          id: item.mal_id,
          value: item.title,
          description: item.year
            ? item.type !== null
              ? `(${item.type}, ${item.year})`
              : `(${item.year})`
            : item.type !== null
              ? `(${item.type}, ${date.getFullYear()})`
              : `${date.getFullYear()}`,
          image: item.images.webp.image_url,
          placeholder: item.images.webp.small_image_url,
        })
      })
      return Object.keys(groupedData).map((type) => ({ type, data: groupedData[type] }))
    }

    if (type === 'stream' && statusSearch === 'success' && dataSearch?.data?.results) {
      return dataSearch.data.results
    }

    return []
  })()

  const fetchDone = type === 'mal' ? statusMAL === 'success' : statusSearch === 'success'
  const isDoneAndEmpty = !isLoading && fetchDone && results.length === 0 && debouncedTerm !== ''

  const combobox = useCombobox({
    opened: isOpen,
    onDropdownClose: () => combobox.resetSelectedOption(),
  })

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setSearchTerm('')
        setDebouncedTerm('')
        mobile ? setOpenedModal(false) : setIsOpen(false)
        searchRef.current.blur()
        if (type === 'mal') navigate(`/detail/${val}`)
        else if (type === 'stream') navigate(`/stream/anime/${val}`)
      }}>
      <Combobox.Target>
        <InputBase
          ref={searchRef}
          leftSection={<IconSearch />}
          leftSectionPointerEvents='none'
          placeholder='Type to search ...'
          value={searchTerm}
          styles={{
            input: {
              '--input-bd-focus': type === 'stream' && 'red',
            },
          }}
          onChange={(event) => {
            const val = event.currentTarget.value
            setSearchTerm(val)
            if (val !== '') setIsOpen(true)
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
            {isDoneAndEmpty ? (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            ) : results.length > 0 ? (
              results.map((result, index) =>
                type === 'mal' ? (
                  <Combobox.Group key={index} label={result.type}>
                    {result.data.map((item) => (
                      <Combobox.Option key={item.id} value={item.id}>
                        <Group justify='space-between' align='center'>
                          <LazyLoadImage
                            width={60}
                            src={item.image}
                            placeholderSrc={item.placeholder}
                            alt={item.value?.replace(/[ , -]/g, '_')}
                            effect='blur'
                            className='h-full max-h-[90px]'
                          />
                          <div className='flex-1'>
                            <Text size='xs' lineClamp={3}>
                              {item.value}
                            </Text>
                            <Text size='xs' c='dimmed'>
                              {item.description}
                            </Text>
                          </div>
                        </Group>
                      </Combobox.Option>
                    ))}
                  </Combobox.Group>
                ) : (
                  <Combobox.Option value={result.slug} key={index}>
                    <Group justify='space-between' align='center'>
                      <LazyLoadImage
                        width={60}
                        src={result.thumbnail}
                        placeholderSrc={result.thumbnail}
                        alt={result.judul?.replace(/[ , -]/g, '_')}
                        effect='blur'
                        className='h-full max-h-[90px]'
                      />
                      <div className='flex-1'>
                        <Text size='xs' lineClamp={3}>
                          {result.judul}
                        </Text>
                        <Text size='xs' c='dimmed'>
                          {result.status}
                        </Text>
                      </div>
                    </Group>
                  </Combobox.Option>
                ),
              )
            ) : (
              <Combobox.Empty>Loading...</Combobox.Empty>
            )}
          </ScrollArea.Autosize>
          {!isLoading && type === 'mal' && searchTerm && results.length !== 0 && (
            <Combobox.Footer
              className='p-0'
              onClick={() => {
                setSearchTerm('')
                setDebouncedTerm('')
                mobile ? setOpenedModal(false) : setIsOpen(false)
                navigate(`/search/${searchTerm}`)
              }}>
              <Button className='rounded-[0]' w='100%'>
                Show Details
              </Button>
            </Combobox.Footer>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}

export default CSearch

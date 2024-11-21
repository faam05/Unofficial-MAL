import { Button, Combobox, Group, InputBase, ScrollArea, Text, useCombobox } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useCallback, useEffect, useRef, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMobileDevice } from '../hooks/useMobileDevice'

const CSearch = ({ type = 'mal', setOpenedModal, openedModal = null }) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const mobile = useMobileDevice()
  const { VITE_MAIN_URL, DEV, VITE_LOCAL_URL, VITE_PUBLIC_URL } = import.meta.env

  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(openedModal ?? false)
  const searchRef = useRef(null)

  useEffect(() => {
    setSearchTerm('')
  }, [pathname])

  const {
    data: dataMAL,
    status: statusMAL,
    refetch: refetchMAL,
  } = useQuery({
    queryKey: ['search-mal', searchTerm],
    queryFn: async () => await axios(`${VITE_MAIN_URL}/anime?q=${searchTerm}`),
    enabled: false,
  })

  const {
    data: dataSearch,
    status: statusSearch,
    refetch: refetchStream,
  } = useQuery({
    queryKey: ['search-stream', searchTerm],
    queryFn: async () => await axios(`${DEV ? VITE_LOCAL_URL : VITE_PUBLIC_URL}/stream/search/${searchTerm}`),
    enabled: false,
  })

  const search = useCallback(async () => {
    setLoading(true)
    if (searchTerm !== '') {
      try {
        if (type === 'mal') {
          refetchMAL()
          var date = new Date(dataMAL.data.data[0].aired.from)
          let results = dataMAL.data.data.map((item) => ({
            // group: item.genres.length > 0 ? item.genres[0].type.charAt(0).toUpperCase() + item.genres[0].type.slice(1) : 'Unknowns',
            group: item.type ?? 'Unknowns',
            value: item.title,
            description: item.year
              ? item.type !== null
                ? `(${item.type}, ${item.year})`
                : `(${item.year})`
              : item.type !== null
                ? `(${item.type}, ${date.getFullYear()})`
                : `${date.getFullYear()}`,
            id: item.mal_id,
            image: item.images.webp.image_url,
            placeholder: item.images.webp.small_image_url,
          }))
          // Mengelompokkan data berdasarkan type
          const groupedData = {}
          results.forEach((item) => {
            const type = item.group
            if (!groupedData[type]) {
              groupedData[type] = []
            }
            groupedData[type].push({
              id: item.id,
              value: item.value,
              description: item.description,
              image: item.image,
              placeholder: item.placeholder,
            })
          })
          // Mengonversi hasil pengelompokkan menjadi array dengan format yang diinginkan
          const formattedData = Object.keys(groupedData).map((type) => ({
            type: type,
            data: groupedData[type],
          }))
          setResults(formattedData)
        } else if (type === 'stream') {
          refetchStream()
          if (statusSearch === 'success') {
            setResults(dataSearch?.data || [])
          }
        }
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
  }, [searchTerm, statusMAL, statusSearch])

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
              (statusSearch === 'success' || statusMAL === 'success') && <Combobox.Empty>Nothing found</Combobox.Empty>
            ) : results.length > 0 && !loading ? (
              results?.map((result, index) =>
                type === 'mal' ? (
                  <Combobox.Group key={index} label={result.type}>
                    {result?.data?.map((item) => {
                      return (
                        <Combobox.Option key={item.id} value={item.id}>
                          <Group justify='space-between' align='center'>
                            <LazyLoadImage
                              width={60}
                              src={item.image}
                              placeholderSrc={item.placeholder}
                              alt={item?.value?.replace(/[ , -]/g, '_')}
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
                      )
                    })}
                  </Combobox.Group>
                ) : (
                  <Combobox.Option value={result.slug} key={index}>
                    <Group justify='space-between' align='center'>
                      <LazyLoadImage
                        width={60}
                        src={result.poster}
                        placeholderSrc={result.poster}
                        alt={result.title?.replace(/[ , -]/g, '_')}
                        effect='blur'
                        className='h-full max-h-[90px]'
                      />
                      <div className='flex-1'>
                        <Text size='xs' lineClamp={3}>
                          {result.title}
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
          {!loading && type === 'mal' && searchTerm && results.length !== 0 && (
            <Combobox.Footer
              className='p-0'
              onClick={() => {
                setResults([])
                setSearchTerm('')
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

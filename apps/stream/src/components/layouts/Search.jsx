import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'

import { useMobileDevice } from '@shared'
import useDebounce from '@shared/hooks/useDebounce'

import { Combobox, Group, InputBase, ScrollArea, Text, useCombobox } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import 'react-lazy-load-image-component/src/effects/blur.css'

const { VITE_MAIN_SERVICE, VITE_MAIN_SERVICE_CLOUD, VITE_USE_SERVER_ANIME } = import.meta.env

const isCloudServer = VITE_USE_SERVER_ANIME.toLowerCase() === 'cloud'

const CSearch = ({ setOpenedModal, openedModal = null }) => {
  const navigate = useNavigate()
  const mobile = useMobileDevice()

  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(openedModal ?? false)
  const searchRef = useRef(null)

  const { debouncedValue: debouncedTerm, setDebouncedValue: setDebouncedTerm } = useDebounce(searchTerm, 500)

  const {
    data: dataSearch,
    status: statusSearch,
    isFetching: isFetchingStream,
  } = useQuery({
    queryKey: ['search-stream', debouncedTerm],
    queryFn: async () => {
      if (!debouncedTerm) return null

      if (isCloudServer) return await axios(`${VITE_MAIN_SERVICE_CLOUD}/search/${debouncedTerm}`)
      else return await axios(`${VITE_MAIN_SERVICE}/search?q=${debouncedTerm}`)
    },
    enabled: debouncedTerm !== '',
  })

  const isTyping = searchTerm !== debouncedTerm // user masih ngetik, debounce belum kelar
  const isFetching = isFetchingStream
  const isLoading = isTyping || isFetching // loading = ngetik / fetching

  const results = (() => {
    if (isLoading) return [] // sedang loading, jangan derive dulu

    if (statusSearch === 'success') {
      if (isCloudServer) return dataSearch?.data?.data?.animeList
      if (dataSearch?.data?.results) return dataSearch.data.results
    }

    return []
  })()

  const fetchDone = statusSearch === 'success'
  const isDoneAndEmpty = !isLoading && fetchDone && results.length === 0 && debouncedTerm !== ''

  const combobox = useCombobox({
    opened: isOpen,
    onDropdownClose: () => combobox.resetSelectedOption(),
  })

  // {"json":{"title":"Zutaboro Reijou wa Ane no Moto Konyakusha ni Dekiai sareru (Episode 1 – 12) Subtitle Indonesia","poster":"https://otakudesu.blog/wp-content/uploads/2025/10/Zutaboro-Reijou-wa-Ane-no-Moto-Konyakusha-ni-Dekiai-sareru-Sub-Indo.jpg","status":"Completed","score":"7.35","animeId":"zutaboro-reijou-wa-ane-no-moto-sub-indo","href":"/anime/anime/zutaboro-reijou-wa-ane-no-moto-sub-indo","otakudesuUrl":"https://otakudesu.blog/anime/zutaboro-reijou-wa-ane-no-moto-sub-indo/","genreList":[{"title":"Drama","genreId":"drama","href":"/anime/genre/drama","otakudesuUrl":"https://otakudesu.blog/genres/drama/"},{"title":"Josei","genreId":"josei","href":"/anime/genre/josei","otakudesuUrl":"https://otakudesu.blog/genres/josei/"},{"title":"Romance","genreId":"romance","href":"/anime/genre/romance","otakudesuUrl":"https://otakudesu.blog/genres/romance/"}]}}

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setSearchTerm('')
        setDebouncedTerm('')
        mobile ? setOpenedModal(false) : setIsOpen(false)
        searchRef.current.blur()
        navigate(`/anime/${val}`)
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
              '--input-bd-focus': 'red',
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
              results.map((result, index) => (
                <Combobox.Option value={isCloudServer ? result.animeId : result.slug} key={index}>
                  <Group justify='space-between' align='center'>
                    <LazyLoadImage
                      width={60}
                      src={isCloudServer ? result.poster : result.thumbnail}
                      placeholderSrc={isCloudServer ? result.poster : result.thumbnail}
                      alt={isCloudServer ? result.title?.replace(/[ , -]/g, '_') : result.judul?.replace(/[ , -]/g, '_')}
                      effect='blur'
                      className='h-full max-h-[90px]'
                    />
                    <div className='flex-1'>
                      <Text size='xs' lineClamp={3}>
                        {isCloudServer ? result.title : result.judul}
                      </Text>
                      <Text size='xs' c='dimmed'>
                        {result.status}
                      </Text>
                    </div>
                  </Group>
                </Combobox.Option>
              ))
            ) : (
              <Combobox.Empty>Loading...</Combobox.Empty>
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}

export default CSearch

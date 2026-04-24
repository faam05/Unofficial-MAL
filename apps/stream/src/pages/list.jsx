import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import ListPage from '../components/layouts/List'

import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect } from 'react'

const { VITE_MAIN_SERVICE } = import.meta.env

const List = () => {
  const [params, setSearchParams] = useSearchParams()

  const type = params.get('type')
  const page = params.get('page') || 1

  const [activePage, setPage] = useState(Number(page))

  const handleChangePage = (numberPage) => {
    setSearchParams((prev) => {
      if (!prev.get('type')) {
        prev.set('type', 'ongoing')
      }

      prev.set('page', numberPage || 1)

      return prev
    })

    setPage(numberPage)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  let queryKey = ['stream-ongoing', activePage]
  let url = ''
  let title = ''
  let maxPages = 2

  switch (type) {
    case 'movie':
      queryKey = ['stream-movie', activePage]
      url = `${VITE_MAIN_SERVICE}/home-movie2?page=${activePage}`
      title = 'Movies'

      break

    default:
      // ongoing
      queryKey = ['stream-ongoing', activePage]
      url = `${VITE_MAIN_SERVICE}/home?page=${activePage}`
      title = 'On Going Anime'
      maxPages = 5

      break
  }

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey,
    queryFn: async () => await axios(url),
    select: (res) => {
      switch (type) {
        case 'movie':
          return res.data.movie

        default:
          // ongoing
          return res.data.ongoing
      }
    },
  })

  if (!isLoading && (!data || isError)) {
    return (
      <div className='flex flex-col items-center'>
        <p>There was an error, please refresh or click Retry Button</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    )
  }

  return <ListPage data={data} isLoading={isLoading} activePage={activePage} handleChangePage={handleChangePage} title={title} maxPages={maxPages} />
}

export default List

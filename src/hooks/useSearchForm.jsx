import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useSearchForm(value) {
  const [search, setSearch] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(`https://api.jikan.moe/v4/anime?q=${value}`)
      setSearch(data)
    }

    getData()
  }, [value])

  return search
}

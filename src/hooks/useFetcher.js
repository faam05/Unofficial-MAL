import { useQuery } from '@tanstack/react-query'

const fetcherBasic = async (url) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()
  return data
}

const fetcher = async (url) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const { data } = await response.json()
  return data
}

const useFetcher = (url, key, isBasic = false) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: key,
    queryFn: () => (isBasic ? fetcherBasic(url) : fetcher(url)),
  })

  return { data, isLoading, isError }
}

export default useFetcher

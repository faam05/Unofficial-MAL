import { useQuery } from '@tanstack/react-query'

const fetcher = async (url) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const { data } = await response.json()
  return data
}

const useFetcher = (url, key) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: key,
    queryFn: () => fetcher(url),
  })

  return { data, isLoading, isError }
}

export default useFetcher

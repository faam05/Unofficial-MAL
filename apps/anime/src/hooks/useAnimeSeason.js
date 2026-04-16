import { useInfiniteQuery } from '@tanstack/react-query'

import { fetchAniList } from '../api/anilist'
import { SEASONAL_QUERY } from '../api/queries'

export const useAnimeSeason = (season, year) => {
  return useInfiniteQuery({
    queryKey: ['anime', season, year],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => fetchAniList(SEASONAL_QUERY, { season, year, page: pageParam, isAdult: false }),
    getNextPageParam: (lastPage) => {
      const { hasNextPage, currentPage } = lastPage.Page.pageInfo
      return hasNextPage ? currentPage + 1 : undefined
    },
    staleTime: 1000 * 60 * 5, // Data dianggap "fresh" selama 5 menit
  })
}

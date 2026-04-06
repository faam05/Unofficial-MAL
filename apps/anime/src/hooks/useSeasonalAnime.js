import { useQuery } from '@tanstack/react-query'
import { fetchAniList } from '../api/anilist'
import { GET_DETAILED_SEASONAL } from '../api/queries'

export const useSeasonalAnime = (variables) => {
  return useQuery({
    queryKey: ['anime-seasonal', variables],
    queryFn: () => fetchAniList(GET_DETAILED_SEASONAL, variables),
    // Menjaga data lama tetap ada saat fetching page baru (mencegah flickering)
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 10, // 10 menit
  })
}

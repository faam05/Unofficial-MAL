import { useQuery } from '@tanstack/react-query'

import { fetchAniList } from '../api/anilist'
import { SEASONAL_QUERY } from '../api/queries'

export const useAnimeSeason = (season, year) => {
  return useQuery({
    // Query key sangat penting untuk caching.
    // Jika season/year berubah, TanStack Query otomatis fetch ulang.
    queryKey: ['anime', season, year],
    queryFn: () => fetchAniList(SEASONAL_QUERY, { season, year }),
    select: (data) => data.Page.media, // Memotong data langsung ke array media
    staleTime: 1000 * 60 * 5, // Data dianggap "fresh" selama 5 menit
  })
}

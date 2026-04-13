import { useQuery } from '@tanstack/react-query'

import { fetchAniList } from '../api/anilist'
import { GET_SCHEDULE } from '../api/queries'
import { groupScheduleByDay } from '../helpers'

export const useAnimeSchedule = (airingAtGreater, airingAtLesser) => {
  return useQuery({
    // Query key sangat penting untuk caching.
    // Jika airingAtGreater/airingAtLesser berubah, TanStack Query otomatis fetch ulang.
    queryKey: ['anime', 'schedule', airingAtGreater, airingAtLesser],
    queryFn: async () => {
      // 1. Ambil beberapa halaman sekaligus agar data tidak tercecer
      const pages = [1, 2, 3]
      const results = await Promise.all(
        pages.map((p) =>
          fetchAniList(GET_SCHEDULE, {
            page: p,
            airingAtGreater,
            airingAtLesser,
            sort: 'TIME',
          }),
        ),
      )

      // 2. Gabungkan semua data menjadi satu array flat
      return results.flatMap((res) => res.Page.airingSchedules)
    },
    select: (allData) => {
      const filteredData = allData.filter((item) => item.media.isAdult === false) // Filter out adult content
      const mappedData = filteredData.map((item) => ({
        ...item.media,
        airingAt: item.airingAt,
        // nextAiringEpisode: {
        //   episode: item.episode,
        // },
      })) // Map data untuk menyesuaikan struktur yang diharapkan

      // 4. Kelompokkan berdasarkan hari
      return groupScheduleByDay(mappedData)
    },
    staleTime: 1000 * 60 * 5, // Data dianggap "fresh" selama 5 menit
  })
}

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { inflate } from 'pako'

import HomePage from '../components/layouts/Home'

import 'react-loading-skeleton/dist/skeleton.css'

const { VITE_MAIN_SERVICE, VITE_USE_SERVER_ANIME, VITE_MAIN_SERVICE_CLOUD } = import.meta.env

const isCloudServer = VITE_USE_SERVER_ANIME.toLowerCase() === 'cloud'

function decodeEncSankaa(encoded) {
  // Base64 URL-safe → Base64 standar
  const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/')

  // Base64 → bytes
  const binary = atob(base64)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))

  // Decompress zlib
  const decompressed = inflate(bytes)

  // Bytes → string UTF-8
  const text = new TextDecoder().decode(decompressed)

  // Parse JSON jika hasilnya JSON
  return JSON.parse(text)
}

console.log(
  decodeEncSankaa(
    'eJztl19vG7kRwL8KwQLty8qxZMmy9LaW7Mh_ZFt_HP85HAJqd7RLi0tuSK5Wm8BAEqNoHwq0fboLUPQOfWlxzVPQFodrLwX6CeyvcD60D7l-h4K7siw5ts85NM1Ln6RZDodDDjm_mSdYRY4DSuGqlhFYWIKKmFa4-gS7RBNc_egJpi6uYiWYyDEYAqPcy-VL-aX5MrZSpYe3KfAo6IHEVZzHFg6F0qngax2q6r173HXmFOEDMhSMgQQ6F0Nvjrr3aODdaxVKha3YidZtv77NDx7Vub_fsPP7pN3a2UvERisplpueK9Zb7d31xyyw6-zgvt1y19ti_8HjdnO_rh41WyOx4Q-WocBGu3u201jeXXbm7fKDbtxpt5aWYHkQbsZzIfewhTXVDHAVdwQTaHO8FWzhIxISDgoeXihsS0AuGUCmhHZDxAnaAG4OBJQjaaip4LiKuz4kSJEExT7RMASJXAGKf_P0hUYDyhhKRIQCMgCV_lNaCu6BtFAv0kj7RH_z9IVCXBgBkEMUoL6QqRALydx0OAZjQCM_4hok6oDgHlqnPLc7h-y--dQDyj3Uk5EmjCVIMRJ5vgYJLuolKBDchEUhyhFBPvX8nCR8YKa4EfdAcCszhxwSAOoRZ4Biqv3UjU6iNAQWIiiUwpMkQIKzBBlvRcRcpACsy51c3A_k0wBFoVnRnEqCYpLMoS0RW8iHVJNyFVLjoBbIpcoR5vDMggocCVqhHviUu8inCoUiNu4T7qYaY6fTVZEKScwhHQjmTIyHa7wvzP1Wvoi7SWji2X1gIhdJMg5boRhgC0OozL0tYAurqHfx91FEGNUJruIlbGEzhXsXAjAgCupEG6N7NA1HYb5QxMcWJm7EdE1wDVzjKo8Ys7DSREdmkVXKqfLBRTaV2Z1TIpKOMSO0D3JqpWzmW84qICoV43RZbOEEiMRVs7yFiTlKXMXrhKOylfpkDrZJJFrIZ7Kx4QgJ4714wCUoXP0I2066kIVtdwhcRxKwhVcJ10Ql-GOzicilIlPN5dEOdYyOMkOhFG7kgMwGOQ0ZjLCFt0AHRPaYMVT_cQ01V-prNrbwBhkQgULqOCIg2MI1GXHHT6RgzFjrEc7_B9ljubWzX2u2GwWtD_OrC_35uA6dlWFz-aBWt-ON1aP2zl79YGXuKDRxcgQTxqcfLZR6vX4-_RJxLZPt_rakHjUhWd9Jc18YMSLTq1MsFUuLZQv3yVBIqs05F_Lz8yUTZT64iLEmXnpw9ew-Yws3CQO0I4UmnuBUaWzhXdkjHF2Ew8KdKASJdsyLSCd41ElP3JEiINwxKrWIaTok46h2IjmkQ8LMX19EPM1i90UaZZtrmmuAFNjCe8QY7MRCuiEjxk5XEg9c889mGiQnGtAup0OQKpvsAVOpMdf8dGkAqEk4NecwXnxHKJ2zQ-EQloQ6dXU5YizJ3kADNEihYBSl7nUlGYL5UzPh9tLbI81JGOtblB-R9DqyyLuKI5w-Namzl_lk5mkEgmsfV_OGZQmulo8tDNy9RXNhrLmQP7awSrjgSZDG6c3zT9G_P_3bd7_91Zvf_wK9-fznb1794btPfmqcI6gh-BEJCJ8gwxzmNGeq6PSz09enfzr9-uyXZ89Pvzz9Mzo7OXt6-vr0lfmETl-hdPjL069PX5_97PSrsxOzXQ4jnSWNlZAq4cLk9khCmXkuY4A3BmsbNo83D2uxOQ6a5qhERDrqmZPUfhT0OKHsru9rb7_lr3n2o835Snet-yBYfVyEnVZYrndbO-2WKDlJfmHH9442W257-3Gr0n2cX17x0ldjsiGnjCq95uJqVipYOCDMiKVCoVI5tq4tOySQmAyApxXGUnGxUrylBLlWeVKOFD5oOeIGo4d795tO0x4NNroHu4eNtT2nPR99fzmCcm2wJ_t6l-KkiqZmvlWp2CgQQ2qoHYQ0e59I9FOe9qlUGmWASSGbfdCxQJDdOXWhqsAR3L3QHX-c9V-BpKBuRHFz-8HayiyN8_lpHF_SeAbG5bnKNI7H4gyQVwlj7x_HY28nPO4Txm6g8ZYYokLlEsfT8hSOs73814E8RdRsExOUQXFpseTeDWWFSiW_OEOycrlyPceuodeYM7PQmiKSLR0fZHKVYB0uYuWQ0MxdYX0Dggkjpwl1FY4ZDm-AxHTCuAswLohRqHwvMmZ178CMt175FVR0wIu4K1AdVAhSE_lOKFheW963890wXNp9byjYSvy4cdRuHR4ddGt25Y4oSNP0JQoqS8X8DSjI3leukCOSKsj1pQhy2oec8okr4ly-vFisLN5Ch7vOnwBj4cP2r3ulyt79Fadb2yrURksesVeCXarVHYDRyZJxAeVss1Vktprl5Wyr78aQS2voWnNvgaVJzJllPZ9CHGJEepRRTSFtOLN27qLBDCKlUY9ozQD5UUA41clPFNIi8nzT4vYFGAkpMoTUXpDm4x_W2C1comRhtrGbK860dpl4Q3NX-rDNXWm2uSul9ChNmrv5TJ5u7tLd_L-9K-jhwWo-1x_Eq2ut1UotePBwfbQMjfjw2vYOiqX5ysLdmLiQL5Ur-Rko5ov5pfnrsXgVUre2ezMYvOjuZvE5297VJBATMNQlQXb5pgF5wd9J47dB6FFknIAg66tWSUBZgjZpP1OkoUo7M658mvkoNSUM2VKrCY1rQgXUQQ0hpZCXHeA0tuugQJod2UoRpShXN3L59lR9I6pLb_V2pRtAXXq7t5u_wunrOjhkeoibAG7Gvv37V-fPPj9_9uvzk5fnJy_OT_54_vx35ycn5yefnD_74tu__gX96-XLwj9_8xm2bsy4qMDdcdK9Wgagwj--QF0IQiGJS1BuRXokyCljR6GOCHqSqNwtLubs9lpnBa22t5uo21hBnYZd397LvVMp0UvWy-Fo5JP6wXsrJVZHftFp7R52aLHm2lt3LCVSgF-WEkulxfLxxxbWQhO2QzxIr8VEUqnoRFIC15Nhn6gtGI3lPmEKjo__A10b48E',
  ),
)

const Home = () => {
  const {
    data: animeData,
    isLoading: isAnimeLoading,
    isError: isAnimeError,
    refetch: refetchAnime,
  } = useQuery({
    queryKey: ['stream-home', 1],
    queryFn: async () => await axios(isCloudServer ? `${VITE_MAIN_SERVICE_CLOUD}/home` : `${VITE_MAIN_SERVICE}/home?page=1`),
    select: (res) => (isCloudServer ? res.data.data.ongoing.animeList : res.data.ongoing),
  })

  const {
    data: movieData,
    isLoading: isMovieLoading,
    isError: isMovieError,
    refetch: refetchMovie,
  } = useQuery({
    queryKey: ['stream-movie', 1],
    queryFn: async () => await axios(`${VITE_MAIN_SERVICE}/home-movie2?page=1`),
    select: (res) => res.data.movie,
  })

  return (
    <HomePage
      dataAnime={animeData}
      isLoadingAnime={isAnimeLoading}
      isAnimeError={isAnimeError}
      refetchAnime={refetchAnime}
      dataMovie={movieData}
      isLoadingMovie={isMovieLoading}
      isMovieError={isMovieError}
      refetchMovie={refetchMovie}
    />
  )
}

export default Home

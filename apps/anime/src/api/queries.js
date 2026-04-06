export const GET_DETAILED_SEASONAL = `
query (
  $season: MediaSeason,
  $year: Int,
  $format: MediaFormat,
  $page: Int
) {
  Page(page: $page) {
    pageInfo {
      hasNextPage
      total
    }
    media(
      season: $season,
      seasonYear: $year,
      format: $format,
      isAdult: false,
      type: ANIME,
      sort: TITLE_ROMAJI
    ) {
      id
      idMal
      title { romaji english native }
      coverImage { extraLarge color }
      bannerImage
      description
      status
      episodes
      averageScore
      genres
      studios(isMain: true) {
        nodes { name }
      }
      nextAiringEpisode {
        airingAt
        episode
      }
      # Tambahkan field lain dari query kamu di sini sesuai kebutuhan UI
    }
  }
}
`
export const SEASONAL_QUERY = `
query ($season: MediaSeason, $year: Int) {
  Page(perPage: 20) {
    media(season: $season, seasonYear: $year, type: ANIME, sort: POPULARITY_DESC) {
      id
      idMal
      title { romaji }
      coverImage { large, color }
      format
      season
      status
      seasonYear
      rankings {
        season
        type
        rank
        allTime
        year
      }
      genres
      popularity
      episodes
      nextAiringEpisode {
        airingAt
        episode
        timeUntilAiring
      }
      startDate {
        day
        month
        year
      }
      studios {
        nodes {
          name
          isAnimationStudio
        }
      }
    }
    pageInfo {
      currentPage
      hasNextPage
      total
      lastPage
    }
  }
}
`

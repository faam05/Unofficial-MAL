export const SEASONAL_QUERY = `
query ($season: MediaSeason, $year: Int, $page: Int, $isAdult: Boolean) {
  Page(perPage: 20, page: $page) {
    pageInfo {
      currentPage
      hasNextPage
    }
    media(season: $season, seasonYear: $year, type: ANIME, sort: POPULARITY_DESC, isAdult: $isAdult) {
      id
      idMal
      title { romaji }
      coverImage { large, color }
      format
      season
      description
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
  }
}
`

export const GET_SCHEDULE = `
query AiringSchedule($page: Int, $airingAtGreater: Int, $airingAtLesser: Int, $sort: [AiringSort]) {
  Page(page: $page) {
    airingSchedules(airingAt_greater: $airingAtGreater, airingAt_lesser: $airingAtLesser, sort: $sort) {
      id
      episode
      airingAt
      media {
        id
      idMal
      title {
        romaji
      }
      coverImage {
        color
        large
      }
      description
      season
      seasonYear
      genres
      episodes
      status
      rankings {
        season
        type
        rank
        allTime
        year
      }
      popularity
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
      format
      isAdult
      }
    }
    pageInfo {
      total
      hasNextPage
    }
  }
}
`

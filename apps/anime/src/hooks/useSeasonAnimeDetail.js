import { formatAiringTime, formatStartDate } from '../helpers'

export function useSeasonAnimeDetail(anime, isCurrentSeason) {
  let showEpisodeInfo
  let formattedAiringTime

  const filteredStudios = anime.studios?.nodes?.find((studio) => studio.isAnimationStudio) || anime.studios?.nodes?.[0]

  // const filteredRank = anime.rankings?.find((r) => r.season === anime?.season && r.year === anime?.seasonYear)?.rank
  //   ? `# ${anime?.rankings?.find((r) => r.season === anime.season && r.year === anime.seasonYear)?.rank}`
  //   : 'N/A'

  const popularity = new Intl.NumberFormat('id-ID').format(anime.popularity || '0')

  if (isCurrentSeason) {
    const currentEpisode = anime.nextAiringEpisode?.episode && `Ep ${anime.nextAiringEpisode?.episode}`
    const allEpisodes = anime.episodes && `of ${anime.episodes}`

    formattedAiringTime = anime.nextAiringEpisode && ` airing in ${formatAiringTime(anime.nextAiringEpisode?.timeUntilAiring)}`

    showEpisodeInfo = `${currentEpisode ?? ''} ${allEpisodes ?? ''}`
  } else {
    if (anime.status === 'FINISHED') {
      showEpisodeInfo = `Aired on ${formatStartDate(anime.startDate)}`
    } else if (anime.status === 'NOT_YET_RELEASED') {
      showEpisodeInfo = `Airing on ${formatStartDate(anime.startDate)}`
    }
  }

  return { showEpisodeInfo, formattedAiringTime, filteredStudios, popularity }
}

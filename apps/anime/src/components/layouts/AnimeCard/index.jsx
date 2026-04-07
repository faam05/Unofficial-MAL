import { useMobileDevice } from '@shared'
import { useSeasonAnimeDetail } from '../../../hooks/useSeasonAnimeDetail'

import DesktopAnimeCard from './Desktop'
import MobileAnimeCard from './Mobile'

import 'react-lazy-load-image-component/src/effects/blur.css'
import clsx from 'clsx'

export const AnimeCard = ({ anime, isCurrentSeason }) => {
  const mobile = useMobileDevice()

  const { showEpisodeInfo, formattedAiringTime, filteredStudios, popularity } = useSeasonAnimeDetail(anime, isCurrentSeason)

  return (
    <div
      className={clsx('group flex  overflow-hidden rounded-xl border border-slate-50 bg-slate-100 shadow-xl transition-all duration-300 ', {
        'flex-col hover:border-blue-500/70': !mobile,
      })}>
      {mobile ? (
        <MobileAnimeCard
          anime={anime}
          popularity={popularity}
          showEpisodeInfo={showEpisodeInfo}
          formattedAiringTime={formattedAiringTime}
          filteredStudios={filteredStudios}
        />
      ) : (
        <DesktopAnimeCard
          anime={anime}
          popularity={popularity}
          showEpisodeInfo={showEpisodeInfo}
          formattedAiringTime={formattedAiringTime}
          filteredStudios={filteredStudios}
        />
      )}
    </div>
  )
}

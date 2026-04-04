import { useParams } from 'react-router-dom'

import { useMobileDevice } from '@shared'

import DetailMobile from '../components/layouts/detail/Mobile'
import DetailDesktop from '../components/layouts/detail/Desktop'

import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-loading-skeleton/dist/skeleton.css'
import '../styles/detail.css'

function Detail() {
  const { id } = useParams()
  const mobile = useMobileDevice()

  if (!id) return <ErrorMessage message='ID is required' />

  if (isNaN(Number(id))) return <ErrorMessage message='ID must be a number' />

  return mobile ? <DetailMobile id={id} /> : <DetailDesktop id={id} />
}
export default Detail

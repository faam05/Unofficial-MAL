import Layout from '../../components/layouts'
import '../../styles/detail.css'
import DetailDesktop from './Desktop'
import DetailMobile from './Mobile'
import useMobileDevice from '../../hooks/useMobile'

function Detail() {
  const mobile = useMobileDevice()

  return <Layout>{!mobile ? <DetailDesktop /> : <DetailMobile />}</Layout>
}
export default Detail

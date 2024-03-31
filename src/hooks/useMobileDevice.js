import { useState, useEffect } from 'react'

export const useMobileDevice = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth)

  const checkMobile = () => {
    setIsMobile(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return isMobile < 768
}

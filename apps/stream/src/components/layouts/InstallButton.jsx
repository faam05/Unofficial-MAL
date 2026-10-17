import { Alert, Button } from '@mantine/core'
import { useEffect, useState } from 'react'

// Variabel global untuk menampung event jika terpanggil sebelum komponen siap
let deferredPromptGlobal = null

// Tangkap event di luar komponen React agar tidak pernah terlewat
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  deferredPromptGlobal = e
  // Trigger custom event agar komponen tahu event sudah siap
  window.dispatchEvent(new Event('pwa-prompt-ready'))
})

export default function InstallButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Cek apakah event sudah tertangkap sebelumnya
    // if (deferredPromptGlobal) {
    //   setIsVisible(true)
    // }

    function checkPromptReady() {
      if (deferredPromptGlobal) {
        setIsVisible(true)
      }
    }

    checkPromptReady()

    // Listener untuk mendengarkan saat event siap
    const handlePromptReady = () => {
      setIsVisible(true)
    }

    window.addEventListener('pwa-prompt-ready', handlePromptReady)

    return () => {
      window.removeEventListener('pwa-prompt-ready', handlePromptReady)
    }
  }, [])

  const handleInstallClick = async () => {
    const promptEvent = deferredPromptGlobal
    if (!promptEvent) return

    // Tampilkan prompt instalasi bawaan browser lewat klik tombol Anda
    promptEvent.prompt()

    // Tunggu respon pengguna
    const { outcome } = await promptEvent.userChoice
    if (outcome === 'accepted') {
      console.log('Pengguna menyetujui instalasi PWA')
    }

    // Reset setelah digunakan
    deferredPromptGlobal = null
    setIsVisible(false)
  }

  // Jika belum siap atau sudah diinstal, jangan tampilkan tombol
  if (!isVisible) return null

  return (
    <Alert variant='light' color='blue' withCloseButton onClose={() => setIsVisible(false)}>
      <div className='space-y-2 py-2 text-center'>
        <p>Permudah akses dengan menginstalnya di perangkat Anda.</p>
        <Button onClick={handleInstallClick} bg='red'>
          📱 Install Aplikasi
        </Button>
      </div>
    </Alert>
  )
}

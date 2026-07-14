import { type FC, useState, useEffect, useRef } from 'react'

interface IframePlayerProps {
  src: string
  title?: string
}

export const IframePlayer: FC<IframePlayerProps> = ({ src, title = 'Video Player' }) => {
  const [isBlocked, setIsBlocked] = useState<boolean>(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Reset state setiap kali URL src berubah
    setIsBlocked(false)

    // Batas waktu deteksi (4 detik)
    const TIMEOUT_LIMIT = 4000

    const timeoutId = setTimeout(() => {
      const iframe = iframeRef.current
      if (!iframe) return

      try {
        // Jika diblokir oleh CSP frame-ancestors di Prod, baris ini akan melempar error Cross-Origin
        const iframeDoc = iframe.contentWindow?.document

        // Cek tambahan jika tidak melempar error tapi halaman kosong/blank putih
        if (!iframeDoc || iframeDoc.body.innerHTML === '') {
          setIsBlocked(true)
        }
      } catch (error) {
        console.warn('Iframe terdeteksi diblokir oleh aturan CSP/Cross-Origin:', error)
        setIsBlocked(true)
      }
    }, TIMEOUT_LIMIT)

    return () => clearTimeout(timeoutId)
  }, [src])

  const handleLoad = () => {
    try {
      // Cek instan saat event load terpicu (berhasil diakses biasanya hanya di localhost/dev)
      if (iframeRef.current?.contentWindow?.location.href) {
        setIsBlocked(false)
      }
    } catch (e) {
      setIsBlocked(true)
    }
  }

  return (
    <div className='relative w-full'>
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        onLoad={handleLoad}
        className={`min-h-50 h-fit w-full rounded-lg border-none bg-black ${isBlocked ? 'hidden' : 'block'}`}
        allowFullScreen
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope'
        loading='eager'
      />

      {isBlocked && (
        <div className='min-h-50 mx-auto flex h-fit max-w-2xl flex-col rounded-lg border border-red-200 bg-red-50 p-8 text-center shadow-sm'>
          <h3 className='mb-2 mt-0 text-xl font-bold text-red-600'>Gagal Memutar Video</h3>
          <a
            href={src}
            target='_blank'
            rel='noopener noreferrer'
            className='mt-auto inline-block rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors duration-200 hover:bg-red-700'>
            Tonton Langsung ↗
          </a>
        </div>
      )}
    </div>
  )
}

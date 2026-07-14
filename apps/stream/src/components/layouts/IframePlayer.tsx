import clsx from 'clsx'
import { type FC, useEffect, useRef, useState } from 'react'

import Skeleton from 'react-loading-skeleton'

interface IframePlayerProps {
  src: string
  title?: string
}

export const IframePlayer: FC<IframePlayerProps> = ({ src, title = 'Video Player' }) => {
  const [isBlocked, setIsBlocked] = useState<boolean>(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const hasLoadedSuccessfully = useRef<boolean>(false)

  useEffect(() => {
    // Reset setiap kali src berubah
    setIsLoading(true)
    setIsBlocked(false)
    hasLoadedSuccessfully.current = false

    // Timeout untuk mendeteksi CSP (jika dalam 4.5 detik tidak ada tanda-tanda sukses)
    const TIMEOUT_LIMIT = 4500

    const timeoutId = setTimeout(() => {
      // Jika iframe sudah berhasil memicu onLoad dengan aman, batalkan pemblokiran
      if (hasLoadedSuccessfully.current) {
        setIsLoading(false)
        return
      }

      const iframe = iframeRef.current
      if (!iframe) return

      try {
        // Cek apakah halaman kosong (Ciri khas CSP Block di beberapa browser)
        const iframeDoc = iframe.contentWindow?.document
        if (!iframeDoc || iframeDoc.body.innerHTML === '') {
          setIsBlocked(true)
        }
      } catch (error) {
        // Jika cross-origin diblokir total oleh CSP sejak awal (tidak memicu onLoad sama sekali)
        console.warn('Mencurigai pemblokiran CSP karena timeout habis:', error)
        setIsBlocked(true)
      } finally {
        setIsLoading(false)
      }
    }, TIMEOUT_LIMIT)

    return () => clearTimeout(timeoutId)
  }, [src])

  const handleLoad = () => {
    hasLoadedSuccessfully.current = true
    setIsBlocked(false)
  }

  return (
    <div className='relative w-full'>
      {isLoading && <Skeleton className='min-h-50 lg:h-125 h-fit w-full rounded-lg' />}

      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        onLoad={handleLoad}
        className={clsx('min-h-50 lg:h-125 h-fit w-full rounded-lg border-none bg-black', {
          hidden: isBlocked || isLoading,
          block: !isBlocked && !isLoading,
        })}
        allowFullScreen
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope'
        loading='eager'
      />

      {isBlocked && (
        <div className='min-h-50 lg:h-125 mx-auto flex h-fit max-w-2xl flex-col justify-center gap-8 rounded-lg border border-red-200 bg-red-50 p-8 text-center shadow-sm'>
          <h3 className='mb-2 mt-0 text-xl font-bold text-red-600'>Gagal Memutar Video</h3>
          <a
            href={src}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors duration-200 hover:bg-red-700'>
            Tonton Langsung ↗
          </a>
        </div>
      )}
    </div>
  )
}

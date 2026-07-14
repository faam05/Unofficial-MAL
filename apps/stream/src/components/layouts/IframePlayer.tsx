import { type FC, useState } from 'react'

interface IframePlayerProps {
  src: string
  title?: string
}

export const IframePlayer: FC<IframePlayerProps> = ({ src, title = 'Video Player' }) => {
  const [showAlternative, setShowAlternative] = useState(false)

  return (
    <div className='relative flex w-full flex-col gap-2'>
      <iframe
        key={src}
        src={src}
        title={title}
        className='min-h-50 md:h-100 h-fit w-full rounded-lg border-none bg-black'
        allowFullScreen
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope'
        loading='eager'
      />

      {/* Tombol kecil bantuan di bawah video */}
      <div className='flex items-center justify-between px-1 text-xs text-gray-500'>
        <span>Mengalami masalah saat memutar?</span>
        <button
          type='button'
          onClick={() => setShowAlternative(!showAlternative)}
          className='cursor-pointer font-semibold text-red-600 hover:underline'>
          {showAlternative ? 'Sembunyikan Bantuan' : 'Klik di Sini'}
        </button>
      </div>

      {showAlternative && (
        <div className='mt-2 rounded-lg border border-red-200 bg-red-50 p-4 text-center shadow-sm'>
          <p className='mb-3 text-xs text-gray-600'>Beberapa pemutar video (mirror) memblokir pemutaran langsung.</p>
          <a
            href={src}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block rounded bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-red-700'>
            Buka Video di Tab Baru ↗
          </a>
        </div>
      )}
    </div>
  )
}

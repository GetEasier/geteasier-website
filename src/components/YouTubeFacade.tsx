'use client'

import { useState } from 'react'

// O iframe do YouTube só é criado depois do clique: nenhum script de terceiros corre ao abrir a página.
export default function YouTubeFacade({ videoId, label, note }: { videoId: string; label: string; note: string }) {
  const [active, setActive] = useState(false)
  return (
    <div>
      <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-frame border border-tinta bg-tinta">
        {active ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-4 text-white"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white transition-colors group-hover:bg-white group-hover:text-tinta">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="font-semibold">{label}</span>
          </button>
        )}
      </div>
      <p className="mt-3 text-small text-grafite">
        {note}{' '}
        <a href={`https://www.youtube.com/watch?v=${videoId}`} className="link" target="_blank" rel="noopener noreferrer">
          YouTube
        </a>
      </p>
    </div>
  )
}

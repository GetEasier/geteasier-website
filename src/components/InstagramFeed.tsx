'use client'

import { useEffect, useState } from 'react'

type Post = { id: string; imageUrl: string; caption: string; link: string }

// Só aparece quando a API do Instagram devolve publicações reais. Sem contagens de gostos.
export default function InstagramFeed({ title, linkText, href }: { title: string; linkText: string; href: string }) {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const ctrl = new AbortController()
    fetch('/api/instagram', { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : { posts: [] }))
      .then((data: { posts?: Post[] }) => setPosts((data.posts ?? []).filter((p) => p.imageUrl && p.link).slice(0, 4)))
      .catch(() => setPosts([]))
    return () => ctrl.abort()
  }, [])

  if (posts.length === 0) {
    return (
      <p className="wrap border-t border-linha py-10">
        <a href={href} className="link" target="_blank" rel="noopener noreferrer">
          {linkText}
        </a>
      </p>
    )
  }

  return (
    <section aria-labelledby="instagram-titulo" className="border-t border-linha py-16">
      <div className="wrap">
        <h2 id="instagram-titulo" className="t-h2">
          {title}
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {posts.map((post) => (
            <li key={post.id}>
              <a href={post.link} target="_blank" rel="noopener noreferrer" className="block">
                {/* eslint-disable-next-line @next/next/no-img-element -- URL externo e temporário do Instagram */}
                <img
                  src={post.imageUrl}
                  alt={post.caption ? post.caption.slice(0, 120) : title}
                  width={400}
                  height={400}
                  loading="lazy"
                  className="aspect-square w-full rounded-frame object-cover"
                />
              </a>
            </li>
          ))}
        </ul>
        <a href={href} className="link mt-6 inline-block" target="_blank" rel="noopener noreferrer">
          {linkText}
        </a>
      </div>
    </section>
  )
}

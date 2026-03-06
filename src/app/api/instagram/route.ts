import { NextResponse } from 'next/server'

// Fontes de dados para as últimas publicações (uma das opções):
// 1) Instagram Graph API (Meta) – requer conta Facebook Developers
// 2) Apify – só conta Apify, sem Facebook. Ver INSTAGRAM_SETUP.md

// Permite à função correr até 60s na Vercel (Apify sync pode demorar 30–50s)
export const maxDuration = 60

const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/geteasier.pt/'
const CACHE_REVALIDATE = 3600 // 1 hora
const MAX_POSTS = 5 // Menos posts = Apify mais rápido

// Cache em memória para Apify: primeiro pedido é lento (50s–1m), os seguintes são instantâneos
const APIFY_CACHE_TTL_MS = 50 * 60 * 1000 // 50 minutos
let apifyCache: { posts: Array<{ id: string; imageUrl: string; caption?: string; link: string; likes?: number; comments?: number }>; expiresAt: number } | null = null

/** Formato de um post para o carrossel */
function mapToPost(item: {
  id: string
  image_url?: string
  imageUrl?: string
  caption?: string
  url?: string
  permalink?: string
  likes?: number
  comments?: number
  media_type?: string
  media_url?: string
  thumbnail_url?: string
}) {
  const imageUrl = item.image_url ?? item.imageUrl ?? (item.media_type === 'VIDEO' ? item.thumbnail_url : item.media_url)
  const link = item.url ?? item.permalink ?? ''
  return {
    id: String(item.id),
    imageUrl: imageUrl || '',
    caption: item.caption ? String(item.caption).substring(0, 150) : '',
    link,
    likes: item.likes ?? 0,
    comments: item.comments ?? 0
  }
}

/** Posts via Instagram Graph API (Meta) – requer Facebook Developers */
async function fetchFromGraphAPI(accessToken: string, userId: string) {
  const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=${MAX_POSTS}&access_token=${accessToken}`
  const res = await fetch(url, { next: { revalidate: CACHE_REVALIDATE } })
  if (!res.ok) throw new Error(`Instagram API error: ${res.statusText}`)
  const data = await res.json()
  const list = data.data ?? []
  return list.map((post: any) => mapToPost({
    id: post.id,
    media_type: post.media_type,
    media_url: post.media_url,
    thumbnail_url: post.thumbnail_url,
    caption: post.caption,
    permalink: post.permalink,
    likes: 0,
    comments: 0
  }))
}

/** Posts via Apify (sem Facebook) – conta em apify.com + Task do actor Instagram Profile Scraper */
async function fetchFromApify(apiToken: string, taskId: string) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 58_000) // 58s (maxDuration 60s na Vercel)
  try {
    // Task ID pode ser "username~task-name" ou ID alfanumérico
    const safeTaskId = taskId.trim()
    const res = await fetch(
      `https://api.apify.com/v2/actor-tasks/${encodeURIComponent(safeTaskId)}/run-sync-get-dataset-items?format=json&limit=1`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiToken}`
        },
        body: JSON.stringify({
          urls: [INSTAGRAM_PROFILE_URL],
          maxPosts: MAX_POSTS, // Limitar para o actor ser mais rápido
        }),
        signal: controller.signal,
        next: { revalidate: CACHE_REVALIDATE }
      }
    )
    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Apify ${res.status}: ${err}`)
    }
    const raw = await res.json()
    // Resposta é array de dataset items; cada item = 1 perfil com .posts
    const items = Array.isArray(raw) ? raw : (raw?.items ?? raw?.data ?? [])
    const profile = items[0]
    if (!profile) return []
    // Actor vulnv/instagram-profile-scraper devolve um objeto com .posts
    let postsList = profile.posts ?? profile.Posts ?? profile.recentPosts ?? []
    if (!Array.isArray(postsList)) postsList = []
    return postsList
      .slice(0, MAX_POSTS)
      .map((p: any) => mapToPost({
        id: p.id ?? p.pk,
        image_url: p.image_url ?? p.display_url,
        caption: p.caption,
        url: p.url ?? p.permalink,
        likes: p.likes ?? p.like_count,
        comments: p.comments ?? p.comment_count
      }))
      .filter((p) => p.imageUrl) // só posts com imagem
  } finally {
    clearTimeout(timeout)
  }
}

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
    const userId = process.env.INSTAGRAM_USER_ID
    const apifyToken = process.env.APIFY_TOKEN
    const apifyTaskId = process.env.APIFY_INSTAGRAM_TASK_ID

    // 1) Preferir Instagram Graph API se estiver configurada
    if (accessToken && userId) {
      const posts = await fetchFromGraphAPI(accessToken, userId)
      return NextResponse.json({ posts, count: posts.length }, { status: 200 })
    }

    // 2) Alternativa sem Facebook: Apify (conta em apify.com)
    if (apifyToken && apifyTaskId) {
      if (apifyCache && Date.now() < apifyCache.expiresAt && apifyCache.posts.length > 0) {
        return NextResponse.json({ posts: apifyCache.posts, count: apifyCache.posts.length, cached: true }, { status: 200 })
      }
      const posts = await fetchFromApify(apifyToken, apifyTaskId)
      if (posts.length > 0) {
        apifyCache = { posts, expiresAt: Date.now() + APIFY_CACHE_TTL_MS }
      }
      return NextResponse.json({ posts, count: posts.length }, { status: 200 })
    }

    // Nenhuma fonte configurada – o frontend usa posts estáticos (initialPosts)
    return NextResponse.json({
      posts: [],
      message: 'Instagram API não configurada. Usando posts iniciais.'
    }, { status: 200 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch Instagram posts'
    console.error('Instagram API error:', message, error)
    return NextResponse.json({
      posts: [],
      error: 'Failed to fetch Instagram posts',
      message: 'Usando posts iniciais como fallback',
      debug: process.env.NODE_ENV === 'development' ? message : undefined
    }, { status: 200 })
  }
}


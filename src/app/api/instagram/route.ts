import { NextResponse } from 'next/server'

// Fontes de dados para as últimas publicações (uma das opções):
// 1) Instagram Graph API (Meta) – requer conta Facebook Developers
// 2) Apify – só conta Apify, sem Facebook. Ver INSTAGRAM_SETUP.md

const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/geteasier.pt/'
const CACHE_REVALIDATE = 3600 // 1 hora

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
  const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=12&access_token=${accessToken}`
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
  const timeout = setTimeout(() => controller.abort(), 50_000) // 50s para não exceder serverless
  try {
    const res = await fetch(
      `https://api.apify.com/v2/actor-tasks/${encodeURIComponent(taskId)}/run-sync-get-dataset-items?format=json&limit=1`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiToken}`
        },
        body: JSON.stringify({ urls: [INSTAGRAM_PROFILE_URL] }),
        signal: controller.signal,
        next: { revalidate: CACHE_REVALIDATE }
      }
    )
    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Apify error: ${res.status} ${err}`)
    }
    const items = await res.json()
    const profile = Array.isArray(items) ? items[0] : items
    const posts = profile?.posts ?? []
    return posts.slice(0, 12).map((p: any) => mapToPost({
      id: p.id,
      image_url: p.image_url,
      caption: p.caption,
      url: p.url,
      likes: p.likes,
      comments: p.comments
    }))
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
      const posts = await fetchFromApify(apifyToken, apifyTaskId)
      return NextResponse.json({ posts, count: posts.length }, { status: 200 })
    }

    // Nenhuma fonte configurada – o frontend usa posts estáticos (initialPosts)
    return NextResponse.json({
      posts: [],
      message: 'Instagram API não configurada. Usando posts iniciais.'
    }, { status: 200 })
  } catch (error) {
    console.error('Error fetching Instagram posts:', error)
    return NextResponse.json({
      posts: [],
      error: 'Failed to fetch Instagram posts',
      message: 'Usando posts iniciais como fallback'
    }, { status: 200 })
  }
}


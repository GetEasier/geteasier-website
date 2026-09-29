import { NextResponse } from 'next/server'

// Últimas publicações via Instagram Graph API (Meta).
// Configuração: INSTAGRAM_ACCESS_TOKEN e INSTAGRAM_USER_ID (ID numérico), ver INSTAGRAM_SETUP.md.
// Sem configuração, ou com erro, devolve uma lista vazia e o site mostra só a ligação para o perfil.

const CACHE_REVALIDATE = 3600 // 1 hora
const MAX_POSTS = 5

type GraphPost = {
  id: string
  media_type?: string
  media_url?: string
  thumbnail_url?: string
  caption?: string
  permalink?: string
}

function mapToPost(post: GraphPost) {
  const imageUrl = post.media_type === 'VIDEO' ? post.thumbnail_url || post.media_url : post.media_url
  return {
    id: String(post.id),
    imageUrl: imageUrl || '',
    caption: post.caption ? String(post.caption).substring(0, 150) : '',
    link: post.permalink || '',
  }
}

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_USER_ID
  if (!accessToken || !userId) return NextResponse.json({ posts: [] })

  try {
    const url = `https://graph.facebook.com/v21.0/${userId}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=${MAX_POSTS}&access_token=${accessToken}`
    const res = await fetch(url, { next: { revalidate: CACHE_REVALIDATE } })
    if (!res.ok) {
      console.error('[Instagram API]', res.status, await res.text())
      return NextResponse.json({ posts: [] })
    }
    const data = (await res.json()) as { data?: GraphPost[] }
    const posts = (data.data ?? []).map(mapToPost).filter((p) => p.imageUrl && p.link)
    return NextResponse.json({ posts })
  } catch (error) {
    console.error('[Instagram API]', error instanceof Error ? error.message : error)
    return NextResponse.json({ posts: [] })
  }
}

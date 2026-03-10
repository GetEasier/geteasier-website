import { NextResponse } from 'next/server'

// Últimas publicações via Instagram Graph API (Meta).
// Configuração: .env.local com INSTAGRAM_ACCESS_TOKEN e INSTAGRAM_USER_ID.
// Ver INSTAGRAM_SETUP.md para obter estes valores.

const CACHE_REVALIDATE = 3600 // 1 hora
const MAX_POSTS = 5

/** Formato de um post para o carrossel */
function mapToPost(post: {
  id: string
  media_type?: string
  media_url?: string
  thumbnail_url?: string
  caption?: string
  permalink?: string
}) {
  const imageUrl =
    post.media_type === 'VIDEO'
      ? (post.thumbnail_url || post.media_url)
      : post.media_url
  return {
    id: String(post.id),
    imageUrl: imageUrl || '',
    caption: post.caption ? String(post.caption).substring(0, 150) : '',
    link: post.permalink || '',
    likes: 0,
    comments: 0,
  }
}

/** Buscar posts via Instagram Graph API */
async function fetchFromGraphAPI(accessToken: string, userId: string) {
  const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=${MAX_POSTS}&access_token=${accessToken}`
  console.log('[Instagram API] Fetching media for userId:', userId)
  const res = await fetch(url, { next: { revalidate: CACHE_REVALIDATE } })
  console.log('[Instagram API] Response status:', res.status, res.statusText)
  if (!res.ok) {
    const errText = await res.text()
    console.error('[Instagram API] Error body:', errText)
    // Erro 100 + subcode 33 com "geteasier.pt" = userId é o username, não o ID numérico
    let hint = ''
    try {
      const errJson = JSON.parse(errText)
      const msg = errJson?.error?.message ?? ''
      const code = errJson?.error?.code
      const subcode = errJson?.error?.error_subcode
      if (code === 100 && subcode === 33 && (userId.includes('.') || !/^\d+$/.test(userId))) {
        hint = ' INSTAGRAM_USER_ID deve ser o ID numérico da conta (ex: 17841400008460056), não o username (geteasier.pt). Obtém o ID em Facebook Developers → Instagram → Configurações Básicas ou no Explorador da API Graph.'
      }
    } catch {
      // ignore
    }
    throw new Error(`Instagram API: ${res.status} ${errText}${hint}`)
  }
  const data = await res.json()
  const list = data.data ?? []
  console.log('[Instagram API] Raw items from API:', list.length, '| data.data exists:', !!data.data, '| data keys:', Object.keys(data))
  if (data.error) {
    console.error('[Instagram API] API returned error:', data.error)
  }
  const posts = list
    .map((post: { id: string; media_type?: string; media_url?: string; thumbnail_url?: string; caption?: string; permalink?: string }) =>
      mapToPost(post)
    )
    .filter((p: { imageUrl: string }) => !!p.imageUrl)
  console.log('[Instagram API] Mapped posts with image:', posts.length)
  return posts
}

export async function GET() {
  console.log('[Instagram API] GET /api/instagram called')
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
    const userId = process.env.INSTAGRAM_USER_ID

    console.log('[Instagram API] Env check: INSTAGRAM_ACCESS_TOKEN', accessToken ? `set (${accessToken.length} chars)` : 'MISSING', '| INSTAGRAM_USER_ID', userId ? `set (${userId})` : 'MISSING')

    if (!accessToken || !userId) {
      console.log('[Instagram API] Skipping fetch: missing token or userId')
      return NextResponse.json(
        {
          posts: [],
          message: 'Instagram API não configurada. Defina INSTAGRAM_ACCESS_TOKEN e INSTAGRAM_USER_ID no .env.local (ou nas variáveis de ambiente na Vercel).',
          _log: process.env.NODE_ENV === 'development' ? { tokenSet: !!accessToken, userIdSet: !!userId } : undefined,
        },
        { status: 200 }
      )
    }

    const posts = await fetchFromGraphAPI(accessToken, userId)
    console.log('[Instagram API] Success: returning', posts.length, 'posts')
    return NextResponse.json(
      {
        posts,
        count: posts.length,
        _log: process.env.NODE_ENV === 'development' ? { source: 'graph-api', postsReturned: posts.length } : undefined,
      },
      { status: 200 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch Instagram posts'
    console.error('[Instagram API] Caught error:', message, error)
    return NextResponse.json(
      {
        posts: [],
        error: 'Failed to fetch Instagram posts',
        message: 'Usando posts iniciais como fallback',
        _log: process.env.NODE_ENV === 'development' ? { error: message } : undefined,
      },
      { status: 200 }
    )
  }
}

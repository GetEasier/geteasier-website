import { NextResponse } from 'next/server';
import { isInstagramPost, safeInstagramUrl } from '@/lib/instagram';

// Next 15 does not cache GET handlers by default. Cache public media explicitly.
export const dynamic = 'force-dynamic';
const CACHE_REVALIDATE = 3600;
const MAX_POSTS = 5;

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;
  if (!accessToken || !userId) {
    return NextResponse.json({ posts: [] }, {
      headers: { 'Cache-Control': 'public, max-age=0, s-maxage=60' },
    });
  }
  if (!/^\d+$/.test(userId)) {
    return NextResponse.json({ posts: [], error: 'Instagram unavailable' }, {
      status: 503, headers: { 'Cache-Control': 'no-store' },
    });
  }

  try {
    const url = new URL(`https://graph.facebook.com/v21.0/${userId}/media`);
    url.searchParams.set('fields', 'id,caption,media_type,media_url,permalink,thumbnail_url');
    url.searchParams.set('limit', String(MAX_POSTS));
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: CACHE_REVALIDATE },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error('Upstream request failed');
    const data = await response.json();
    if (!Array.isArray(data.data) || data.error) throw new Error('Invalid upstream response');
    const posts = data.data.slice(0, MAX_POSTS).map((value: unknown) => {
      if (!value || typeof value !== 'object') return null;
      const post = value as Record<string, unknown>;
      return {
        id: typeof post.id === 'string' ? post.id : '',
        imageUrl: safeInstagramUrl(post.media_type === 'VIDEO'
          ? post.thumbnail_url || post.media_url : post.media_url, true),
        caption: typeof post.caption === 'string' ? post.caption.slice(0, 150) : '',
        link: safeInstagramUrl(post.permalink),
      };
    }).filter(isInstagramPost);
    return NextResponse.json({ posts, count: posts.length }, {
      headers: { 'Cache-Control': `public, max-age=0, s-maxage=${CACHE_REVALIDATE}` },
    });
  } catch {
    // Upstream errors can contain credentials: never log or return their bodies.
    console.error('[Instagram API] Media request failed');
    return NextResponse.json({ posts: [], error: 'Instagram unavailable' }, {
      status: 503, headers: { 'Cache-Control': 'no-store' },
    });
  }
}

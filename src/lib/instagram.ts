export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption?: string;
  link: string;
  likes?: number;
  comments?: number;
}

export function safeInstagramUrl(value: unknown, media = false): string {
  if (typeof value !== 'string') return '';
  try {
    const url = new URL(value);
    const hosts = media ? ['cdninstagram.com', 'fbcdn.net'] : ['instagram.com'];
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return '';
    return hosts.some(host => url.hostname === host || url.hostname.endsWith(`.${host}`))
      ? url.href : '';
  } catch {
    return '';
  }
}

export function isInstagramPost(value: unknown): value is InstagramPost {
  if (!value || typeof value !== 'object') return false;
  const post = value as Record<string, unknown>;
  return typeof post.id === 'string' && !!post.id &&
    !!safeInstagramUrl(post.imageUrl, true) && !!safeInstagramUrl(post.link) &&
    (post.caption === undefined || typeof post.caption === 'string');
}

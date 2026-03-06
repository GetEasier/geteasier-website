'use client'

import { useState, useEffect } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useLanguage } from "@/contexts/LanguageContext"
import { Instagram, Heart, MessageCircle, Send, Bookmark, Loader2 } from "lucide-react"
import MaxWidthWrapper from "./MaxWidthWrapper"

interface InstagramPost {
  id: string
  imageUrl: string
  caption?: string
  link: string
  likes?: number
  comments?: number
}

interface InstagramCarouselProps {
  initialPosts?: InstagramPost[]
}

function InstagramPostCard({ post }: { post: InstagramPost }) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Instagram-style header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200">
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-0.5">
          <div className="w-full h-full rounded-full bg-white"></div>
        </div>
        <span className="text-sm font-semibold text-gray-900">geteasier.pt</span>
      </div>

      {/* Image container */}
      <div className="relative aspect-square bg-gray-100">
        {!imageError ? (
          <img
            src={post.imageUrl}
            alt={post.caption || 'Instagram post'}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onError={() => setImageError(true)}
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
            <Instagram className="w-12 h-12 text-blue-400" />
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
          <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-1 text-white">
              <Heart className="w-6 h-6 fill-white" />
              <span className="font-semibold">{post.likes || '0'}</span>
            </div>
            <div className="flex items-center gap-1 text-white">
              <MessageCircle className="w-6 h-6 fill-white" />
              <span className="font-semibold">{post.comments || '0'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Instagram-style actions */}
      <div className="px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Heart className="w-6 h-6 text-gray-900 hover:text-red-500 transition-colors cursor-pointer" />
          <MessageCircle className="w-6 h-6 text-gray-900 hover:text-blue-500 transition-colors cursor-pointer" />
          <Send className="w-6 h-6 text-gray-900 hover:text-blue-500 transition-colors cursor-pointer" />
        </div>
        <Bookmark className="w-6 h-6 text-gray-900 hover:text-gray-600 transition-colors cursor-pointer" />
      </div>

      {/* Caption preview */}
      {post.caption && (
        <div className="px-3 pb-3">
          <p className="text-sm text-gray-900 line-clamp-2">
            <span className="font-semibold">geteasier.pt</span> {post.caption}
          </p>
        </div>
      )}
    </a>
  )
}

export default function InstagramCarousel({ initialPosts = [] }: InstagramCarouselProps) {
  const { t } = useLanguage()
  const [posts, setPosts] = useState<InstagramPost[]>(initialPosts)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      // Só mostrar loading se não tiver posts iniciais (evita flash de loading quando há fallback)
      if (initialPosts.length === 0) setLoading(true)
      try {
        const response = await fetch('/api/instagram')
        const data = await response.json()
        
        if (data.posts && data.posts.length > 0) {
          setPosts(data.posts)
        } else if (initialPosts.length > 0) {
          setPosts(initialPosts)
        }
        setError(null)
      } catch (err) {
        console.error('Error fetching Instagram posts:', err)
        setError('Failed to load Instagram posts')
        if (initialPosts.length > 0) setPosts(initialPosts)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [initialPosts])

  if (loading) {
    return (
      <div className="w-full py-12 md:py-16 lg:py-20 bg-white">
        <MaxWidthWrapper className="px-4 md:px-0">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-gray-900">
              {t('instagram.title')}
            </h3>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              {t('instagram.subtitle')}
            </p>
          </div>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        </MaxWidthWrapper>
      </div>
    )
  }

  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <div className="w-full py-12 md:py-16 lg:py-20 bg-white">
      <MaxWidthWrapper className="px-4 md:px-0">
        <div className="text-center mb-8 md:mb-12">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-gray-900">
            {t('instagram.title')}
          </h3>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            {t('instagram.subtitle')}
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {posts.map((post) => (
              <CarouselItem key={post.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <InstagramPostCard post={post} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>

        <div className="text-center mt-6 md:mt-8">
          <a
            href="https://www.instagram.com/geteasier.pt/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            <Instagram className="w-5 h-5" />
            <span>{t('instagram.followUs')}</span>
          </a>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}


"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlayCircle } from "lucide-react"
import { LoadingDots } from "@/components/ui/loading-dots"
import { format } from "date-fns"
import type { Article, Author, Category } from "@/types/database"

interface HeroSectionProps {
  article?: Article & {
    author: Author
    category: Category
  }
}

export function HeroSection({ article }: HeroSectionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayClick = () => {
    setIsLoading(true)
    // Simulate loading video
    setTimeout(() => {
      setIsLoading(false)
      setIsPlaying(true)
    }, 1500)
  }

  // Use the provided article or fallback to default content
  const title = article?.title || "THE RISE OF AI-POWERED DEVELOPMENT"
  const subtitle = article?.excerpt || "How LLMs Are Changing Coding Forever"
  const content =
    article?.content ||
    "From code completion to automated testing, large language models are revolutionizing how developers work. We explore the benefits, challenges, and ethical considerations."
  const authorName = article?.author?.name || "Sarah Johnson"
  const publishedDate = article?.published_at ? format(new Date(article.published_at), "MMM d, yyyy") : "May 18, 2025"
  const categoryName = article?.category?.name || "FEATURE"
  const categoryColor = article?.category?.color || "bg-blue-600"
  const slug = article?.slug || "ai-powered-development"

  return (
    <section className="relative w-full bg-[#0a1929] pb-8">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-[#0a1929]"></div>

      {/* Navigation bar similar to screenshot */}
      <div className="container mx-auto px-4">
        <div className="flex justify-center py-4 border-b border-blue-900/30">
          <nav className="flex items-center space-x-8">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-white hover:text-blue-300 uppercase tracking-wider"
            >
              HOME
            </Link>
            <Link
              href="/articles"
              className="px-4 py-2 text-sm font-medium text-white hover:text-blue-300 uppercase tracking-wider"
            >
              ARTICLES
            </Link>
            <Link
              href="/podcasts"
              className="px-4 py-2 text-sm font-medium text-white hover:text-blue-300 uppercase tracking-wider border-b-2 border-blue-500"
            >
              PODCASTS
            </Link>
            <Link
              href="/topics"
              className="px-4 py-2 text-sm font-medium text-white hover:text-blue-300 uppercase tracking-wider"
            >
              TOPICS
            </Link>
            <Link
              href="/events"
              className="px-4 py-2 text-sm font-medium text-white hover:text-blue-300 uppercase tracking-wider"
            >
              EVENTS
            </Link>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="relative z-10 grid gap-8 lg:grid-cols-2 items-center">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            {isPlaying ? (
              <div className="absolute inset-0 bg-black flex items-center justify-center">
                <div className="text-white">Video playing...</div>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute bottom-4 right-4 gap-1 rounded-full bg-white/20 text-white backdrop-blur-sm"
                  onClick={() => setIsPlaying(false)}
                >
                  Stop
                </Button>
              </div>
            ) : (
              <>
                <Image
                  src="/images/netflix-tudum-hero.png"
                  alt="Netflix Tudum 2025 featuring Lady Gaga"
                  fill
                  className="object-cover transition-all duration-500 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1929]/80 via-[#0a1929]/50 to-transparent">
                  <div className="absolute bottom-4 left-4">
                    {isLoading ? (
                      <div className="rounded-full bg-white/20 backdrop-blur-sm px-4 py-2">
                        <LoadingDots color="white" size="sm" />
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 rounded-full bg-white/20 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30"
                        onClick={handlePlayClick}
                      >
                        <PlayCircle className="h-4 w-4" />
                        Watch
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="space-y-6 md:space-y-8 slide-up">
            <div
              className={`inline-block rounded ${categoryColor} px-3 py-1 text-xs font-medium uppercase tracking-wider text-white transition-all duration-300 hover:shadow-md`}
            >
              {categoryName}
            </div>
            <h1 className="font-archivo text-4xl md:text-6xl font-extrabold leading-tight tracking-tighter uppercase">
              {title}
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-400 tracking-tight">{subtitle}</h2>
            <p className="text-lg text-gray-300">{content}</p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="font-medium">By {authorName}</span>
              <span>•</span>
              <span>{publishedDate}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href={`/articles/${slug}`}>
                <Button
                  variant="default"
                  className="gap-1 bg-blue-600 hover:bg-blue-700 uppercase tracking-wider font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                >
                  READ MORE
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

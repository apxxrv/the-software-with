"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ArticleCardSkeleton } from "@/components/ui/article-card-skeleton"
import { LoadingDots } from "@/components/ui/loading-dots"

interface ArticleProps {
  image: string
  category: string
  categoryColor: string
  title: string
  author: string
  date: string
  href?: string
}

export function InteractiveArticleCard({
  image,
  category,
  categoryColor,
  title,
  author,
  date,
  href = "#",
}: ArticleProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)
    // Simulate loading for demo purposes
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = href
    }, 2000)
  }

  if (isLoading) {
    return (
      <div className="relative">
        <ArticleCardSkeleton />
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingDots color="blue" size="md" />
        </div>
      </div>
    )
  }

  return (
    <div onClick={handleClick} className="cursor-pointer group">
      <Card className="overflow-hidden border-0 bg-[#0d2237] transition-all duration-300 hover-glow relative">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-6">
          <div
            className={`mb-3 inline-block rounded ${categoryColor} px-2 py-1 text-xs font-medium text-white transition-all duration-300 group-hover:scale-105 group-hover:shadow-md`}
          >
            {category}
          </div>
          <h3 className="mb-3 text-2xl font-bold leading-tight transition-all duration-300 group-hover:text-blue-400">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="font-medium">By {author}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

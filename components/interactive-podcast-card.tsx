"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Headphones, Mic, Pause } from "lucide-react"
import { PodcastCardSkeleton } from "@/components/ui/podcast-card-skeleton"
import { LoadingDots } from "@/components/ui/loading-dots"

interface PodcastProps {
  image: string
  category: string
  categoryColor: string
  title: string
  description: string
  duration: string
  date: string
}

export function InteractivePodcastCard({
  image,
  category,
  categoryColor,
  title,
  description,
  duration,
  date,
}: PodcastProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    if (isPlaying) {
      setIsPlaying(false)
      return
    }

    setIsLoading(true)
    // Simulate loading for demo purposes
    setTimeout(() => {
      setIsLoading(false)
      setIsPlaying(true)
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="relative">
        <PodcastCardSkeleton />
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingDots color="teal" size="md" />
        </div>
      </div>
    )
  }

  const categoryColorClass = categoryColor.replace("bg-", "text-")

  return (
    <Card className="overflow-hidden border-0 bg-[#0d2237] transition-all duration-300 hover-glow group">
      <div className="flex flex-col md:flex-row">
        <div className="relative h-48 md:h-auto md:w-1/3 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className={`object-cover transition-all duration-500 ${
              isPlaying ? "scale-105 brightness-110" : "group-hover:scale-105"
            }`}
          />
          {isPlaying && (
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent flex items-center justify-center">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-75"></div>
                <div className="relative bg-white/30 backdrop-blur-sm rounded-full w-full h-full flex items-center justify-center">
                  <div className="w-2 h-8 bg-white mx-0.5 animate-pulse"></div>
                  <div className="w-2 h-6 bg-white mx-0.5 animate-pulse animation-delay-200"></div>
                  <div className="w-2 h-10 bg-white mx-0.5 animate-pulse animation-delay-500"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <CardContent className="flex-1 p-6">
          <div className="mb-3 flex items-center gap-2">
            <Headphones className={`h-4 w-4 ${categoryColorClass}`} />
            <span className={`text-xs font-medium uppercase tracking-wider ${categoryColorClass}`}>{category}</span>
          </div>
          <h3 className="mb-3 text-2xl font-bold leading-tight transition-all duration-300 group-hover:text-blue-400">
            {title}
          </h3>
          <p className="mb-4 text-sm text-gray-400">{description}</p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="font-medium">{duration}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePlay}
            className={`mt-4 gap-2 ${
              isPlaying ? "text-teal-400 bg-teal-950/50" : "text-teal-400 hover:text-teal-300"
            } transition-all duration-300`}
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Mic className="h-4 w-4" />
                Listen Now
              </>
            )}
          </Button>
        </CardContent>
      </div>
    </Card>
  )
}

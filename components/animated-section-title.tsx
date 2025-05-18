"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedSectionTitleProps {
  title: string
  className?: string
}

export function AnimatedSectionTitle({ title, className }: AnimatedSectionTitleProps) {
  const [isVisible, setIsVisible] = useState(false)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (titleRef.current) {
      observer.observe(titleRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <h2
      ref={titleRef}
      className={cn(
        "text-5xl font-archivo font-extrabold tracking-tight uppercase relative",
        isVisible ? "opacity-100" : "opacity-0",
        "transition-opacity duration-1000",
        className,
      )}
    >
      {isVisible && (
        <>
          <span className="relative z-10">{title}</span>
          <span
            className="absolute bottom-0 left-0 h-1 bg-blue-600 transition-all duration-1000 ease-out"
            style={{ width: isVisible ? "40%" : "0" }}
          ></span>
        </>
      )}
    </h2>
  )
}

import type React from "react"
import { cn } from "@/lib/utils"

interface LoadingDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
  color?: "blue" | "teal" | "white"
}

export function LoadingDots({ size = "md", color = "blue", className, ...props }: LoadingDotsProps) {
  const dotSizes = {
    sm: "h-1 w-1",
    md: "h-2 w-2",
    lg: "h-3 w-3",
  }

  const dotColors = {
    blue: "bg-blue-500",
    teal: "bg-teal-500",
    white: "bg-white",
  }

  return (
    <div className={cn("flex items-center space-x-2", className)} {...props}>
      <div className={cn("animate-pulse rounded-full", dotSizes[size], dotColors[color])} />
      <div className={cn("animate-pulse rounded-full animation-delay-200", dotSizes[size], dotColors[color])} />
      <div className={cn("animate-pulse rounded-full animation-delay-500", dotSizes[size], dotColors[color])} />
    </div>
  )
}

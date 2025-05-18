import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { Article, Author } from "@/types/database"

interface PopularSectionProps {
  articles: (Article & {
    author: Author
    view_count: number
  })[]
}

export function PopularSection({ articles = [] }: PopularSectionProps) {
  // Fallback to default data if no articles are provided
  const popularArticles =
    articles.length > 0
      ? articles
      : ([
          {
            id: "1",
            title: "10 VS Code Extensions Every Developer Needs in 2025",
            image_url: "/images/popular-1.jpg",
            view_count: 24500,
            slug: "vs-code-extensions",
          },
          {
            id: "2",
            title: "Why TypeScript is Winning the Frontend Battle",
            image_url: "/images/popular-2.jpg",
            view_count: 18200,
            slug: "typescript-frontend",
          },
          {
            id: "3",
            title: "The Complete Guide to React Server Components",
            image_url: "/images/popular-3.jpg",
            view_count: 15700,
            slug: "react-server-components",
          },
          {
            id: "4",
            title: "Rust vs. Go: Which Should You Learn First?",
            image_url: "/images/popular-4.jpg",
            view_count: 12300,
            slug: "rust-vs-go",
          },
          {
            id: "5",
            title: "Building Microservices with Node.js and Docker",
            image_url: "/images/popular-5.jpg",
            view_count: 10100,
            slug: "microservices-nodejs-docker",
          },
        ] as any[])

  const formatViewCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K views`
    }
    return `${count} views`
  }

  return (
    <div className="sticky top-20">
      <div className="rounded-lg bg-[#0d2237] p-6">
        <h2 className="mb-6 text-3xl font-archivo font-bold tracking-tight">POPULAR NOW</h2>
        <div className="space-y-6">
          {popularArticles.map((article) => (
            <Link key={article.id} href={`/articles/${article.slug}`} className="group">
              <Card className="overflow-hidden border-0 bg-[#0a1929]/60 transition-all hover:bg-[#0a1929]/80">
                <div className="flex gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden">
                    <Image
                      src={article.image_url || "/placeholder.svg?height=80&width=80"}
                      alt={article.title}
                      fill
                      className="object-cover transition-all group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="flex-1 p-3">
                    <h3 className="text-sm font-bold leading-tight">{article.title}</h3>
                    <p className="mt-1 text-xs text-gray-400">{formatViewCount(article.view_count)}</p>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

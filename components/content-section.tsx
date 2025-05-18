import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface Article {
  image: string
  category: string
  categoryColor: string
  title: string
  author: string
  date: string
}

interface ContentSectionProps {
  title: string
  bgColor: string
  articles: Article[]
}

export function ContentSection({ title, bgColor, articles }: ContentSectionProps) {
  // Map the old bgColor to new tech-focused colors if it's one of our predefined ones
  const getBgColor = (color: string) => {
    switch (color) {
      case "bg-[#1a1a1a]":
        return "bg-[#0d2237]"
      case "bg-black":
        return "bg-[#0a1929]"
      case "bg-gradient-to-r from-purple-900 to-indigo-900":
        return "bg-gradient-to-r from-blue-900 to-indigo-800"
      default:
        return color // Keep custom colors as is
    }
  }

  return (
    <section className={`w-full ${getBgColor(bgColor)} py-16 mt-8`}>
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-5xl font-archivo font-bold tracking-tight">{title}</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <Link key={index} href="#" className="group">
              <Card className="overflow-hidden border-0 bg-[#0a1929]/60 backdrop-blur-sm transition-all hover:bg-[#0a1929]/80">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover transition-all group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div
                    className={`mb-3 inline-block rounded ${article.categoryColor} px-2 py-1 text-xs font-medium text-white`}
                  >
                    {article.category}
                  </div>
                  <h3 className="mb-3 text-2xl font-bold leading-tight">{article.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="font-medium">By {article.author}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

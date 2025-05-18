import type { Article, Author, Category } from "@/types/database"
import Image from "next/image"
import Link from "next/link"

interface SpotlightSectionProps {
  articles: (Article & {
    author: Author
    category: Category
  })[]
}

export function SpotlightSection({ articles }: SpotlightSectionProps) {
  // Fallback articles if none are provided
  const spotlightArticles =
    articles?.length > 0
      ? articles
      : ([
          {
            id: "1",
            title: "Bridgerton Season 4: Watch Benedict Fall for Sophie at First Sight",
            slug: "bridgerton-season-4",
            image_url: "/images/spotlight-1.jpg",
            category: { name: "NETFLIX", color: "bg-blue-600" },
            author: { name: "Emily Parker" },
            created_at: new Date().toISOString(),
          },
          {
            id: "2",
            title: "Netflix Tudum 2025: Everything Announced at the Global Fan Event",
            slug: "netflix-tudum-2025",
            image_url: "/images/spotlight-2.jpg",
            category: { name: "EVENTS", color: "bg-teal-600" },
            author: { name: "Michael Roberts" },
            created_at: new Date().toISOString(),
          },
          {
            id: "3",
            title: "Ted Danson Talks About A Man On the Inside, His Marriage, and More on Skip Intro",
            slug: "ted-danson-interview",
            image_url: "/images/spotlight-3.jpg",
            category: { name: "INTERVIEW", color: "bg-indigo-600" },
            author: { name: "Sarah Johnson" },
            created_at: new Date().toISOString(),
          },
        ] as any[])

  return (
    <section className="w-full bg-[#0a1929] py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-archivo font-extrabold tracking-tight uppercase mb-10 relative">
          SPOTLIGHT
          <span className="absolute -bottom-2 left-0 h-1 w-40 bg-blue-600"></span>
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {spotlightArticles.map((article: any) => (
            <Link key={article.id} href={`/articles/${article.slug}`} className="group">
              <div className="bg-[#0d2237] rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#0d2237]/80">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={article.image_url || "/placeholder.svg?height=300&width=400"}
                    alt={article.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3 text-xs font-medium uppercase tracking-wider text-blue-400">
                    {article.category?.name || "ARTICLE"}
                  </div>
                  <h3 className="text-xl font-bold leading-tight mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="font-medium">By {article.author?.name || "Unknown Author"}</span>
                    <span>•</span>
                    <span>{new Date(article.published_at || article.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

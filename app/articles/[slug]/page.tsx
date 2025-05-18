import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getArticleBySlug, trackArticleView } from "@/lib/api"
import Image from "next/image"
import { format } from "date-fns"
import { notFound } from "next/navigation"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  // Track article view
  await trackArticleView(article.id)

  const formattedDate = article.published_at
    ? format(new Date(article.published_at), "MMMM d, yyyy")
    : format(new Date(article.created_at), "MMMM d, yyyy")

  return (
    <>
      <Navbar />
      <main className="bg-[#0a1929]">
        <div className="container mx-auto px-4 py-8">
          <article className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div
                className={`inline-block rounded ${article.category?.color || "bg-blue-600"} px-3 py-1 text-xs font-medium uppercase tracking-wider text-white mb-4`}
              >
                {article.category?.name || "ARTICLE"}
              </div>
              <h1 className="text-4xl md:text-5xl font-archivo font-bold mb-4">{article.title}</h1>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  {article.author?.image_url && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={article.author.image_url || "/placeholder.svg"}
                        alt={article.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{article.author?.name || "Unknown Author"}</p>
                    {article.author?.role && <p className="text-sm text-gray-400">{article.author.role}</p>}
                  </div>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">{formattedDate}</span>
              </div>
            </div>

            <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
              <Image
                src={article.image_url || "/placeholder.svg?height=720&width=1280"}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="prose prose-lg prose-invert max-w-none">
              {/* Render the article content */}
              <div dangerouslySetInnerHTML={{ __html: article.content || "" }} />
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}

import Link from "next/link"
import { createServerClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Plus } from "lucide-react"

export default async function ArticlesAdminPage() {
  const supabase = createServerClient()

  const { data: articles, error } = await supabase
    .from("articles")
    .select(`
      *,
      category:categories(name),
      author:authors(name)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching articles:", error)
    return <div>Error loading articles</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Articles</h1>
        <Link href="/admin/articles/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Article
          </Button>
        </Link>
      </div>

      <div className="bg-[#0d2237] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1a3a5a]">
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Author</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b border-[#1a3a5a]">
                <td className="px-4 py-3">
                  <Link href={`/admin/articles/${article.id}`} className="hover:text-blue-400">
                    {article.title}
                  </Link>
                </td>
                <td className="px-4 py-3">{article.category?.name || "-"}</td>
                <td className="px-4 py-3">{article.author?.name || "-"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs ${
                      article.published ? "bg-green-900/50 text-green-400" : "bg-yellow-900/50 text-yellow-400"
                    }`}
                  >
                    {article.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {article.published_at
                    ? format(new Date(article.published_at), "MMM d, yyyy")
                    : format(new Date(article.created_at), "MMM d, yyyy")}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/articles/${article.id}`}>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                  No articles found. Create your first article.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

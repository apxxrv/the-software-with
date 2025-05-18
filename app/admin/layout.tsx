import type React from "react"
import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-[#0a1929]">
      <header className="bg-[#0d2237] border-b border-[#1a3a5a]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="text-2xl font-archivo font-bold">
              THE SOFTWARE WITH <span className="text-sm font-normal">Admin</span>
            </Link>
            <form action="/api/auth/signout" method="post">
              <Button variant="ghost" type="submit">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 shrink-0">
            <nav className="space-y-1">
              <Link href="/admin/articles">
                <Button variant="ghost" className="w-full justify-start">
                  Articles
                </Button>
              </Link>
              <Link href="/admin/podcasts">
                <Button variant="ghost" className="w-full justify-start">
                  Podcasts
                </Button>
              </Link>
              <Link href="/admin/authors">
                <Button variant="ghost" className="w-full justify-start">
                  Authors
                </Button>
              </Link>
              <Link href="/admin/categories">
                <Button variant="ghost" className="w-full justify-start">
                  Categories
                </Button>
              </Link>
              <Link href="/admin/tags">
                <Button variant="ghost" className="w-full justify-start">
                  Tags
                </Button>
              </Link>
              <Link href="/admin/events">
                <Button variant="ghost" className="w-full justify-start">
                  Events
                </Button>
              </Link>
            </nav>
          </aside>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  )
}

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { SpotlightSection } from "@/components/spotlight-section"
import { LatestNewsSection } from "@/components/latest-news-section"
import { PopularSection } from "@/components/popular-section"
import { CodeSnippetsSection } from "@/components/code-snippets-section"
import { Footer } from "@/components/footer"
import { getFeaturedArticles, getFeaturedPodcasts, getAuthors, getPopularArticles, getUpcomingEvents } from "@/lib/api"

export default async function Home() {
  // Fetch data from Supabase
  const featuredArticles = await getFeaturedArticles(3).catch(() => [])
  const featuredPodcasts = await getFeaturedPodcasts(2).catch(() => [])
  const authors = await getAuthors(6).catch(() => [])
  const popularArticles = await getPopularArticles(5).catch(() => [])
  const upcomingEvents = await getUpcomingEvents(3).catch(() => [])

  return (
    <main className="min-h-screen bg-[#0a1929]">
      <Navbar />
      <HeroSection article={featuredArticles[0]} />
      <SpotlightSection articles={featuredArticles} />
      <LatestNewsSection authors={authors} />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CodeSnippetsSection podcasts={featuredPodcasts} />
          </div>
          <div className="lg:col-span-1">
            <PopularSection articles={popularArticles} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

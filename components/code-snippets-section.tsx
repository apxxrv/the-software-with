"use client"

import { AnimatedSectionTitle } from "@/components/animated-section-title"
import { InteractivePodcastCard } from "@/components/interactive-podcast-card"
import { InteractiveArticleCard } from "@/components/interactive-article-card"
import { AnimatedNewsletter } from "@/components/animated-newsletter"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import Link from "next/link"

export function CodeSnippetsSection() {
  return (
    <>
      <section className="w-full py-16 mt-8">
        <div className="container mx-auto px-4">
          <AnimatedSectionTitle title="FEATURED PODCASTS" className="mb-10" />
          <div className="grid gap-8 sm:grid-cols-2">
            <InteractivePodcastCard
              image="/images/podcast-1.jpg"
              category="Latest Episode"
              categoryColor="bg-blue-500"
              title="The Tech Stack: Web Performance Deep Dive"
              description="Our panel discusses the latest techniques for optimizing web performance and improving Core Web Vitals."
              duration="45 min"
              date="May 15, 2025"
            />

            <InteractivePodcastCard
              image="/images/podcast-2.jpg"
              category="Interview"
              categoryColor="bg-teal-500"
              title="Future of Code: AI Pair Programming"
              description="An interview with GitHub's CTO on how AI is transforming the way developers write and review code."
              duration="38 min"
              date="May 12, 2025"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-16 mt-8">
        <div className="container mx-auto px-4">
          <AnimatedSectionTitle title="TRENDING TOPICS" className="mb-10" />
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {[
              { name: "AI & Machine Learning", color: "from-blue-800 to-blue-600" },
              { name: "Web Development", color: "from-teal-800 to-teal-600" },
              { name: "DevOps & Cloud", color: "from-indigo-800 to-indigo-600" },
              { name: "Cybersecurity", color: "from-cyan-800 to-cyan-600" },
            ].map((topic, index) => (
              <Link href="#" key={index} className="group">
                <Card
                  className={`overflow-hidden border-0 bg-gradient-to-br ${topic.color} transition-all duration-500 hover-lift relative`}
                >
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center h-40">
                    <TrendingUp className="h-8 w-8 mb-4 text-white/80 group-hover:text-white transition-colors duration-300" />
                    <h3 className="text-xl font-bold text-white">{topic.name}</h3>
                    <p className="mt-2 text-xs text-white/80">Trending articles and discussions</p>

                    {/* Animated highlight on hover */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/0 group-hover:bg-white/20 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 origin-left"></div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 mt-8">
        <div className="container mx-auto px-4">
          <AnimatedSectionTitle title="LATEST ARTICLES" className="mb-10" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <InteractiveArticleCard
              image="/images/spotlight-1.jpg"
              category="GUIDE"
              categoryColor="bg-blue-600"
              title="Mastering TypeScript: Advanced Type System Features"
              author="Alex Chen"
              date="May 17, 2025"
            />

            <InteractiveArticleCard
              image="/images/spotlight-2.jpg"
              category="INTERVIEW"
              categoryColor="bg-teal-600"
              title="Inside Vercel's Engineering Culture with Their Lead Architect"
              author="Emily Parker"
              date="May 16, 2025"
            />

            <InteractiveArticleCard
              image="/images/spotlight-3.jpg"
              category="ANALYSIS"
              categoryColor="bg-indigo-600"
              title="The State of Web Development in 2025: Trends and Predictions"
              author="Michael Roberts"
              date="May 15, 2025"
            />
          </div>
        </div>
      </section>

      <AnimatedNewsletter />
    </>
  )
}

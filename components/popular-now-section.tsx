import Image from "next/image"
import Link from "next/link"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"

export function PopularNowSection() {
  const popularArticles = [
    {
      image: "/placeholder.svg?height=300&width=400",
      title: "JavaScript",
      subtitle: "The language of the web",
    },
    {
      image: "/placeholder.svg?height=300&width=400",
      title: "Kubernetes",
      subtitle: "Container orchestration",
    },
    {
      image: "/placeholder.svg?height=300&width=400",
      title: "React",
      subtitle: "UI component library",
    },
    {
      image: "/placeholder.svg?height=300&width=400",
      title: "Web3",
      subtitle: "Decentralized applications",
    },
    {
      image: "/placeholder.svg?height=300&width=400",
      title: "DevOps",
      subtitle: "Development operations",
    },
    {
      image: "/placeholder.svg?height=300&width=400",
      title: "Cloud",
      subtitle: "Infrastructure as code",
    },
  ]

  return (
    <section className="w-full bg-zinc-900 py-12">
      <div className="container">
        <h2 className="mb-8 text-4xl font-bold tracking-tight">POPULAR NOW</h2>
        <ScrollArea className="w-full whitespace-nowrap pb-6">
          <div className="flex w-max space-x-4">
            {popularArticles.map((article, index) => (
              <Link key={index} href="#" className="group">
                <Card className="w-[200px] overflow-hidden bg-zinc-800 transition-all hover:bg-zinc-700">
                  <div className="relative h-[120px] w-full overflow-hidden">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover transition-all group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold">{article.title}</h3>
                    <p className="text-xs text-muted-foreground">{article.subtitle}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>
    </section>
  )
}

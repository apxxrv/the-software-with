import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

export function TagsBar() {
  const tags = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Kubernetes",
    "Docker",
    "AWS",
    "Web3",
    "DevOps",
    "Rust",
    "Go",
    "Python",
    "Machine Learning",
    "Databases",
    "GraphQL",
    "Serverless",
  ]

  return (
    <div className="w-full border-b border-border/40 bg-zinc-900">
      <div className="container py-2">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4 p-1">
            {tags.map((tag) => (
              <Button key={tag} variant="ghost" className="flex-shrink-0 rounded-full text-xs">
                {tag}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>
    </div>
  )
}

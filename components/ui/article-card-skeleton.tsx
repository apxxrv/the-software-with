import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function ArticleCardSkeleton() {
  return (
    <Card className="overflow-hidden border-0 bg-[#0d2237] transition-all">
      <div className="relative aspect-video overflow-hidden">
        <Skeleton className="absolute inset-0" />
      </div>
      <CardContent className="p-6">
        <Skeleton className="mb-3 h-6 w-24" />
        <Skeleton className="mb-3 h-8 w-full" />
        <Skeleton className="mb-3 h-8 w-3/4" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-32" />
        </div>
      </CardContent>
    </Card>
  )
}

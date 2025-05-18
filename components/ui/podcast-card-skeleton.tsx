import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function PodcastCardSkeleton() {
  return (
    <Card className="overflow-hidden border-0 bg-[#0d2237] transition-all">
      <div className="flex flex-col md:flex-row">
        <div className="relative h-48 md:h-auto md:w-1/3">
          <Skeleton className="absolute inset-0" />
        </div>
        <CardContent className="flex-1 p-6">
          <div className="mb-3 flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="mb-3 h-8 w-full" />
          <Skeleton className="mb-4 h-4 w-full" />
          <Skeleton className="mb-4 h-4 w-3/4" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="mt-4 h-8 w-28" />
        </CardContent>
      </div>
    </Card>
  )
}

import Link from "next/link"
import { Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a1929]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a1929]/60">
      {/* Top bar with hamburger, logo, and search */}
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Button variant="ghost" size="icon" className="text-white md:flex">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </Button>

          <Link href="/" className="flex flex-col items-center justify-center">
            <span className="text-3xl font-archivo font-extrabold tracking-tighter text-white uppercase">
              THE SOFTWARE
            </span>
            <span className="text-xs tracking-wider text-white/70 uppercase">WITH</span>
          </Link>

          <Button variant="ghost" size="icon" className="text-white">
            <Search className="h-6 w-6" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

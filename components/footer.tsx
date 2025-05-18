import Link from "next/link"
import { Github, Twitter, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#0a1929] py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <Link href="/" className="mb-6">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-archivo font-extrabold tracking-tighter text-white uppercase">
                THE SOFTWARE
              </span>
              <span className="text-xs tracking-wider text-white/70 uppercase">WITH</span>
            </div>
          </Link>
          <p className="mb-8 max-w-md text-center text-gray-400">
            Your source for the latest in tech news, interviews, deep dives, and coding tutorials.
          </p>
          <div className="mb-8 flex items-center justify-center space-x-6">
            <Link href="#" className="text-gray-400 hover:text-blue-400">
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-blue-400">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-blue-400">
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
          <nav className="mb-8 flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-400">
            <Link href="/about" className="hover:text-blue-400">
              About
            </Link>
            <Link href="/newsletter" className="hover:text-blue-400">
              Newsletter
            </Link>
            <Link href="/privacy" className="hover:text-blue-400">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-blue-400">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-blue-400">
              Contact
            </Link>
          </nav>
          <p className="text-center text-sm text-gray-500">© 2025 The Software With. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

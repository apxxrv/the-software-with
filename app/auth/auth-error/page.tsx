import { Metadata } from 'next'
import Link from 'next/link'
import { Icons } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Authentication Error',
  description: 'An error occurred during authentication',
}

export default function AuthErrorPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.spinner className="mx-auto h-12 w-12 animate-spin" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Authentication Error
        </h1>
        <p className="text-sm text-muted-foreground">
          There was a problem authenticating your account. This could be because:
        </p>
        <ul className="list-disc text-sm text-muted-foreground text-left">
          <li>The verification link has expired</li>
          <li>The verification link has already been used</li>
          <li>There was an error processing your request</li>
        </ul>
      </div>
      <div className="flex flex-col space-y-4">
        <Link
          href="/auth/signin"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  )
} 
import { revalidatePath } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

// This is a webhook that Sanity will call when content changes
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Verify the webhook is coming from Sanity
    // In production, you should validate the secret
    // if (body.secret !== process.env.SANITY_WEBHOOK_SECRET) {
    //   return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    // }

    // Get the document that was changed
    const { _type } = body

    // Revalidate the appropriate paths based on content type
    if (_type === "article") {
      revalidatePath("/articles/[slug]")
      revalidatePath("/")
    } else if (_type === "podcast") {
      revalidatePath("/podcasts/[slug]")
      revalidatePath("/")
    } else if (_type === "author") {
      revalidatePath("/authors/[slug]")
    }

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 })
  }
}

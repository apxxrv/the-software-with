import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase"

export default async function AdminPage() {
  const supabase = createServerClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/admin/login")
  }

  // Redirect to articles management
  redirect("/admin/articles")
}

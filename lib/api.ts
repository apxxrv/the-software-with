import { createServerClient } from "./supabase"
import type { Article, Podcast, Author, Category, Tag, Event } from "@/types/database"

// Articles
export async function getFeaturedArticles(limit = 3) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("articles")
    .select(`
      *,
      category:categories(*),
      author:authors(*)
    `)
    .eq("featured", true)
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching featured articles:", error)
    return []
  }

  return data as (Article & { category: Category; author: Author })[]
}

export async function getArticleBySlug(slug: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("articles")
    .select(`
      *,
      category:categories(*),
      author:authors(*),
      tags:article_tags(tag:tags(*))
    `)
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (error) {
    console.error("Error fetching article:", error)
    return null
  }

  // Transform the tags array to the expected format
  const transformedData = {
    ...data,
    tags: data.tags.map((tagJoin: any) => tagJoin.tag),
  }

  return transformedData as Article & {
    category: Category
    author: Author
    tags: Tag[]
  }
}

export async function getLatestArticles(limit = 6) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("articles")
    .select(`
      *,
      category:categories(*),
      author:authors(*)
    `)
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching latest articles:", error)
    return []
  }

  return data as (Article & { category: Category; author: Author })[]
}

// Podcasts
export async function getFeaturedPodcasts(limit = 2) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("podcasts")
    .select(`
      *,
      category:categories(*)
    `)
    .eq("featured", true)
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching featured podcasts:", error)
    return []
  }

  // Fetch hosts for each podcast
  for (const podcast of data) {
    const { data: hostsData, error: hostsError } = await supabase
      .from("podcast_hosts")
      .select(`
        author:authors(*)
      `)
      .eq("podcast_id", podcast.id)

    if (!hostsError && hostsData) {
      podcast.hosts = hostsData.map((hostJoin: any) => hostJoin.author)
    }
  }

  return data as (Podcast & { category: Category; hosts: Author[] })[]
}

export async function getPodcastBySlug(slug: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("podcasts")
    .select(`
      *,
      category:categories(*)
    `)
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (error) {
    console.error("Error fetching podcast:", error)
    return null
  }

  // Fetch hosts
  const { data: hostsData, error: hostsError } = await supabase
    .from("podcast_hosts")
    .select(`
      author:authors(*)
    `)
    .eq("podcast_id", data.id)

  if (!hostsError && hostsData) {
    data.hosts = hostsData.map((hostJoin: any) => hostJoin.author)
  }

  // Fetch guests
  const { data: guestsData, error: guestsError } = await supabase
    .from("podcast_guests")
    .select(`
      author:authors(*)
    `)
    .eq("podcast_id", data.id)

  if (!guestsError && guestsData) {
    data.guests = guestsData.map((guestJoin: any) => guestJoin.author)
  }

  return data as Podcast & {
    category: Category
    hosts: Author[]
    guests: Author[]
  }
}

// Authors
export async function getAuthors(limit = 10) {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("authors").select("*").order("name", { ascending: true }).limit(limit)

  if (error) {
    console.error("Error fetching authors:", error)
    return []
  }

  return data as Author[]
}

// Categories
export async function getCategories() {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("categories").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return data as Category[]
}

// Popular content
export async function getPopularArticles(limit = 5) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("popular_articles")
    .select(`
      *,
      article:articles(
        *,
        author:authors(*)
      )
    `)
    .order("view_count", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching popular articles:", error)
    return []
  }

  return data.map((item) => ({
    ...item.article,
    view_count: item.view_count,
  })) as (Article & { author: Author; view_count: number })[]
}

// Events
export async function getUpcomingEvents(limit = 3) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("events")
    .select(`
      *,
      category:categories(*)
    `)
    .eq("published", true)
    .gte("start_date", new Date().toISOString())
    .order("start_date", { ascending: true })
    .limit(limit)

  if (error) {
    console.error("Error fetching upcoming events:", error)
    return []
  }

  return data as (Event & { category: Category })[]
}

// Tags
export async function getTags() {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("tags").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching tags:", error)
    return []
  }

  return data as Tag[]
}

// Track article view
export async function trackArticleView(articleId: string) {
  const supabase = createServerClient()

  // Check if article exists in popular_articles
  const { data: existingData, error: checkError } = await supabase
    .from("popular_articles")
    .select("*")
    .eq("article_id", articleId)
    .single()

  if (checkError && checkError.code !== "PGRST116") {
    // PGRST116 is "not found" error
    console.error("Error checking article view:", checkError)
    return
  }

  if (existingData) {
    // Update existing record
    const { error: updateError } = await supabase
      .from("popular_articles")
      .update({
        view_count: existingData.view_count + 1,
        last_viewed_at: new Date().toISOString(),
      })
      .eq("id", existingData.id)

    if (updateError) {
      console.error("Error updating article view count:", updateError)
    }
  } else {
    // Create new record
    const { error: insertError } = await supabase.from("popular_articles").insert({
      article_id: articleId,
      view_count: 1,
    })

    if (insertError) {
      console.error("Error inserting article view count:", insertError)
    }
  }
}

export interface Category {
  id: string
  name: string
  slug: string
  color: string
  created_at: string
  updated_at: string
}

export interface Author {
  id: string
  name: string
  slug: string
  email?: string
  bio?: string
  role?: string
  image_url?: string
  twitter_handle?: string
  github_handle?: string
  created_at: string
  updated_at: string
}

export interface Tag {
  id: string
  name: string
  slug: string
  created_at: string
  updated_at: string
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: string
  featured: boolean
  published: boolean
  category_id?: string
  author_id?: string
  image_url?: string
  published_at?: string
  created_at: string
  updated_at: string

  // Join fields
  category?: Category
  author?: Author
  tags?: Tag[]
}

export interface Podcast {
  id: string
  title: string
  slug: string
  description?: string
  featured: boolean
  published: boolean
  category_id?: string
  image_url?: string
  audio_url?: string
  duration?: string
  transcript?: string
  published_at?: string
  created_at: string
  updated_at: string

  // Join fields
  category?: Category
  hosts?: Author[]
  guests?: Author[]
  tags?: Tag[]
}

export interface Event {
  id: string
  title: string
  slug: string
  description?: string
  location?: string
  start_date?: string
  end_date?: string
  image_url?: string
  url?: string
  featured: boolean
  published: boolean
  category_id?: string
  created_at: string
  updated_at: string

  // Join fields
  category?: Category
}

export interface PopularArticle {
  id: string
  article_id: string
  view_count: number
  last_viewed_at: string

  // Join fields
  article?: Article
}

export interface PopularPodcast {
  id: string
  podcast_id: string
  view_count: number
  last_viewed_at: string

  // Join fields
  podcast?: Podcast
}

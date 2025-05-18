// Queries for fetching data from Sanity

export const articlesQuery = `
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    categoryColor,
    "author": author->name,
    mainImage,
    publishedAt,
    excerpt
  }
`

export const featuredArticlesQuery = `
  *[_type == "article" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    category,
    categoryColor,
    "author": author->name,
    mainImage,
    publishedAt,
    excerpt
  }
`

export const articleBySlugQuery = `
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    categoryColor,
    "author": author->{name, image, bio, role},
    mainImage,
    publishedAt,
    body,
    excerpt
  }
`

export const podcastsQuery = `
  *[_type == "podcast"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    categoryColor,
    description,
    duration,
    publishedAt,
    image,
    audioFile
  }
`

export const featuredPodcastsQuery = `
  *[_type == "podcast" && featured == true] | order(publishedAt desc)[0...2] {
    _id,
    title,
    slug,
    category,
    categoryColor,
    description,
    duration,
    publishedAt,
    image,
    audioFile
  }
`

export const authorsQuery = `
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    slug,
    image,
    role
  }
`

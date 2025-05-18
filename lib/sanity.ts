import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  apiVersion: "2023-05-03",
  useCdn: process.env.NODE_ENV === "production",
}

// Set up the client for fetching data
export const sanityClient = createClient(config)

// Helper function for generating image URLs
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

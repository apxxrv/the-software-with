import { sanityClient, urlFor } from "@/lib/sanity"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Play, Download } from "lucide-react"
import { PortableText } from "@portabletext/react"

interface PodcastPageProps {
  params: {
    slug: string
  }
}

export default async function PodcastPage({ params }: PodcastPageProps) {
  const podcast = await sanityClient.fetch(
    `
    *[_type == "podcast" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      category,
      categoryColor,
      description,
      duration,
      publishedAt,
      image,
      audioFile,
      "hosts": hosts[]->{ name, image, role },
      "guests": guests[]->{ name, image, role },
      transcript
    }
  `,
    {
      slug: params.slug,
    },
  )

  if (!podcast) {
    return <div>Podcast not found</div>
  }

  const formattedDate = podcast.publishedAt ? format(new Date(podcast.publishedAt), "MMMM d, yyyy") : ""

  return (
    <>
      <Navbar />
      <main className="bg-[#0a1929]">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div
                className={`inline-block rounded ${podcast.categoryColor} px-3 py-1 text-xs font-medium uppercase tracking-wider text-white mb-4`}
              >
                {podcast.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-archivo font-bold mb-4">{podcast.title}</h1>
              <p className="text-xl text-gray-300 mb-6">{podcast.description}</p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{podcast.duration}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">{formattedDate}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="md:w-1/3">
                <div className="relative aspect-square w-full rounded-lg overflow-hidden">
                  <Image
                    src={urlFor(podcast.image).url() || "/placeholder.svg"}
                    alt={podcast.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="md:w-2/3">
                <div className="bg-[#0d2237] rounded-lg p-6 mb-6">
                  <h2 className="text-2xl font-bold mb-4">Listen Now</h2>
                  <div className="bg-[#081724] rounded-lg p-4 mb-4">
                    <audio controls className="w-full">
                      <source src={podcast.audioFile.url} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                  <div className="flex gap-4">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Play className="h-4 w-4 mr-2" />
                      Play
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                {(podcast.hosts?.length > 0 || podcast.guests?.length > 0) && (
                  <div className="bg-[#0d2237] rounded-lg p-6">
                    {podcast.hosts?.length > 0 && (
                      <div className="mb-6">
                        <h2 className="text-xl font-bold mb-4">Hosts</h2>
                        <div className="flex flex-wrap gap-4">
                          {podcast.hosts.map((host: any) => (
                            <div key={host._id} className="flex items-center gap-3">
                              {host.image && (
                                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                  <Image
                                    src={urlFor(host.image).url() || "/placeholder.svg"}
                                    alt={host.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div>
                                <p className="font-medium">{host.name}</p>
                                {host.role && <p className="text-sm text-gray-400">{host.role}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {podcast.guests?.length > 0 && (
                      <div>
                        <h2 className="text-xl font-bold mb-4">Guests</h2>
                        <div className="flex flex-wrap gap-4">
                          {podcast.guests.map((guest: any) => (
                            <div key={guest._id} className="flex items-center gap-3">
                              {guest.image && (
                                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                  <Image
                                    src={urlFor(guest.image).url() || "/placeholder.svg"}
                                    alt={guest.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div>
                                <p className="font-medium">{guest.name}</p>
                                {guest.role && <p className="text-sm text-gray-400">{guest.role}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {podcast.transcript && (
              <div className="bg-[#0d2237] rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Transcript</h2>
                <div className="prose prose-invert max-w-none">
                  <PortableText value={podcast.transcript} />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

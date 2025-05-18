"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { AnimatedSectionTitle } from "@/components/animated-section-title"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LatestNewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft)
      setMaxScroll(scrollRef.current.scrollWidth - scrollRef.current.clientWidth)
    }
  }

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const techPersonalities = [
    {
      image: "/images/person-1.jpg",
      name: "Ada Lovelace",
      role: "AI Researcher",
    },
    {
      image: "/images/person-2.jpg",
      name: "Alan Turing",
      role: "Computer Scientist",
    },
    {
      image: "/images/person-3.jpg",
      name: "Grace Hopper",
      role: "Software Engineer",
    },
    {
      image: "/images/person-4.jpg",
      name: "Tim Berners-Lee",
      role: "Web Inventor",
    },
    {
      image: "/images/person-5.jpg",
      name: "Linus Torvalds",
      role: "Open Source Developer",
    },
    {
      image: "/images/person-6.jpg",
      name: "Margaret Hamilton",
      role: "Software Pioneer",
    },
  ]

  return (
    <section className="w-full bg-gradient-to-r from-teal-800 to-teal-600 py-16 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <AnimatedSectionTitle title="LATEST NEWS" className="text-white" />

          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollLeft}
              disabled={scrollPosition <= 10}
              className="rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Scroll left</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollRight}
              disabled={scrollPosition >= maxScroll - 10}
              className="rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Scroll right</span>
            </Button>
          </div>
        </div>

        <ScrollArea className="w-full pb-6" onScroll={handleScroll} ref={scrollRef}>
          <div className="flex w-max space-x-6">
            {techPersonalities.map((person, index) => (
              <Link key={index} href="#" className="group">
                <div className="w-[220px] overflow-hidden transition-all duration-300 hover-lift">
                  <div className="relative h-[220px] w-full overflow-hidden rounded-lg">
                    <Image
                      src={person.image || "/placeholder.svg"}
                      alt={person.name}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-xl font-bold text-white transition-all duration-300 group-hover:text-teal-200">
                      {person.name}
                    </h3>
                    <p className="text-sm text-white/80">{person.role}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>
    </section>
  )
}

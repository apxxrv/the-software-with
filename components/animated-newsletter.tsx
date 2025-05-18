"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Check } from "lucide-react"
import { LoadingDots } from "@/components/ui/loading-dots"

export function AnimatedNewsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubscribed(true)
    }, 1500)
  }

  return (
    <section className="w-full bg-gradient-to-r from-blue-900 to-indigo-800 py-16 mt-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 -right-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl animate-pulse animation-delay-500"></div>
        <div className="absolute -bottom-20 left-1/3 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl animate-pulse animation-delay-700"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-archivo font-extrabold tracking-tight uppercase text-white mb-4 slide-up">
              STAY IN THE LOOP
            </h2>
            <p className="text-lg text-white/90 mb-6 slide-up animation-delay-200">
              Subscribe to our daily newsletter and never miss the latest in tech news, interviews, and podcasts.
            </p>

            {isSubscribed ? (
              <div className="bg-teal-900/30 backdrop-blur-sm rounded-lg p-4 border border-teal-500/30 flex items-center gap-3 fade-in">
                <div className="bg-teal-500 rounded-full p-1">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <p className="text-white">Thanks for subscribing! Check your email to confirm your subscription.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="slide-up animation-delay-500">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 h-12 transition-all duration-300 focus:bg-white/30 focus:border-white/50"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-teal-600 text-white hover:bg-teal-700 h-12 px-6 uppercase tracking-wider font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(20,184,166,0.5)]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <LoadingDots color="white" size="sm" />
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Subscribe
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-white/70 mt-3">
                  By subscribing, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            )}
          </div>
          <div className="md:w-1/3 flex justify-center slide-in-right">
            <div className="relative w-64 h-64 transition-all duration-500 hover:scale-105 hover:rotate-2">
              <Image
                src="/images/newsletter-image.jpg"
                alt="Newsletter"
                fill
                className="object-cover rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 rounded-lg shadow-[0_0_30px_rgba(59,130,246,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

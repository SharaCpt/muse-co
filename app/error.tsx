'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <main className="min-h-screen bg-deep-black flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-4 uppercase">
          Something Went Wrong
        </p>
        <h1 className="font-playfair text-6xl md:text-7xl text-champagne-gold mb-6 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
          Oops
        </h1>
        <p className="text-off-white/70 text-lg mb-10 leading-relaxed">
          We encountered an unexpected error. Please try again or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-10 py-4 bg-champagne-gold text-deep-black font-inter tracking-[0.15em] hover:bg-champagne-gold/90 transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.3)] text-sm uppercase"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-10 py-4 border-2 border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-deep-black transition-all duration-300 tracking-[0.15em] text-sm uppercase"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  )
}

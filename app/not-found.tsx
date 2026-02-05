import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-deep-black flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-4 uppercase">
          Page Not Found
        </p>
        <h1 className="font-playfair text-8xl md:text-9xl text-champagne-gold mb-6 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
          404
        </h1>
        <p className="text-off-white/70 text-lg mb-10 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-10 py-4 bg-champagne-gold text-deep-black font-inter tracking-[0.15em] hover:bg-champagne-gold/90 transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.3)] text-sm uppercase"
          >
            Return Home
          </Link>
          <Link
            href="/contact"
            className="px-10 py-4 border-2 border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-deep-black transition-all duration-300 tracking-[0.15em] text-sm uppercase"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-deep-black flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-2 border-champagne-gold/30 border-t-champagne-gold rounded-full animate-spin mb-6" />
        <p className="text-champagne-gold/70 text-sm tracking-[0.3em] uppercase animate-pulse">
          Loading
        </p>
      </div>
    </div>
  )
}

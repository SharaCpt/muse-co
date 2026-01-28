'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface PortfolioImage {
  id: string
  name: string
  category: string
  description: string
  image_url: string
  display_order: number
}

// Reliable header image - the stunning emerald aesthetic everyone loves
const HEADER_IMAGE = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000'

export default function PortfolioPage() {
  const [filter, setFilter] = useState('all')
  const [models, setModels] = useState<PortfolioImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPortfolioImages()
  }, [])

  async function fetchPortfolioImages() {
    try {
      const { data, error } = await supabase
        .from('portfolio_images')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })

      if (error) throw error
      setModels(data || [])
    } catch (error) {
      console.error('Error loading portfolio:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredModels = filter === 'all' 
    ? models 
    : models.filter(m => m.category.toLowerCase() === filter.toLowerCase())

  const categories = ['all', ...Array.from(new Set(models.map(m => m.category)))]

  return (
    <main className="bg-deep-black pt-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={HEADER_IMAGE}
            alt="Elite Portfolio"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-deep-black/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-transparent to-deep-black" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <p className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-4 uppercase">Curated Excellence</p>
          <h1 className="font-playfair text-6xl md:text-8xl tracking-[0.2em] text-champagne-gold mb-6 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            PORTFOLIO
          </h1>
          <p className="text-off-white/80 text-lg md:text-xl tracking-wide mb-8">
            Elite Lifestyle Models • VIP Hostesses • Brand Ambassadors
          </p>
          <p className="text-off-white/60 max-w-2xl mx-auto">
            Handpicked professionals for luxury brand launches, VIP events, and exclusive private experiences across Cape Town
          </p>
        </motion.div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 px-6 bg-charcoal/50 sticky top-20 z-20 backdrop-blur-md border-b border-champagne-gold/10">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4"
          >
            {categories.map((cat, index) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => setFilter(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2.5 text-sm tracking-[0.15em] uppercase transition-all duration-300 rounded-sm ${
                  filter === cat
                    ? 'bg-champagne-gold text-deep-black shadow-[0_0_25px_rgba(212,175,55,0.5)] font-medium'
                    : 'bg-transparent text-off-white/60 border border-champagne-gold/20 hover:border-champagne-gold/60 hover:text-champagne-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid - Masonry Style */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center text-champagne-gold py-20">
              <p>Loading portfolio...</p>
            </div>
          ) : filteredModels.length === 0 ? (
            <div className="text-center text-off-white/60 py-20">
              <p>No images yet. Upload photos in the admin dashboard.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModels.map((model, index) => (
                <ModelCard key={model.id} model={model} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Inquiry Section */}
      <section className="py-32 px-6 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05),transparent_70%)]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="font-playfair text-4xl md:text-5xl text-champagne-gold mb-4 tracking-wide drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              Request Our Full Portfolio
            </h2>
            <p className="text-off-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
              For privacy and exclusivity, detailed profiles are shared directly with serious inquiries only. 
              Contact us to discuss your brand launch, VIP event, or exclusive staffing requirements.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
              <a
                href="https://wa.me/27607769793"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-12 py-5 bg-champagne-gold text-deep-black font-inter tracking-[0.15em] hover:bg-champagne-gold/90 transition-all duration-300 text-lg shadow-[0_0_50px_rgba(212,175,55,0.4)] hover:shadow-[0_0_70px_rgba(212,175,55,0.6)] relative overflow-hidden"
              >
                <span className="relative z-10">WHATSAPP INQUIRY</span>
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                  style={{ opacity: 0.15 }}
                />
              </a>
              <a
                href="/contact"
                className="px-12 py-5 border-2 border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-deep-black transition-all duration-300 tracking-[0.15em] text-lg shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)]"
              >
                CONTACT FORM
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

function ModelCard({ model, index }: { model: PortfolioImage; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden h-[500px] shadow-[0_10px_60px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_80px_rgba(212,175,55,0.25)] transition-all duration-500 rounded-sm"
    >
      {/* Image */}
      <div className="relative w-full h-full overflow-hidden">
        <motion.div
          className="relative w-full h-full"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Image
            src={model.image_url}
            alt={model.name}
            fill
            className="object-cover"
          />
        </motion.div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
        
        {/* Gold overlay on hover */}
        <div className="absolute inset-0 bg-champagne-gold/0 group-hover:bg-champagne-gold/5 transition-all duration-500" />
        
        {/* Border Animation */}
        <motion.div 
          className="absolute inset-0 border-2 border-champagne-gold/0 group-hover:border-champagne-gold/50 transition-all duration-500 rounded-sm"
          initial={false}
        />
        
        {/* Corner accents on hover */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-champagne-gold/0 group-hover:border-champagne-gold/60 transition-all duration-500" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-champagne-gold/0 group-hover:border-champagne-gold/60 transition-all duration-500" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <div className="space-y-2">
            <motion.div 
              className="w-12 h-[2px] bg-champagne-gold mb-3 origin-left"
              initial={{ scaleX: 1 }}
              whileHover={{ scaleX: 2 }}
              transition={{ duration: 0.5 }}
            />
            <p className="text-champagne-gold text-sm tracking-[0.2em] uppercase font-light drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
              {model.category}
            </p>
            <p className="text-off-white text-base font-semibold">
              {model.name}
            </p>
            {model.description && (
              <p className="text-off-white/60 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {model.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

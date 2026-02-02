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
  age: number | null
  height: number | null
  weight: number | null
}

interface SiteContent {
  id: string
  content: string
}

// Default header image - using actual header to prevent flash
const DEFAULT_HEADER = 'https://images.unsplash.com/photo-1628336358317-0582bfa7519d?q=100&w=2400&auto=format&fit=crop&ixlib=rb-4.1.0'

export default function PortfolioPage() {
  const [headerImage, setHeaderImage] = useState<string>(DEFAULT_HEADER)
  const [filter, setFilter] = useState('all')
  const [models, setModels] = useState<PortfolioImage[]>([])
  const [loading, setLoading] = useState(true)
  
  // Editable content with defaults
  const [content, setContent] = useState({
    intro: 'Handpicked professionals for luxury events, sophisticated gatherings, and exclusive private experiences across Cape Town',
  })

  useEffect(() => {
    fetchPortfolioImages()
    fetchHeaderImage()
    fetchContent()
  }, [])

  async function fetchContent() {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('id', 'portfolio_intro')
        .single()

      if (data?.content) {
        setContent({ intro: data.content })
      }
    } catch (error) {
      // Use default
    }
  }

  async function fetchHeaderImage() {
    // Header image is hardcoded - no database fetch to prevent flash
    return
  }
      }
    } catch (error) {
      // Keep default on error
    }
  }

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
        <div className="absolute inset-0 z-0 bg-charcoal">
          <Image
            src={headerImage}
            alt="Elite Portfolio"
            fill
            className="object-cover"
            priority
            unoptimized
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBQYSIRMxQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABsRAAICAwEAAAAAAAAAAAAAAAECABEDBCFB/9oADAMBAAIRAxEAPwCvp+4b2C8v1j0+GSNGVFeZikhBGckKOIP0HNVk3nq7Rq76RCrkAlBKSoP4D60pVB3ZAVpz1EPZ/9k="
          />
          <div className="absolute inset-0 bg-deep-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-black/30 via-transparent to-deep-black" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <p className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-4 uppercase">Curated Excellence</p>
          <h1 className="font-playfair text-5xl md:text-7xl tracking-[0.15em] text-champagne-gold mb-6 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            PORTFOLIO
          </h1>
          <p className="text-off-white/80 text-lg md:text-xl tracking-wide mb-8">
            Elite Lifestyle Models • VIP Hostesses • Private Companions
          </p>
          <p className="text-off-white/60 max-w-2xl mx-auto">
            {content.intro}
          </p>
        </motion.div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 px-6 bg-charcoal/50 sticky top-20 z-20 backdrop-blur-md border-b border-champagne-gold/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 text-sm tracking-[0.15em] uppercase transition-all duration-300 ${
                  filter === cat
                    ? 'bg-champagne-gold text-deep-black shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                    : 'bg-transparent text-off-white/60 border border-champagne-gold/20 hover:border-champagne-gold/60 hover:text-champagne-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
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
              Contact us to discuss your exclusive companion preferences and bespoke arrangements.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
              <a
                href="https://wa.me/27607769793"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-12 py-5 bg-champagne-gold text-deep-black font-inter tracking-[0.15em] hover:bg-champagne-gold/90 transition-all duration-300 text-lg shadow-[0_0_50px_rgba(212,175,55,0.4)] hover:shadow-[0_0_70px_rgba(212,175,55,0.6)] relative overflow-hidden"
              >
                <span className="relative z-10">MESSAGE US</span>
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative overflow-hidden h-[500px] shadow-[0_10px_60px_rgba(0,0,0,0.8)] hover:shadow-[0_15px_80px_rgba(212,175,55,0.3)] transition-all duration-500"
    >
      {/* Image */}
      <div className="relative w-full h-full">
        <Image
          src={model.image_url}
          alt={model.name}
          fill
          unoptimized
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
        
        {/* Border Animation */}
        <div className="absolute inset-0 border-2 border-champagne-gold/0 group-hover:border-champagne-gold/40 transition-all duration-500" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-0 group-hover:translate-y-0 transition-transform duration-500">
          <div className="space-y-2">
            <div className="w-12 h-[1px] bg-champagne-gold mb-3 group-hover:w-24 transition-all duration-500" />
            <p className="text-champagne-gold text-sm tracking-[0.2em] uppercase font-light">
              {model.category}
            </p>
            <p className="text-off-white text-base font-semibold">
              {model.name}
            </p>
            {/* Stats Row */}
            {(model.age || model.height || model.weight) && (
              <div className="flex gap-3 text-off-white/70 text-sm pt-1">
                {model.age && <span>{model.age} years</span>}
                {model.height && <span>{model.height}cm</span>}
                {model.weight && <span>{model.weight}kg</span>}
              </div>
            )}
            {model.description && (
              <p className="text-off-white/60 text-xs pt-1">
                {model.description}
              </p>
            )}
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-champagne-gold/0 group-hover:bg-champagne-gold/5 transition-all duration-500 pointer-events-none" />
      </div>
    </motion.div>
  )
}

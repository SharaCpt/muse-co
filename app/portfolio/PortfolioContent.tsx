'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Lock, LockOpen } from 'lucide-react'
import CTAButton from '@/components/CTAButton'
import {
  heroVariants,
  heroFadeIn,
  heroStagger,
  sectionVariants,
  cardVariants,
  viewportOnce,
} from '@/lib/motion'
import { BLUR_DATA_URL, SIZES } from '@/lib/image-utils'

const DEFAULT_HEADER = 'https://images.unsplash.com/photo-1628336358317-0582bfa7519d?q=100&w=2400&auto=format&fit=crop&ixlib=rb-4.1.0'

interface PortfolioImage {
  id: string
  name: string
  slug: string | null
  category: string
  description: string
  image_url: string
  display_order: number
  age: number | null
  height: number | null
  weight: number | null
}

interface PortfolioContentProps {
  models: PortfolioImage[]
  content: {
    intro: string
  }
}

export default function PortfolioContent({ models, content }: PortfolioContentProps) {
  const [filter, setFilter] = useState('all')

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
            src={DEFAULT_HEADER}
            alt="Elite model portfolio — luxury companions Cape Town Johannesburg South Africa"
            fill
            className="object-cover"
            priority
            sizes={SIZES.hero}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
          <div className="absolute inset-0 bg-deep-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-black/30 via-transparent to-deep-black" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <motion.p variants={heroFadeIn} custom={heroStagger.label} className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-4 uppercase">Curated Excellence</motion.p>
          <motion.h1
            variants={heroVariants}
            custom={heroStagger.title}
            className="font-playfair text-5xl md:text-7xl tracking-[0.15em] text-champagne-gold mb-6 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            PORTFOLIO
          </motion.h1>
          <motion.p variants={heroFadeIn} custom={heroStagger.tagline} className="text-off-white/80 text-lg md:text-xl tracking-wide mb-4">
            Elite Models &amp; Luxury Companions — South Africa
          </motion.p>
          <motion.p variants={heroFadeIn} custom={heroStagger.subtitle} className="text-off-white/50 text-sm tracking-widest mb-6">
            CAPE TOWN • JOHANNESBURG • DURBAN • NATIONWIDE
          </motion.p>
          <motion.p variants={heroFadeIn} custom={heroStagger.cta} className="text-off-white/60 max-w-2xl mx-auto">
            {content.intro}
          </motion.p>
        </motion.div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 px-6 bg-charcoal/50 sticky top-[72px] z-20 backdrop-blur-md border-b border-champagne-gold/10">
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

      {/* Portfolio Grid */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {filteredModels.length === 0 ? (
              <div className="text-center text-off-white/60 py-20">
                <p>No models available at this time. Please check back soon.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredModels.map((model, index) => (
                  <ModelCard key={model.id} model={model} index={index} />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Inquiry Section — the vault: tap to unlock, reinforcing exclusivity/discretion */}
      <section className="py-32 px-6 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05),transparent_70%)]" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <VaultCard />
          </motion.div>
        </div>
      </section>
    </main>
  )
}

function VaultCard() {
  const [unlocked, setUnlocked] = useState(false)

  return (
    <div className="relative overflow-hidden rounded-2xl border border-champagne-gold/30 bg-gradient-to-br from-deep-black via-charcoal to-deep-black p-10 md:p-14 text-center">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-champagne-gold/60 to-transparent" />

      <button
        type="button"
        onClick={() => setUnlocked(true)}
        disabled={unlocked}
        aria-label="Unlock the full portfolio"
        className="group relative mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border-2 border-champagne-gold/50 transition-all duration-500 disabled:cursor-default"
      >
        <motion.div
          animate={unlocked ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {unlocked ? (
              <motion.div
                key="open"
                initial={{ opacity: 0, rotate: -20 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <LockOpen className="w-8 h-8 text-champagne-gold" strokeWidth={1.5} />
              </motion.div>
            ) : (
              <motion.div
                key="closed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, rotate: 20 }}
                transition={{ duration: 0.3 }}
                className="group-hover:scale-110 transition-transform duration-300"
              >
                <Lock className="w-8 h-8 text-champagne-gold" strokeWidth={1.5} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        {!unlocked && (
          <motion.span
            className="absolute inset-0 rounded-full border border-champagne-gold/30"
            animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </button>

      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div
            key="locked"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-playfair text-3xl md:text-4xl text-champagne-gold mb-4 tracking-wide">
              Request Our Full Portfolio
            </h2>
            <p className="text-off-white/70 text-lg leading-relaxed max-w-xl mx-auto mb-8">
              For privacy and exclusivity, detailed profiles are shared directly with serious inquiries only.
              Tap to unlock.
            </p>
            <p className="text-champagne-gold/60 text-xs tracking-[0.3em] uppercase">Tap to Unlock</p>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h2 className="font-playfair text-3xl md:text-4xl text-champagne-gold mb-4 tracking-wide">
              Welcome
            </h2>
            <p className="text-off-white/70 text-lg leading-relaxed max-w-xl mx-auto mb-4">
              Contact us to discuss your exclusive companion preferences and bespoke arrangements — full profiles shared directly, discreetly.
            </p>
            <p className="text-off-white/50 text-sm mb-8">
              Discover our <Link href="/services" className="text-champagne-gold hover:underline">full range of services</Link> or review our <Link href="/pricing" className="text-champagne-gold hover:underline">transparent pricing</Link> before reaching out.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton href="https://wa.me/27607769793?text=Hi%20Shara!%20I%20found%20you%20on%20the%20MUSE%20%26%20CO%20website.%20I%27d%20like%20to%20inquire%20about%20your%20portfolio%20and%20services." variant="primary">Message Us</CTAButton>
              <CTAButton href="/contact" variant="secondary">Contact Us</CTAButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ModelCard({ model, index }: { model: PortfolioImage; index: number }) {
  const href = `/portfolio/${model.slug || model.id}`
  
  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <Link
        href={href}
        className="group relative overflow-hidden h-[500px] block shadow-[0_10px_60px_rgba(0,0,0,0.8)] hover:shadow-[0_15px_80px_rgba(212,175,55,0.3)] transition-all duration-500"
      >
      {/* Image */}
      <div className="relative w-full h-full">
        <Image
          src={model.image_url}
          alt={model.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes={SIZES.threeCol}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
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
      </Link>
    </motion.div>
  )
}

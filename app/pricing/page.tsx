'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function PricingPage() {
  const [headerImage, setHeaderImage] = useState('https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2000')
  const [pricingRates, setPricingRates] = useState<any[]>([])
  const [bespokeExperiences, setBespokeExperiences] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHeaderImage()
    fetchPricingData()
  }, [])

  async function fetchHeaderImage() {
    try {
      const { data, error } = await supabase
        .from('page_headers')
        .select('image_url')
        .eq('page_name', 'pricing')
        .single()

      if (error) throw error
      if (data) setHeaderImage(data.image_url)
    } catch (error) {
      console.error('Error fetching header:', error)
    }
  }

  async function fetchPricingData() {
    try {
      // Fetch pricing rates
      const { data: rates, error: ratesError } = await supabase
        .from('pricing_rates')
        .select('*')
        .order('display_order', { ascending: true })

      if (ratesError) throw ratesError

      // Fetch bespoke experiences
      const { data: experiences, error: experiencesError } = await supabase
        .from('bespoke_experiences')
        .select('*')
        .order('display_order', { ascending: true })

      if (experiencesError) throw experiencesError

      setPricingRates(rates || [])
      setBespokeExperiences(experiences || [])
    } catch (error) {
      console.error('Error fetching pricing:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-deep-black pt-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={headerImage}
            alt="Luxury Companion Pricing - Elite Escort Rates Cape Town"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-deep-black/60 to-deep-black" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 z-[1]">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-champagne-gold/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.7, 0.2],
              }}
              transition={{
                duration: 2.5 + Math.random() * 2.5,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-champagne-gold/80 text-sm tracking-[0.3em] mb-6 uppercase font-light"
          >
            Curated Experiences
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-playfair text-6xl md:text-8xl tracking-[0.15em] text-off-white mb-8 luxury-text-shadow"
          >
            PRICING
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-off-white/80 text-lg md:text-xl leading-relaxed font-light"
          >
            Elite professionals and bespoke luxury experiences curated worldwide.<br className="hidden md:block" />
            From intimate events to international brand activations. Luxury, discretion, excellence.
          </motion.p>
        </motion.div>
      </section>

      {/* Standard Pricing Rates */}
      <section className="py-32 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-playfair text-4xl md:text-6xl text-champagne-gold mb-6 tracking-wider">
              STANDARD RATES
            </h2>
            <p className="text-off-white/70 text-lg max-w-2xl mx-auto font-light">
              Transparent pricing for exclusive model bookings and VIP staffing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingRates.map((rate, index) => (
              <PricingCard key={index} rate={rate} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke Experiences */}
      <section className="py-32 px-6 md:px-12 relative bg-gradient-to-b from-deep-black to-charcoal/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-playfair text-4xl md:text-6xl text-champagne-gold mb-6 tracking-wider">
              BESPOKE EXPERIENCES
            </h2>
            <p className="text-off-white/70 text-lg max-w-3xl mx-auto font-light leading-relaxed">
              Curated luxury packages featuring elite travel, yacht charters, safari adventures,<br className="hidden md:block" />
              and unforgettable experiences with South Africa's finest companions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {bespokeExperiences.map((experience, index) => (
              <BespokeCard key={index} experience={experience} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-deep-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000"
            alt="Luxury background"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="font-playfair text-4xl md:text-6xl text-champagne-gold">
              Ready for an unforgettable experience?
            </h2>
            <p className="text-off-white/80 text-lg md:text-xl leading-relaxed font-light">
              Contact us for a private consultation and bespoke package tailored to your vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6">
              <Link
                href="/contact"
                className="group relative px-12 py-5 bg-champagne-gold text-deep-black font-inter tracking-[0.15em] hover:bg-champagne-gold/90 transition-all duration-300 overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.6)]"
              >
                <span className="relative z-10">BOOK CONSULTATION</span>
              </Link>
              
              <a
                href="https://wa.me/+27607769793"
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-5 border-2 border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-deep-black transition-all duration-300 tracking-[0.15em]"
              >
                WHATSAPP US
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

function PricingCard({ rate, index }: { rate: typeof pricingRates[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative h-full"
    >
      {/* Glass morphism card with enhanced effects */}
      <div className="relative h-full bg-gradient-to-br from-charcoal/90 to-charcoal/60 backdrop-blur-md border-2 border-champagne-gold/30 p-8 overflow-hidden transition-all duration-500 hover:border-champagne-gold hover:shadow-[0_0_60px_rgba(212,175,55,0.4)]">
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="shimmer absolute inset-0" />
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-champagne-gold/50 transition-all duration-500 group-hover:w-16 group-hover:h-16" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-champagne-gold/50 transition-all duration-500 group-hover:w-16 group-hover:h-16" />

        {/* Featured badge */}
        {rate.is_featured && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-champagne-gold to-yellow-600 text-deep-black text-xs font-bold tracking-wider px-6 py-1.5 shadow-lg">
            MOST POPULAR
          </div>
        )}

        {/* 12 Hour max badge - subtle */}
        {rate.max_hours && (
          <div className="absolute top-4 right-4 text-champagne-gold/20 text-xs tracking-wider font-light">
            MAX {rate.max_hours}H
          </div>
        )}

        <div className="relative z-10 flex flex-col h-full">
          {/* Duration */}
          <p className="text-champagne-gold/70 text-sm tracking-[0.2em] uppercase mb-2 font-light">
            {rate.duration}
          </p>

          {/* Package Name */}
          <h3 className="font-playfair text-2xl text-off-white mb-6 tracking-wide group-hover:text-champagne-gold transition-colors">
            {rate.package_name}
          </h3>

          {/* Price with gradient effect */}
          <div className="mb-6">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="inline-block"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-champagne-gold via-yellow-400 to-champagne-gold text-6xl font-light">
                R{rate.price.toLocaleString('en-ZA')}
              </span>
            </motion.div>
          </div>

          {/* Description */}
          <p className="text-off-white/70 text-sm leading-relaxed mb-8 font-light">
            {rate.description}
          </p>

          {/* Features */}
          <ul className="space-y-3 mb-8 flex-grow">
            {rate.features.map((feature, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-start text-off-white/80 text-sm"
              >
                <span className="text-champagne-gold mr-3 mt-1 text-lg">✓</span>
                <span className="font-light">{feature}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="relative block text-center py-4 bg-gradient-to-r from-champagne-gold/10 to-champagne-gold/5 border-2 border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-deep-black transition-all duration-300 tracking-wider text-sm font-semibold overflow-hidden group/btn"
          >
            <span className="relative z-10">BOOK NOW</span>
            <motion.div
              className="absolute inset-0 bg-champagne-gold"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

function BespokeCard({ experience, index }: { experience: typeof bespokeExperiences[0]; index: number }) {
  const defaultImage = "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200"
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="group relative h-[600px] overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={experience.image_url || defaultImage}
          alt={experience.experience_name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/80 to-deep-black/40" />
      </div>

      {/* Border glow effect */}
      <div className="absolute inset-0 border-2 border-champagne-gold/30 group-hover:border-champagne-gold/70 transition-all duration-500 group-hover:shadow-[inset_0_0_60px_rgba(212,175,55,0.15)]" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-10 z-10">
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-champagne-gold/80 text-xs tracking-[0.3em] uppercase mb-3 font-light"
        >
          {experience.tagline}
        </motion.p>

        {/* Experience Name */}
        <h3 className="font-playfair text-4xl text-off-white mb-4 tracking-wider group-hover:text-champagne-gold transition-colors duration-300">
          {experience.experience_name}
        </h3>

        {/* Description */}
        <p className="text-off-white/80 text-sm leading-relaxed mb-6 font-light max-w-lg">
          {experience.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {experience.features?.slice(0, 4).map((feature, i) => (
            <li key={i} className="flex items-start text-off-white/70 text-xs">
              <span className="text-champagne-gold mr-2">◆</span>
              <span className="font-light">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-champagne-gold/30">
          <div>
            <span className="text-champagne-gold text-2xl font-light tracking-wider">
              {experience.price_label}
            </span>
          </div>
          <Link
            href="/contact"
            className="px-8 py-3 bg-champagne-gold/10 border border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-deep-black transition-all duration-300 tracking-wider text-sm backdrop-blur-sm"
          >
            ENQUIRE
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

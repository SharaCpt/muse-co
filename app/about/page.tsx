'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AboutPage() {
  const [headerImage, setHeaderImage] = useState('https://images.unsplash.com/photo-1519167758481-83f29da8c14c?q=80&w=2000')

  useEffect(() => {
    fetchHeaderImage()
  }, [])

  async function fetchHeaderImage() {
    try {
      const { data, error } = await supabase
        .from('page_headers')
        .select('image_url')
        .eq('page_name', 'about')
        .single()

      if (error) throw error
      if (data) setHeaderImage(data.image_url)
    } catch (error) {
      console.error('Error fetching header:', error)
    }
  }

  return (
    <main className="bg-deep-black pt-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={headerImage}
            alt="About MUSE & CO - Elite Companion Agency Cape Town"
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
          <p className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-4 uppercase">Our Story</p>
          <h1 className="font-playfair text-6xl md:text-8xl tracking-[0.2em] text-champagne-gold mb-6 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            ABOUT US
          </h1>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-6 text-off-white/80 font-inter leading-relaxed"
          >
            <p className="text-lg md:text-xl">
              MUSE & CO was founded on the principle that true luxury is found in beauty, elegance, and unforgettable moments.
            </p>
            
            <p>
              With over <span className="text-champagne-gold font-semibold">13 years of experience</span> curating elite companionship and sophisticated lifestyle experiences, we connect discerning clients worldwide with South Africa's most beautiful and refined models, influencers, and private companions.
            </p>

            <p>
              Based in <span className="text-champagne-gold font-semibold">Cape Town, South Africa</span>, MUSE & CO serves high-net-worth individuals and exclusive clientele <span className="text-champagne-gold font-semibold">across the globe</span>. From intimate private gatherings to luxury international experiences, we curate bespoke encounters with exceptional women who embody grace, intelligence, and absolute discretion.
            </p>

            <p>
              Whether you're seeking a sophisticated companion for business travel, an elegant presence for exclusive events, or arranging long-term private experiences, MUSE & CO delivers unparalleled beauty and refinement.
            </p>
          </motion.div>

          {/* Founder Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-12 border-t border-champagne-gold/20"
          >
            <h2 className="font-playfair text-3xl text-champagne-gold mb-6 tracking-wider">
              Meet Shara
            </h2>
            <div className="space-y-4 text-off-white/80 font-inter leading-relaxed">
              <p>
                Founder and curator of MUSE & CO, Shara brings over a decade of expertise in elite companionship curation and luxury lifestyle experiences. Her meticulous approach to connecting discerning clients with exceptional women has made MUSE & CO the premier choice for sophisticated companionship worldwide.
              </p>
              <p>
                From intimate private encounters to exclusive international arrangements, Shara's commitment to beauty, elegance, and discretion ensures every experience is extraordinary, wherever in the world you may be.
              </p>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-12"
          >
            <h2 className="font-playfair text-3xl text-champagne-gold mb-8 tracking-wider text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ValueCard
                title="EXCLUSIVE"
                description="Curated portfolio of elite models and companions, handpicked for their beauty, intelligence, and sophistication."
              />
              <ValueCard
                title="REFINED"
                description="13 years of experience curating unforgettable encounters with the world's most elegant women."
              />
              <ValueCard
                title="DISCREET"
                description="White-glove service with absolute confidentiality and attention to detail."
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

function ValueCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center p-6 border border-champagne-gold/20 bg-charcoal/30">
      <h3 className="font-playfair text-xl text-champagne-gold mb-4 tracking-wider">
        {title}
      </h3>
      <p className="text-off-white/70 text-sm font-inter leading-relaxed">
        {description}
      </p>
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import {
  heroVariants,
  heroFadeIn,
  heroStagger,
  sectionVariants,
  sectionFadeIn,
  cardVariants,
  viewportOnce,
} from '@/lib/motion'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Default header image
const DEFAULT_HEADER = 'https://images.unsplash.com/photo-1617351165725-ec1c8ca2bf67?q=80&w=2000'

interface SiteContent {
  id: string
  content: string
}

export default function AboutPage() {
  // Editable content with defaults
  const [content, setContent] = useState({
    intro: 'MUSE & CO was founded on the principle that true luxury is found in beauty, elegance, and unforgettable moments.',
    story: 'With over a decade of experience curating elite companionship and sophisticated lifestyle experiences, we connect discerning clients worldwide with South Africa\'s most beautiful and refined models, influencers, and private companions.',
    shara: 'Founder and curator of MUSE & CO, Shara brings over a decade of expertise in elite companionship curation and luxury lifestyle experiences. Her meticulous approach to connecting discerning clients with exceptional women has made MUSE & CO the premier choice for sophisticated companionship worldwide.',
  })

  useEffect(() => {
    fetchContent()
  }, [])

  async function fetchContent() {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .in('id', ['about_intro', 'about_story', 'about_shara'])

      if (error) throw error

      if (data && data.length > 0) {
        const newContent: Record<string, string> = {}
        data.forEach((item: SiteContent) => {
          if (item.id === 'about_intro') newContent.intro = item.content
          if (item.id === 'about_story') newContent.story = item.content
          if (item.id === 'about_shara') newContent.shara = item.content
        })
        setContent(prev => ({ ...prev, ...newContent }))
      }
    } catch (error) {
      console.error('Error fetching content:', error)
    }
  }

  return (
    <main className="bg-deep-black pt-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={DEFAULT_HEADER}
            alt="About MUSE & CO — South Africa's premier luxury companion agency based in Cape Town"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-deep-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-black/30 via-transparent to-deep-black" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <motion.p variants={heroFadeIn} custom={heroStagger.label} className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-4 uppercase">Our Story</motion.p>
          <motion.h1
            variants={heroVariants}
            custom={heroStagger.title}
            className="font-playfair text-6xl md:text-8xl tracking-[0.15em] text-champagne-gold mb-6 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            ABOUT US
          </motion.h1>
          <motion.p variants={heroFadeIn} custom={heroStagger.tagline} className="text-off-white/80 text-lg md:text-xl tracking-wide">
            South Africa&apos;s Premier Luxury Companion Agency
          </motion.p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div
            variants={sectionFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-6 text-off-white/80 font-inter leading-relaxed"
          >
            <p className="text-lg md:text-xl">
              {content.intro}
            </p>
            
            <p>
              {content.story}
            </p>

            <p>
              Based in <span className="text-champagne-gold font-semibold">Cape Town, South Africa</span>, MUSE & CO serves high-net-worth individuals and exclusive clientele <span className="text-champagne-gold font-semibold">across the globe</span>. From intimate private gatherings to luxury international experiences, we curate bespoke encounters with exceptional women who embody grace, intelligence, and absolute discretion.
            </p>

            <p>
              Whether you're seeking a sophisticated companion for business travel, an elegant presence for exclusive events, or arranging long-term private experiences, MUSE & CO delivers unparalleled beauty and refinement.
            </p>

            <p className="pt-2">
              Explore our <Link href="/services" className="text-champagne-gold hover:underline">full range of services</Link>, or if you&apos;re an exceptional model, <Link href="/join" className="text-champagne-gold hover:underline">apply to join our exclusive roster</Link>. Ready to connect? <Link href="/contact" className="text-champagne-gold hover:underline">Contact us</Link> for a discreet consultation.
            </p>
          </motion.div>

          {/* Founder Section */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="pt-12 border-t border-champagne-gold/20"
          >
            <h2 className="font-playfair text-3xl text-champagne-gold mb-6 tracking-wider">
              Meet Shara
            </h2>
            <div className="space-y-4 text-off-white/80 font-inter leading-relaxed">
              <p>
                {content.shara}
              </p>
              <p>
                From intimate private encounters to exclusive international arrangements, Shara's commitment to beauty, elegance, and discretion ensures every experience is extraordinary, wherever in the world you may be.
              </p>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
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
                description="Over a decade of experience curating unforgettable encounters with the world's most elegant women."
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

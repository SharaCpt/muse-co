'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Reliable header image - elegant woman in luxury setting
const HEADER_IMAGE = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000'

export default function ServicesPage() {
  return (
    <main className="bg-deep-black pt-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={HEADER_IMAGE}
            alt="Elite Companion Services Cape Town - Luxury VIP Escort"
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
            SERVICES
          </h1>
          <p className="text-off-white/80 text-lg md:text-xl tracking-wide mb-8">
            ELITE LIFESTYLE MODELS • VIP STAFFING • GLOBAL LUXURY EXPERIENCES
          </p>
        </motion.div>
      </section>

      {/* Services Detail */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto space-y-24">
          {/* Luxury Concierge - FIRST */}
          <ServiceDetail
            title="LUXURY LIFESTYLE EXPERIENCES"
            image="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1200"
            description="Exquisite models and sophisticated companions for exclusive private experiences and luxury occasions. Our elite women deliver beauty, elegance, and impeccable presence with absolute discretion."
            features={[
              'Private villa and estate companions',
              'Luxury yacht and coastal experience models',
              'Golf and leisure event companions',
              'VIP travel and executive companionship',
              'Exclusive dinner and intimate gathering companions',
            ]}
            reverse={false}
          />

          {/* Exclusive Private Arrangements */}
          <ServiceDetail
            title="EXCLUSIVE PRIVATE ARRANGEMENTS"
            image="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1200"
            description="Bespoke long-term arrangements for discerning clients seeking sophisticated companionship. From ongoing business travel to extended private experiences, we curate exclusive relationships built on trust, elegance, and absolute discretion."
            features={[
              'Long-term companionship for business executives and travelers',
              'Extended international travel companions',
              'Ongoing private event curation and lifestyle management',
              'Discreet VIP arrangement coordination',
              'Tailored experiences for high-net-worth individuals',
            ]}
            reverse={true}
          />

          {/* Nightlife */}
          <ServiceDetail
            title="VIP NIGHTLIFE EXPERIENCES"
            image="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1200"
            description="Elevate your evening with stunning models and charismatic companions. Our elite women bring sophistication, energy, and undeniable presence to exclusive clubs, private parties, and VIP experiences."
            features={[
              'VIP nightlife companions and models',
              'Professional dancers and entertainers',
              'Bottle service and table companions',
              'Private party and club experiences',
              'Exclusive event companions',
            ]}
            reverse={false}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05),transparent_70%)]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="font-playfair text-4xl md:text-5xl text-champagne-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              Ready to discuss your event?
            </h2>
            <p className="text-off-white/80 font-inter text-lg">
              Contact us for a personalized consultation and custom staffing solutions.
            </p>
            <motion.a
              href="https://wa.me/+27607769793"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-10 py-5 bg-champagne-gold text-deep-black font-inter tracking-widest hover:bg-opacity-90 transition-all duration-300 text-lg shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.6)]"
            >
              CONTACT US
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

function ServiceDetail({
  title,
  image,
  description,
  features,
  reverse,
}: {
  title: string
  image: string
  description: string
  features: string[]
  reverse: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
      className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${reverse ? 'md:grid-flow-col-dense' : ''}`}
    >
      {/* Image */}
      <motion.div 
        className={`relative h-96 overflow-hidden group rounded-sm ${reverse ? 'md:col-start-2' : ''}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="relative w-full h-full"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-deep-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 border-2 border-champagne-gold/30 group-hover:border-champagne-gold/60 transition-all duration-500 rounded-sm group-hover:shadow-[inset_0_0_30px_rgba(212,175,55,0.1)]" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className={reverse ? 'md:col-start-1' : ''}
        initial={{ opacity: 0, x: reverse ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="w-16 h-[2px] bg-gradient-to-r from-champagne-gold to-transparent mb-6" />
        <h2 className="font-playfair text-4xl text-champagne-gold mb-6 tracking-wider">
          {title}
        </h2>
        <p className="text-off-white/80 font-inter mb-8 leading-relaxed">
          {description}
        </p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <motion.li 
              key={index} 
              className="flex items-start group/item"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <span className="text-champagne-gold mr-3 mt-1 transition-transform duration-300 group-hover/item:scale-125">◆</span>
              <span className="text-off-white/70 font-inter text-sm group-hover/item:text-off-white transition-colors duration-300">
                {feature}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}

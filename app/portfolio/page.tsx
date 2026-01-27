'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

export default function PortfolioPage() {
  const [filter, setFilter] = useState('all')

  const models = [
    {
      id: 1,
      category: 'VIP Hostess',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800',
      height: 'h-[500px]'
    },
    {
      id: 2,
      category: 'Brand Ambassador',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800',
      height: 'h-[600px]'
    },
    {
      id: 3,
      category: 'Event Hostess',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800',
      height: 'h-[450px]'
    },
    {
      id: 4,
      category: 'Lifestyle Model',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800',
      height: 'h-[550px]'
    },
    {
      id: 5,
      category: 'VIP Hostess',
      image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=800',
      height: 'h-[520px]'
    },
    {
      id: 6,
      category: 'Brand Ambassador',
      image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800',
      height: 'h-[480px]'
    },
    {
      id: 7,
      category: 'Event Hostess',
      image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800',
      height: 'h-[530px]'
    },
    {
      id: 8,
      category: 'Lifestyle Model',
      image: 'https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?q=80&w=800',
      height: 'h-[490px]'
    },
    {
      id: 9,
      category: 'VIP Hostess',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800',
      height: 'h-[560px]'
    },
  ]

  return (
    <main className="bg-deep-black pt-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2400"
            alt="Elite Portfolio"
            fill
            className="object-cover"
            priority
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
          <div className="flex flex-wrap justify-center gap-4">
            {['all', 'VIP Hostess', 'Brand Ambassador', 'Event Hostess', 'Lifestyle Model'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 text-sm tracking-[0.15em] uppercase transition-all duration-300 ${
                  filter === cat
                    ? 'bg-champagne-gold text-deep-black shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                    : 'bg-transparent text-off-white/60 border border-champagne-gold/20 hover:border-champagne-gold/60 hover:text-champagne-gold'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid - Masonry Style */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models
              .filter((model) => filter === 'all' || model.category === filter)
              .map((model, index) => (
                <ModelCard key={model.id} model={model} index={index} />
              ))}
          </div>
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

function ModelCard({ model, index }: { model: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`group relative overflow-hidden ${model.height} shadow-[0_10px_60px_rgba(0,0,0,0.8)] hover:shadow-[0_15px_80px_rgba(212,175,55,0.3)] transition-all duration-500`}
    >
      {/* Image */}
      <div className="relative w-full h-full">
        <Image
          src={model.image}
          alt={model.category}
          fill
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
            <p className="text-off-white/60 text-xs tracking-widest uppercase">
              Available on Request
            </p>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-champagne-gold/0 group-hover:bg-champagne-gold/5 transition-all duration-500 pointer-events-none" />
      </div>
    </motion.div>
  )
}

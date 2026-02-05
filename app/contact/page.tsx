'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Default header image
const DEFAULT_HEADER = 'https://images.unsplash.com/photo-1647428028787-e004b0d00775?q=80&w=2000'

interface SiteContent {
  id: string
  content: string
}

export default function ContactPage() {
  // Editable content with defaults
  const [content, setContent] = useState({
    intro: 'Ready to elevate your next event? Contact us for a personalized consultation and discover how MUSE & CO can bring your vision to life.',
  })

  useEffect(() => {
    fetchContent()
  }, [])

  async function fetchContent() {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('id', 'contact_intro')
        .single()

      if (data?.content) {
        setContent({ intro: data.content })
      }
    } catch (error) {
      // Use default
    }
  }

  return (
    <main className="bg-deep-black pt-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={DEFAULT_HEADER}
            alt="Contact MUSE & CO - Book Elite Companion Services Cape Town"
            fill
            className="object-cover"
            priority
            unoptimized
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
          <p className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-4 uppercase">Get in Touch</p>
          <h1 className="font-playfair text-6xl md:text-8xl tracking-[0.15em] text-champagne-gold mb-6 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            CONTACT
          </h1>
          <p className="text-off-white/80 text-lg md:text-xl tracking-wide mb-8">
            Exclusive Arrangements • VIP Booking • Worldwide Service
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12 text-center"
          >
            <div>
              <h2 className="font-playfair text-4xl md:text-5xl text-champagne-gold mb-6">
                Get In Touch
              </h2>
              <p className="text-off-white/80 font-inter leading-relaxed mb-8 text-lg">
                {content.intro}
              </p>
            </div>

            {/* Direct Contact Methods */}
            <div className="space-y-4 max-w-md mx-auto">
              <motion.a
                href="https://wa.me/+27607769793?text=Hi%20Shara!%20I%20found%20your%20contact%20details%20on%20the%20MUSE%20%26%20CO%20website.%20I%27d%20like%20to%20inquire%20about%20your%20elite%20companion%20services.%20Looking%20forward%20to%20discussing%20an%20exclusive%20arrangement.%20%E2%9C%A8"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
                className="block px-8 py-5 bg-gradient-to-r from-champagne-gold to-[#B8962E] text-deep-black font-semibold tracking-wider hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 text-center"
              >
                MESSAGE ON WHATSAPP
              </motion.a>
              
              <motion.a
                href="tel:+27607769793"
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
                className="block px-8 py-5 border-2 border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-deep-black transition-all duration-300 text-center font-semibold tracking-wider"
              >
                CALL SHARA
              </motion.a>
              
              <p className="text-off-white/50 text-xs text-center mt-4 italic">
                Fully confidential • Response within 24 hours
              </p>
            </div>

            {/* Business Hours */}
            <div className="pt-8 border-t border-champagne-gold/20">
              <h3 className="font-inter text-champagne-gold mb-4 tracking-wider">
                RESPONSE TIME
              </h3>
              <p className="text-off-white/70 text-sm">
                We respond to all inquiries within 24 hours.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

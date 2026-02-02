'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Default images
const DEFAULT_HEADER = 'https://images.unsplash.com/photo-1640947109541-ad13a917ba45?q=80&w=2000'
const DEFAULT_IMAGES = {
  luxury_lifestyle: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1200',
  private_arrangements: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1200',
  nightlife: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1200',
}

interface SiteContent {
  id: string
  content: string
}

export default function ServicesPage() {
  const [headerImage, setHeaderImage] = useState<string>(DEFAULT_HEADER)
  const [serviceImages, setServiceImages] = useState(DEFAULT_IMAGES)
  
  // Editable content with defaults
  const [content, setContent] = useState({
    intro: 'From intimate gatherings to grand celebrations, we provide bespoke companionship and lifestyle services tailored to your exact preferences.',
    luxury: 'Exquisite models and sophisticated companions for exclusive private experiences and luxury occasions. Our elite women deliver beauty, elegance, and impeccable presence with absolute discretion.',
    private: 'Bespoke long-term arrangements for discerning clients seeking sophisticated companionship. From ongoing business travel to extended private experiences, we curate exclusive relationships built on trust, elegance, and absolute discretion.',
    nightlife: 'Elevate your evening with stunning models and charismatic companions. Our elite women bring sophistication, energy, and undeniable presence to exclusive clubs, private parties, and VIP experiences.',
  })

  useEffect(() => {
    fetchImages()
    fetchContent()
  }, [])

  async function fetchContent() {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .in('id', ['services_intro', 'services_luxury', 'services_private', 'services_nightlife'])

      if (error) throw error

      if (data && data.length > 0) {
        const newContent: Record<string, string> = {}
        data.forEach((item: SiteContent) => {
          if (item.id === 'services_intro') newContent.intro = item.content
          if (item.id === 'services_luxury') newContent.luxury = item.content
          if (item.id === 'services_private') newContent.private = item.content
          if (item.id === 'services_nightlife') newContent.nightlife = item.content
        })
        setContent(prev => ({ ...prev, ...newContent }))
      }
    } catch (error) {
      console.error('Error fetching content:', error)
    }
  }

  async function fetchImages() {
    try {
      const { data, error } = await supabase
        .from('site_images')
        .select('*')
        .in('page', ['Services', 'Headers'])

      if (error) throw error

      if (data && data.length > 0) {
        data.forEach((img: any) => {
          if (img.section === 'services' && img.page === 'Headers') {
            setHeaderImage(img.image_url)
          } else if (img.page === 'Services') {
            setServiceImages(prev => ({ ...prev, [img.section]: img.image_url }))
          }
        })
      }
    } catch (error) {
      console.error('Error fetching images:', error)
    }
  }

  return (
    <main className="bg-deep-black pt-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={headerImage}
            alt="Elite Companion Services Cape Town - Luxury VIP Escort"
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
          <p className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-4 uppercase">Curated Excellence</p>
          <h1 className="font-playfair text-6xl md:text-8xl tracking-[0.15em] text-champagne-gold mb-6 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            SERVICES
          </h1>
          <p className="text-off-white/80 text-lg md:text-xl tracking-wide mb-8">
            ELITE COMPANIONSHIP • PRIVATE EXPERIENCES • GLOBAL ARRANGEMENTS
          </p>
        </motion.div>
      </section>

      {/* Services Detail */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto space-y-24">
          {/* Luxury Concierge - FIRST */}
          <ServiceDetail
            title="LUXURY LIFESTYLE EXPERIENCES"
            image={serviceImages.luxury_lifestyle}
            description={content.luxury}
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
            image={serviceImages.private_arrangements}
            description={content.private}
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
            image={serviceImages.nightlife}
            description={content.nightlife}
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
      <section className="py-24 px-6 bg-charcoal">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="font-playfair text-4xl md:text-5xl text-champagne-gold">
              Ready to arrange your experience?
            </h2>
            <p className="text-off-white/80 font-inter text-lg">
              Contact us for a personalized consultation and bespoke companion services.
            </p>
            <a
              href="https://wa.me/+27607769793"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-5 bg-champagne-gold text-deep-black font-inter tracking-widest hover:bg-opacity-90 transition-smooth gold-glow text-lg"
            >
              CONTACT US
            </a>
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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${reverse ? 'md:grid-flow-col-dense' : ''}`}
    >
      {/* Image */}
      <div className={`relative h-96 overflow-hidden ${reverse ? 'md:col-start-2' : ''}`}>
        <Image
          src={image}
          alt={title}
          fill
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 border-2 border-champagne-gold/30" />
      </div>

      {/* Content */}
      <div className={reverse ? 'md:col-start-1' : ''}>
        <h2 className="font-playfair text-4xl text-champagne-gold mb-6 tracking-wider">
          {title}
        </h2>
        <p className="text-off-white/80 font-inter mb-8 leading-relaxed">
          {description}
        </p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-champagne-gold mr-3 mt-1">•</span>
              <span className="text-off-white/70 font-inter text-sm">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

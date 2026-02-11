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
  primaryCTAHover,
  primaryCTATap,
  viewportOnce,
} from '@/lib/motion'

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
          // Skip header - hardcoded to prevent flash
          if (img.section === 'services' && img.page === 'Headers') {
            return
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
            alt="Elite companion services South Africa — luxury VIP companionship Cape Town Johannesburg Durban"
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
          <motion.p variants={heroFadeIn} custom={heroStagger.label} className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-4 uppercase">Curated Excellence</motion.p>
          <motion.h1
            variants={heroVariants}
            custom={heroStagger.title}
            className="font-playfair text-6xl md:text-8xl tracking-[0.15em] text-champagne-gold mb-6 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            SERVICES
          </motion.h1>
          <motion.p variants={heroFadeIn} custom={heroStagger.tagline} className="text-off-white/80 text-lg md:text-xl tracking-wide mb-4">
            Elite Companion Services Across South Africa &amp; Worldwide
          </motion.p>
          <motion.p variants={heroFadeIn} custom={heroStagger.subtitle} className="text-off-white/50 text-sm tracking-widest mb-8">
            CAPE TOWN • JOHANNESBURG • DURBAN • PRETORIA • INTERNATIONAL
          </motion.p>
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

      {/* FAQ Section — with FAQPage schema for featured snippets */}
      <section className="py-32 px-6 md:px-12 bg-deep-black relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Do you serve clients in Johannesburg and Durban?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. While MUSE & CO is based in Cape Town, we serve clients across South Africa including Johannesburg, Sandton, Durban, Umhlanga, Pretoria, Stellenbosch and nationwide. We also arrange international travel companions worldwide.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How do I book a companion through MUSE & CO?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Simply contact Shara directly via WhatsApp or phone. Describe your preferences, dates, and location, and she will personally curate the perfect companion for your experience. All enquiries are handled with absolute discretion.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What types of companion services do you offer?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'MUSE & CO offers luxury lifestyle experiences, VIP event companionship, elite travel companions for business and leisure, private dinner and villa hosting, nightlife and entertainment, yacht and safari experiences, and bespoke long-term arrangements.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is your service completely confidential?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Absolute discretion is the foundation of everything we do. Every client is personally vetted, and all interactions remain strictly confidential. We never share client information under any circumstances.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Can I request a companion for international travel?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. MUSE & CO arranges sophisticated travel companions for international trips including Mauritius, Dubai, London, and other worldwide destinations. Our companions are experienced travellers who provide elegant companionship anywhere in the world.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What are your rates for companion services?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Visit our Pricing page for transparent starting rates. Bespoke experiences such as yacht charters, safari adventures, and international travel are quoted individually. Contact Shara for a personalised quote tailored to your specific requirements.',
                  },
                },
              ],
            }),
          }}
        />

        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-16"
          >
            <p className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-4 uppercase">Common Questions</p>
            <h2 className="font-playfair text-4xl md:text-5xl text-champagne-gold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-off-white/60 text-lg">
              Everything you need to know about our elite companion services across South Africa
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: 'Do you serve clients in Johannesburg and Durban?', a: 'Yes. While MUSE & CO is based in Cape Town, we serve clients across South Africa including Johannesburg, Sandton, Durban, Umhlanga, Pretoria, Stellenbosch and nationwide. We also arrange international travel companions worldwide.' },
              { q: 'How do I book a companion through MUSE & CO?', a: 'Simply contact Shara directly via WhatsApp or phone. Describe your preferences, dates, and location, and she will personally curate the perfect companion for your experience. All enquiries are handled with absolute discretion.' },
              { q: 'What types of companion services do you offer?', a: 'We offer luxury lifestyle experiences, VIP event companionship, elite travel companions for business and leisure, private dinner and villa hosting, nightlife and entertainment, yacht and safari experiences, and bespoke long-term arrangements.' },
              { q: 'Is your service completely confidential?', a: 'Absolute discretion is the foundation of everything we do. Every client is personally vetted, and all interactions remain strictly confidential. We never share client information under any circumstances.' },
              { q: 'Can I request a companion for international travel?', a: 'Yes. MUSE & CO arranges sophisticated travel companions for international trips including Mauritius, Dubai, London, and other worldwide destinations. Our companions are experienced travellers who provide elegant companionship anywhere in the world.' },
              { q: 'What are your rates for companion services?', a: 'Visit our Pricing page for transparent starting rates. Bespoke experiences such as yacht charters, safari adventures, and international travel are quoted individually. Contact Shara for a personalised quote tailored to your specific requirements.' },
            ].map((faq, index) => (
              <motion.details
                key={index}
                variants={cardVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="group border border-champagne-gold/20 bg-charcoal/30 hover:border-champagne-gold/40 transition-all"
              >
                <summary className="cursor-pointer px-8 py-6 flex items-center justify-between text-off-white/90 font-inter tracking-wide text-sm md:text-base list-none">
                  <span>{faq.q}</span>
                  <span className="text-champagne-gold ml-4 group-open:rotate-45 transition-transform duration-200 text-xl">+</span>
                </summary>
                <div className="px-8 pb-6 text-off-white/70 text-sm leading-relaxed border-t border-champagne-gold/10 pt-4">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
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
            <p className="text-off-white/50 font-inter text-sm mt-4">
              Browse our <Link href="/portfolio" className="text-champagne-gold hover:underline">elite companion portfolio</Link>, review our <Link href="/pricing" className="text-champagne-gold hover:underline">transparent pricing</Link>, or <Link href="/contact" className="text-champagne-gold hover:underline">get in touch</Link> to begin.
            </p>
            <motion.div whileHover={primaryCTAHover} whileTap={primaryCTATap} className="inline-block">
              <a
                href="https://wa.me/+27607769793"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block px-10 py-5 bg-champagne-gold text-deep-black font-inter tracking-widest transition-smooth text-lg overflow-hidden"
              >
                <span className="relative z-10">CONTACT US</span>
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </a>
            </motion.div>
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
      variants={sectionFadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
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

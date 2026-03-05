'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  heroVariants,
  heroFadeIn,
  heroStagger,
  sectionVariants,
  cardVariants,
  primaryCTAHover,
  primaryCTATap,
  viewportOnce,
} from '@/lib/motion'

interface GalleryImage {
  id: string
  image_url: string
  display_order: number
}

interface ModelData {
  id: string
  name: string
  slug: string
  category: string
  description: string
  bio: string | null
  image_url: string
  age: number | null
  height: number | null
  weight: number | null
}

interface RelatedModel {
  id: string
  name: string
  slug: string
  category: string
  image_url: string
  age: number | null
  height: number | null
  weight: number | null
}

interface ModelPageContentProps {
  model: ModelData
  gallery: GalleryImage[]
  relatedModels: RelatedModel[]
}

export default function ModelPageContent({ model, gallery, relatedModels }: ModelPageContentProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const allImages = [
    { id: 'main', image_url: model.image_url, display_order: -1 },
    ...gallery,
  ]

  const whatsappMessage = encodeURIComponent(
    `Hi Shara! I found ${model.name} on the MUSE & CO website and I'd like to make an inquiry.`
  )

  return (
    <main className="bg-deep-black pt-24">
      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-deep-black/95 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-off-white/60 hover:text-champagne-gold transition text-4xl z-10"
            onClick={() => setLightboxImage(null)}
          >
            ✕
          </button>
          <div className="relative w-full max-w-3xl max-h-[90vh] aspect-[3/4]">
            <Image
              src={lightboxImage}
              alt={model.name}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      )}

      {/* Back Button + Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
        <Link 
          href="/portfolio" 
          className="flex items-center justify-center w-10 h-10 rounded-full border border-champagne-gold/30 hover:border-champagne-gold hover:bg-champagne-gold/10 transition-all duration-300 shrink-0"
          aria-label="Back to portfolio"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-champagne-gold">
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
        </Link>
        <nav className="flex items-center gap-2 text-sm text-off-white/40">
          <Link href="/" className="hover:text-champagne-gold transition">Home</Link>
          <span>/</span>
          <Link href="/portfolio" className="hover:text-champagne-gold transition">Portfolio</Link>
          <span>/</span>
          <span className="text-champagne-gold">{model.name}</span>
        </nav>
      </div>

      {/* Hero Section — Model Profile */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <div 
              className="relative aspect-[3/4] overflow-hidden cursor-pointer group"
              onClick={() => setLightboxImage(model.image_url)}
            >
              <Image
                src={model.image_url}
                alt={`${model.name} — ${model.category} at MUSE & CO Cape Town`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 border-2 border-champagne-gold/0 group-hover:border-champagne-gold/30 transition-all duration-500" />
            </div>
          </motion.div>

          {/* Profile Info */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center"
          >
            <motion.div variants={heroFadeIn} custom={0.2}>
              <p className="text-champagne-gold/70 text-sm tracking-[0.3em] uppercase mb-4">
                {model.category}
              </p>
            </motion.div>

            <motion.h1
              variants={heroVariants}
              custom={0.3}
              className="font-playfair text-5xl md:text-6xl lg:text-7xl text-champagne-gold mb-8 tracking-[0.1em] drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            >
              {model.name}
            </motion.h1>

            {/* Stats */}
            {(model.age || model.height || model.weight) && (
              <motion.div variants={heroFadeIn} custom={0.5} className="flex gap-8 mb-8">
                {model.age && (
                  <div className="text-center">
                    <p className="text-champagne-gold text-2xl font-playfair">{model.age}</p>
                    <p className="text-off-white/40 text-xs tracking-[0.2em] uppercase mt-1">Age</p>
                  </div>
                )}
                {model.height && (
                  <div className="text-center">
                    <p className="text-champagne-gold text-2xl font-playfair">{model.height}<span className="text-sm">cm</span></p>
                    <p className="text-off-white/40 text-xs tracking-[0.2em] uppercase mt-1">Height</p>
                  </div>
                )}
                {model.weight && (
                  <div className="text-center">
                    <p className="text-champagne-gold text-2xl font-playfair">{model.weight}<span className="text-sm">kg</span></p>
                    <p className="text-off-white/40 text-xs tracking-[0.2em] uppercase mt-1">Weight</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Divider */}
            <motion.div variants={heroFadeIn} custom={0.6} className="w-24 h-[1px] bg-champagne-gold/40 mb-8" />

            {/* Description */}
            {model.description && (
              <motion.p variants={heroFadeIn} custom={0.7} className="text-off-white/70 text-lg leading-relaxed mb-6">
                {model.description}
              </motion.p>
            )}

            {/* Bio (longer description) */}
            {model.bio && (
              <motion.div variants={heroFadeIn} custom={0.8} className="text-off-white/60 leading-relaxed mb-8 space-y-4">
                {model.bio.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </motion.div>
            )}

            {/* CTA Buttons */}
            <motion.div variants={heroFadeIn} custom={0.9} className="flex flex-col sm:flex-row gap-4 mt-4">
              <motion.a
                href={`https://wa.me/27607769793?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={primaryCTAHover}
                whileTap={primaryCTATap}
                className="group px-10 py-4 bg-champagne-gold text-deep-black font-inter tracking-[0.15em] transition-all duration-300 text-center text-lg shadow-[0_0_40px_rgba(212,175,55,0.4)] relative overflow-hidden inline-block"
              >
                <span className="relative z-10">BOOK {model.name.toUpperCase()}</span>
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </motion.a>
              <Link
                href="/contact"
                className="px-10 py-4 border-2 border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-deep-black transition-all duration-300 tracking-[0.15em] text-center text-lg"
              >
                ENQUIRE
              </Link>
            </motion.div>

            {/* Availability badge */}
            <motion.div variants={heroFadeIn} custom={1.0} className="mt-8 flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-off-white/50 text-sm tracking-wide">
                Available in Cape Town &amp; nationwide
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      {gallery.length > 0 && (
        <section className="py-24 px-6 bg-charcoal/30 border-t border-b border-champagne-gold/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-center mb-16"
            >
              <p className="text-champagne-gold/60 text-sm tracking-[0.3em] uppercase mb-4">Gallery</p>
              <h2 className="font-playfair text-3xl md:text-4xl text-champagne-gold tracking-wide">
                More of {model.name}
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {gallery.map((img, index) => (
                <motion.div
                  key={img.id}
                  variants={cardVariants}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="relative aspect-[3/4] overflow-hidden cursor-pointer group"
                  onClick={() => setLightboxImage(img.image_url)}
                >
                  <Image
                    src={img.image_url}
                    alt={`${model.name} gallery photo ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-deep-black/0 group-hover:bg-deep-black/20 transition-all duration-500" />
                  <div className="absolute inset-0 border-2 border-champagne-gold/0 group-hover:border-champagne-gold/40 transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Models */}
      {relatedModels.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-center mb-16"
            >
              <p className="text-champagne-gold/60 text-sm tracking-[0.3em] uppercase mb-4">You May Also Like</p>
              <h2 className="font-playfair text-3xl md:text-4xl text-champagne-gold tracking-wide">
                More {model.category === 'Elite Model' ? 'Elite Models' : `${model.category}s`}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedModels.map((related, index) => (
                <motion.div
                  key={related.id}
                  variants={cardVariants}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  <Link
                    href={`/portfolio/${related.slug || related.id}`}
                    className="group relative overflow-hidden h-[450px] block shadow-[0_10px_60px_rgba(0,0,0,0.8)] hover:shadow-[0_15px_80px_rgba(212,175,55,0.3)] transition-all duration-500"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={related.image_url}
                        alt={`${related.name} — ${related.category}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
                      <div className="absolute inset-0 border-2 border-champagne-gold/0 group-hover:border-champagne-gold/40 transition-all duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="w-12 h-[1px] bg-champagne-gold mb-3 group-hover:w-24 transition-all duration-500" />
                        <p className="text-champagne-gold text-sm tracking-[0.2em] uppercase font-light">{related.category}</p>
                        <p className="text-off-white text-base font-semibold">{related.name}</p>
                        {(related.age || related.height) && (
                          <div className="flex gap-3 text-off-white/70 text-sm pt-1">
                            {related.age && <span>{related.age} years</span>}
                            {related.height && <span>{related.height}cm</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* View all link */}
            <div className="text-center mt-12">
              <Link
                href="/portfolio"
                className="text-champagne-gold/60 hover:text-champagne-gold transition tracking-[0.15em] text-sm uppercase border-b border-champagne-gold/20 hover:border-champagne-gold/60 pb-1"
              >
                View Full Portfolio
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-24 px-6 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05),transparent_70%)]" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-6"
          >
            <h2 className="font-playfair text-3xl md:text-4xl text-champagne-gold tracking-wide drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              Interested in {model.name}?
            </h2>
            <p className="text-off-white/70 text-lg leading-relaxed">
              Get in touch to arrange a private introduction. All enquiries are handled with absolute discretion.
            </p>
            <motion.a
              href={`https://wa.me/27607769793?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={primaryCTAHover}
              whileTap={primaryCTATap}
              className="group inline-block px-12 py-5 bg-champagne-gold text-deep-black font-inter tracking-[0.15em] transition-all duration-300 text-lg shadow-[0_0_40px_rgba(212,175,55,0.4)] relative overflow-hidden"
            >
              <span className="relative z-10">MESSAGE US ON WHATSAPP</span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

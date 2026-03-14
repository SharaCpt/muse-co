'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  heroVariants,
  heroFadeIn,
  heroStagger,
  sectionVariants,
  sectionFadeIn,
  cardVariants,
  primaryCTAHover,
  primaryCTATap,
  secondaryCTATap,
  viewportOnce,
} from '@/lib/motion'

interface LocationModel {
  id: string
  name: string
  slug: string | null
  category: string
  image_url: string
  age: number | null
  height: number | null
}

interface LocationPageContentProps {
  city: string
  region: string
  heroImage: string
  heroAlt: string
  intro: string
  bodyText: string[]
  services: { title: string; description: string }[]
  areas: string[]
  whyTitle: string
  whyPoints: { title: string; text: string }[]
  faqItems: { q: string; a: string }[]
  models: LocationModel[]
}

export default function LocationPageContent({
  city,
  region,
  heroImage,
  heroAlt,
  intro,
  bodyText,
  services,
  areas,
  whyTitle,
  whyPoints,
  faqItems,
  models,
}: LocationPageContentProps) {
  const whatsappMessage = encodeURIComponent(
    `Hi Shara! I found you on the MUSE & CO website. I'm looking for an elite escort in ${city}.`
  )

  return (
    <main className="bg-deep-black pt-24">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-charcoal">
          <Image
            src={heroImage}
            alt={heroAlt}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-deep-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-black/30 via-transparent to-deep-black" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <motion.p variants={heroFadeIn} custom={heroStagger.label} className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-4 uppercase">
            {region}
          </motion.p>
          <motion.h1
            variants={heroVariants}
            custom={heroStagger.title}
            className="font-playfair text-4xl md:text-6xl lg:text-7xl tracking-[0.1em] text-champagne-gold mb-6 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            ELITE ESCORTS {city.toUpperCase()}
          </motion.h1>
          <motion.p variants={heroFadeIn} custom={heroStagger.tagline} className="text-off-white/80 text-lg md:text-xl tracking-wide mb-4">
            {intro}
          </motion.p>
          <motion.p variants={heroFadeIn} custom={heroStagger.subtitle} className="text-off-white/50 text-sm tracking-widest mb-8">
            PREMIUM ESCORTS • VIP COMPANIONS • LUXURY EXPERIENCES
          </motion.p>
          <motion.a
            variants={heroFadeIn}
            custom={heroStagger.cta}
            href={`https://wa.me/27607769793?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-block px-12 py-5 bg-champagne-gold text-deep-black font-inter tracking-[0.15em] transition-all duration-300 text-lg shadow-[0_0_40px_rgba(212,175,55,0.4)] relative overflow-hidden"
          >
            <span className="relative z-10">BOOK AN ESCORT IN {city.toUpperCase()}</span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </motion.a>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-6"
          >
            <h2 className="font-playfair text-3xl md:text-4xl text-champagne-gold tracking-wide">
              Premium Escort Services in {city}
            </h2>
            <div className="w-24 h-[1px] bg-champagne-gold/40" />
            {bodyText.map((paragraph, i) => (
              <p key={i} className="text-off-white/70 text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 md:px-12 bg-charcoal/30 border-t border-b border-champagne-gold/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-16"
          >
            <p className="text-champagne-gold/60 text-sm tracking-[0.3em] uppercase mb-4">What We Offer</p>
            <h2 className="font-playfair text-3xl md:text-4xl text-champagne-gold tracking-wide">
              Escort Services in {city}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="p-8 border border-champagne-gold/15 hover:border-champagne-gold/40 transition-all duration-500 bg-deep-black/50"
              >
                <h3 className="font-playfair text-xl text-champagne-gold mb-3">{service.title}</h3>
                <p className="text-off-white/60 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Models */}
      {models.length > 0 && (
        <section className="py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-center mb-16"
            >
              <p className="text-champagne-gold/60 text-sm tracking-[0.3em] uppercase mb-4">Featured</p>
              <h2 className="font-playfair text-3xl md:text-4xl text-champagne-gold tracking-wide">
                Elite Escorts Available in {city}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {models.slice(0, 6).map((model, index) => (
                <motion.div
                  key={model.id}
                  variants={cardVariants}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  <Link
                    href={`/portfolio/${model.slug || model.id}`}
                    className="group relative overflow-hidden h-[450px] block shadow-[0_10px_60px_rgba(0,0,0,0.8)] hover:shadow-[0_15px_80px_rgba(212,175,55,0.3)] transition-all duration-500"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={model.image_url}
                        alt={`${model.name} — elite escort in ${city}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
                      <div className="absolute inset-0 border-2 border-champagne-gold/0 group-hover:border-champagne-gold/40 transition-all duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="w-12 h-[1px] bg-champagne-gold mb-3 group-hover:w-24 transition-all duration-500" />
                        <p className="text-champagne-gold text-sm tracking-[0.2em] uppercase font-light">{model.category}</p>
                        <p className="text-off-white text-base font-semibold">{model.name}</p>
                        {(model.age || model.height) && (
                          <div className="flex gap-3 text-off-white/70 text-sm pt-1">
                            {model.age && <span>{model.age} years</span>}
                            {model.height && <span>{model.height}cm</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/portfolio"
                className="px-10 py-4 border-2 border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-deep-black transition-all duration-300 tracking-[0.15em] text-lg inline-block"
              >
                VIEW FULL PORTFOLIO
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-24 px-6 md:px-12 bg-charcoal/30 border-t border-b border-champagne-gold/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-3xl md:text-4xl text-champagne-gold tracking-wide">
              {whyTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyPoints.map((point, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="space-y-3"
              >
                <h3 className="text-champagne-gold font-semibold tracking-wide">{point.title}</h3>
                <p className="text-off-white/60 leading-relaxed">{point.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-8"
          >
            <h2 className="font-playfair text-3xl md:text-4xl text-champagne-gold tracking-wide">
              Areas We Serve in {city}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {areas.map((area, i) => (
                <span
                  key={i}
                  className="px-4 py-2 border border-champagne-gold/20 text-off-white/60 text-sm tracking-wider"
                >
                  {area}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12 bg-charcoal/30 border-t border-champagne-gold/10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-3xl md:text-4xl text-champagne-gold tracking-wide">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="border-b border-champagne-gold/10 pb-6"
              >
                <h3 className="text-champagne-gold font-semibold text-lg mb-3">{faq.q}</h3>
                <p className="text-off-white/60 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-32 px-6 bg-deep-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05),transparent_70%)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-8"
          >
            <h2 className="font-playfair text-4xl md:text-5xl text-champagne-gold tracking-wide drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              Ready to Book an Elite Escort in {city}?
            </h2>
            <p className="text-off-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
              Contact us today for a discreet consultation. All enquiries are handled with absolute confidentiality.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <motion.a
                href={`https://wa.me/27607769793?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={primaryCTAHover}
                whileTap={primaryCTATap}
                className="group px-12 py-5 bg-champagne-gold text-deep-black font-inter tracking-[0.15em] transition-all duration-300 text-lg shadow-[0_0_40px_rgba(212,175,55,0.4)] relative overflow-hidden inline-block"
              >
                <span className="relative z-10">MESSAGE US ON WHATSAPP</span>
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </motion.a>
              <motion.div whileTap={secondaryCTATap}>
                <Link
                  href="/contact"
                  className="px-12 py-5 border-2 border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-deep-black transition-all duration-300 tracking-[0.15em] text-lg shadow-[0_0_20px_rgba(212,175,55,0.15)] inline-block"
                >
                  CONTACT US
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ShieldCheck, Clock3, Globe2 } from 'lucide-react'
import CTAButton from '@/components/CTAButton'
import {
  heroVariants,
  heroFadeIn,
  heroStagger,
  sectionVariants,
  cardVariants,
  viewportOnce,
} from '@/lib/motion'
import { BLUR_DATA_URL, SIZES } from '@/lib/image-utils'

const DEFAULT_HEADER = 'https://images.unsplash.com/photo-1647428028787-e004b0d00775?q=80&w=2000'

const TRUST_POINTS = [
  { icon: ShieldCheck, title: 'Absolute Discretion', text: 'Every inquiry and arrangement is handled in strict confidence, always.' },
  { icon: Clock3, title: 'Replies Within 24 Hours', text: 'Personally reviewed and answered — never left waiting.' },
  { icon: Globe2, title: 'Cape Town & Worldwide', text: 'Based in Cape Town, arranging experiences across South Africa and internationally.' },
]

interface ContactContentProps {
  content: {
    intro: string
  }
}

export default function ContactContent({ content }: ContactContentProps) {
  return (
    <main className="bg-deep-black pt-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={DEFAULT_HEADER}
            alt="Contact MUSE & CO — book elite companion services Cape Town Johannesburg South Africa"
            fill
            className="object-cover"
            priority
            sizes={SIZES.hero}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
          <div className="absolute inset-0 bg-deep-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-black/30 via-transparent to-deep-black" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <motion.p variants={heroFadeIn} custom={heroStagger.label} className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-4 uppercase">Get in Touch</motion.p>
          <motion.h1
            variants={heroVariants}
            custom={heroStagger.title}
            className="font-playfair text-6xl md:text-8xl tracking-[0.15em] text-champagne-gold mb-6 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            CONTACT
          </motion.h1>
          <motion.p variants={heroFadeIn} custom={heroStagger.tagline} className="text-off-white/80 text-lg md:text-xl tracking-wide mb-4">
            VIP Booking &amp; Private Arrangements — South Africa &amp; Worldwide
          </motion.p>
          <motion.p variants={heroFadeIn} custom={heroStagger.subtitle} className="text-off-white/50 text-sm tracking-widest mb-8">
            CAPE TOWN • JOHANNESBURG • DURBAN • PRETORIA • INTERNATIONAL
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-12 items-start">
          {/* Editorial column */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h2 className="font-playfair text-4xl md:text-5xl text-champagne-gold mb-6 leading-tight">
              Let&apos;s Arrange Something Extraordinary
            </h2>
            <p className="text-off-white/80 font-inter leading-relaxed mb-12 text-lg">
              {content.intro}
            </p>

            <div className="space-y-8">
              {TRUST_POINTS.map((point, index) => (
                <motion.div
                  key={point.title}
                  variants={cardVariants}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-full border border-champagne-gold/40 flex items-center justify-center">
                    <point.icon className="w-5 h-5 text-champagne-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-off-white font-inter font-semibold tracking-wide mb-1">{point.title}</p>
                    <p className="text-off-white/60 text-sm leading-relaxed">{point.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action card */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative overflow-hidden rounded-lg border border-champagne-gold/25 bg-gradient-to-br from-charcoal/70 via-deep-black to-charcoal/40 backdrop-blur-sm p-8 md:p-10"
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-champagne-gold/50 to-transparent" />

            <p className="text-champagne-gold/70 text-xs tracking-[0.3em] uppercase mb-2">Direct Line to Shara</p>
            <p className="text-off-white/70 text-sm mb-8 leading-relaxed">
              The fastest and most discreet way to reach us — a real conversation, not a form.
            </p>

            <div className="flex flex-col gap-4 items-stretch">
              <CTAButton
                href="https://wa.me/+27607769793?text=Hi%20Shara!%20I%20found%20your%20contact%20details%20on%20the%20MUSE%20%26%20CO%20website.%20I%27d%20like%20to%20inquire%20about%20your%20elite%20companion%20services.%20Looking%20forward%20to%20discussing%20an%20exclusive%20arrangement.%20%E2%9C%A8"
                variant="primary"
                className="w-full"
              >
                Message on WhatsApp
              </CTAButton>
              <CTAButton href="tel:+27607769793" variant="secondary" className="w-full" icon={false}>
                Call Shara
              </CTAButton>
            </div>

            <p className="text-off-white/50 text-xs text-center mt-6 italic">
              Fully confidential • Response within 24 hours
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

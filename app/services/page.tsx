'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ServicesPage() {
  return (
    <main className="bg-deep-black pt-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000"
            alt="Services"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-deep-black/70" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="font-playfair text-5xl md:text-7xl tracking-widest text-champagne-gold mb-4">
            SERVICES
          </h1>
          <p className="text-off-white/70 font-inter tracking-wider text-lg">
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
      <section className="py-24 px-6 bg-charcoal">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="font-playfair text-4xl md:text-5xl text-champagne-gold">
              Ready to discuss your event?
            </h2>
            <p className="text-off-white/80 font-inter text-lg">
              Contact us for a personalized consultation and custom staffing solutions.
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

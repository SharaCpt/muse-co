'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <main className="bg-deep-black pt-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519167758481-83f29da8c14c?q=80&w=2000"
            alt="About MUSE & CO"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-deep-black/70" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 font-playfair text-5xl md:text-7xl tracking-widest text-champagne-gold"
        >
          ABOUT US
        </motion.h1>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-6 text-off-white/80 font-inter leading-relaxed"
          >
            <p className="text-lg md:text-xl">
              MUSE & CO was founded on the principle that luxury is in the details.
            </p>
            
            <p>
              With over <span className="text-champagne-gold font-semibold">13 years of experience</span> in high-end event staffing and nightlife curation, we connect discerning clients with elite professionals who embody sophistication, discretion, and impeccable service.
            </p>

            <p>
              Based in <span className="text-champagne-gold font-semibold">Cape Town, South Africa</span>, MUSE & CO serves discerning clients <span className="text-champagne-gold font-semibold">worldwide</span>. From intimate gatherings in European villas to luxury brand activations across international markets, we curate exceptional experiences and elite staffing solutions globally.
            </p>

            <p>
              Whether you're launching a luxury brand, hosting an exclusive VIP event, seeking elite staffing for your venue, or curating a bespoke private experience, MUSE & CO delivers excellence without compromise.
            </p>
          </motion.div>

          {/* Founder Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-12 border-t border-champagne-gold/20"
          >
            <h2 className="font-playfair text-3xl text-champagne-gold mb-6 tracking-wider">
              Meet Shara
            </h2>
            <div className="space-y-4 text-off-white/80 font-inter leading-relaxed">
              <p>
                Founder and curator of MUSE & CO, Shara brings over a decade of expertise in lifestyle staffing and international event curation. Her meticulous approach to matching clients with the perfect team has made MUSE & CO the go-to agency for exclusive experiences across continents.
              </p>
              <p>
                From intimate villa gatherings in the Mediterranean to large-scale brand activations worldwide, Shara's commitment to excellence and global network ensures every event exceeds expectations, wherever you are.
              </p>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-12"
          >
            <h2 className="font-playfair text-3xl text-champagne-gold mb-8 tracking-wider text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ValueCard
                title="EXCLUSIVE"
                description="Curated portfolio of elite professionals, handpicked for their talent and professionalism."
              />
              <ValueCard
                title="PROFESSIONAL"
                description="13 years of experience delivering flawless service to discerning clients worldwide."
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

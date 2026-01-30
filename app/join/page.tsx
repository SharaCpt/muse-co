'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'
import ModelRecruitmentButton from '@/components/ModelRecruitmentButton'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Default header image
const DEFAULT_HEADER = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000'

export default function JoinPage() {
  const [headerImage, setHeaderImage] = useState<string>(DEFAULT_HEADER)

  useEffect(() => {
    fetchHeaderImage()
  }, [])

  async function fetchHeaderImage() {
    try {
      const { data, error } = await supabase
        .from('site_images')
        .select('image_url')
        .eq('id', 'header_join')
        .single()

      if (data?.image_url) {
        setHeaderImage(data.image_url)
      }
    } catch (error) {
      // Keep default on error
    }
  }

  return (
    <>
      <ModelRecruitmentButton />
      <main className="bg-deep-black pt-24">
        {/* Hero Section */}
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={headerImage}
              alt="Join Muse & Co - Become an Elite Model"
              fill
              className="object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-deep-black/70" />
            <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-transparent to-deep-black" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center px-6 max-w-5xl"
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-6 uppercase"
            >
              Elite Opportunity
            </motion.p>
            <h1 className="font-playfair text-6xl md:text-9xl tracking-[0.2em] text-champagne-gold mb-8 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              JOIN MUSE & CO
            </h1>
            <p className="text-off-white/90 text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto mb-8">
              Become part of South Africa's most exclusive modeling and companion agency.
            </p>
            <p className="text-champagne-gold/90 text-2xl md:text-3xl font-playfair italic">
              We represent the cream of the crop.
            </p>
          </motion.div>
        </section>

        {/* Why Join - Streamlined */}
        <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-deep-black to-charcoal">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="font-playfair text-4xl md:text-5xl text-champagne-gold mb-6 tracking-wide">
                Premium Earnings • Global Travel • Elite Clientele
              </h2>
              <p className="text-off-white/80 text-lg leading-relaxed max-w-3xl mx-auto">
                Join South Africa's most selective agency. Work exclusively with vetted high-net-worth clients, 
                earn top-tier rates, and travel internationally while maintaining complete safety and discretion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeaturePoint
                icon="💰"
                title="Top 1% Earnings"
                description="Premium compensation because our clients demand excellence"
              />
              <FeaturePoint
                icon="✈️"
                title="International Experiences"
                description="Dubai, Monaco, London - travel the world in luxury"
              />
              <FeaturePoint
                icon="🔒"
                title="Exclusive Partnership"
                description="Work solely through Muse & Co for higher rates & safety"
              />
              <FeaturePoint
                icon="👑"
                title="VIP Treatment"
                description="Professional photos, styling, 24/7 support included"
              />
            </div>
          </motion.div>
        </section>

        {/* Requirements - Condensed */}
        <section className="py-24 px-6 md:px-12 bg-charcoal relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.05),transparent_50%)]" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-playfair text-4xl md:text-5xl text-champagne-gold mb-4 tracking-wide">
                Are You the Cream of the Crop?
              </h2>
              <p className="text-off-white/70 text-lg">
                We're selective by design - beauty, intelligence, sophistication, and exclusive commitment required.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <QuickRequirement text="Stunning beauty & elegant presence" />
              <QuickRequirement text="Articulate & sophisticated charm" />
              <QuickRequirement text="Professional & reliable (18+)" />
              <QuickRequirement text="Absolute discretion & maturity" />
              <QuickRequirement text="Comfortable in luxury settings" />
              <QuickRequirement text="Exclusive partnership commitment" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 border-2 border-champagne-gold/40 rounded-lg bg-gradient-to-br from-rose-900/20 to-deep-black text-center"
            >
              <p className="text-champagne-gold text-lg font-playfair mb-2">
                Not For Everyone
              </p>
              <p className="text-off-white/70 text-sm">
                We reject far more applicants than we accept. If you're exceptional, we want to meet you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* How It Works - Simple */}
        <section className="py-24 px-6 md:px-12 bg-deep-black">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-playfair text-4xl md:text-5xl text-champagne-gold mb-4 tracking-wide">
                Simple Process
              </h2>
              <p className="text-off-white/70">
                Message Shara → Interview → Professional Photos → Start Earning
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-gradient-to-br from-charcoal to-deep-black border border-champagne-gold/30 rounded-lg"
            >
              <p className="text-off-white/80 mb-6 leading-relaxed">
                Ready to join South Africa's most exclusive modeling agency? 
                <span className="block mt-2 text-champagne-gold font-semibold">
                  Click the sparkling button at bottom left to begin.
                </span>
              </p>
              <p className="text-off-white/50 text-sm italic">
                All inquiries handled with complete confidentiality
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}

// Streamlined Components
function FeaturePoint({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex gap-4 items-start p-6 glass-effect border border-champagne-gold/20 rounded-lg hover:border-champagne-gold/40 transition-all duration-300"
    >
      <span className="text-3xl flex-shrink-0">{icon}</span>
      <div>
        <h3 className="text-champagne-gold font-semibold mb-1 tracking-wide">{title}</h3>
        <p className="text-off-white/70 text-sm font-light">{description}</p>
      </div>
    </motion.div>
  )
}

function QuickRequirement({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 p-4 bg-deep-black/50 border border-champagne-gold/20 rounded-lg"
    >
      <div className="w-2 h-2 bg-champagne-gold rounded-full flex-shrink-0" />
      <p className="text-off-white/80 text-sm">{text}</p>
    </motion.div>
  )
}

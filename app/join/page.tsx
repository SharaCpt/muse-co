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
      // Keep default
    }
  }

  return (
    <>
      <ModelRecruitmentButton />
      <main className="bg-deep-black pt-24">
        {/* Hero */}
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src={headerImage} alt="Join Muse & Co" fill className="object-cover" priority unoptimized />
            <div className="absolute inset-0 bg-deep-black/70" />
            <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-transparent to-deep-black" />
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center px-6 max-w-5xl">
            <h1 className="font-playfair text-7xl md:text-9xl text-champagne-gold mb-8 tracking-[0.2em]">
              JOIN MUSE & CO
            </h1>
            <p className="text-off-white text-2xl md:text-3xl font-light mb-4">
              Travel the World. Live Luxuriously. Be Extraordinary.
            </p>
            <p className="text-champagne-gold/90 text-xl font-playfair italic">
              South Africa's most exclusive girls
            </p>
          </motion.div>
        </section>

        {/* Shara's Message */}
        <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-deep-black to-charcoal">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="font-playfair text-4xl md:text-5xl text-champagne-gold mb-6">
                Hey Beautiful 💫
              </h2>
              <div className="text-off-white/90 text-lg leading-relaxed space-y-4">
                <p>
                  I'm Shara, and I've been running Muse & Co here in Cape Town for years. Let me be real with you - 
                  this isn't your typical modeling gig. This is about living your absolute best life while earning what you deserve.
                </p>
                <p>
                  Dubai weekends. Monaco yacht parties. London shopping sprees. All while being treated like the queen you are 
                  by the kind of men who appreciate intelligence, beauty, and sophistication.
                </p>
                <p className="text-champagne-gold/90 italic">
                  If you're smart, stunning, and ready for something extraordinary - let's talk.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Lifestyle */}
        <section className="py-24 px-6 md:px-12 bg-charcoal">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="font-playfair text-4xl md:text-5xl text-champagne-gold mb-4">
                What You Get
              </h2>
              <p className="text-off-white/70 text-lg">
                This is the life my girls live - and yes, it's as amazing as it sounds
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <BenefitBox emoji="✈️" title="Travel the World" text="International trips with elite clients - Dubai, Europe, exotic islands. All expenses paid, luxury hotels, first class everything." />
              <BenefitBox emoji="💰" title="Top-Tier Money" text="Earn what you're worth. My girls make seriously good money because our clients are high-net-worth and appreciate quality." />
              <BenefitBox emoji="👗" title="VIP Treatment" text="Professional photos, styling advice, 24/7 support. I invest in you because when you shine, we all win." />
              <BenefitBox emoji="🔒" title="Your Safety First" text="Every client is vetted. I know where you are, who you're with. Your safety isn't negotiable - ever." />
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="bg-gradient-to-br from-rose-900/30 to-deep-black p-8 rounded-lg border-2 border-champagne-gold/40 text-center">
              <p className="text-champagne-gold text-xl font-playfair mb-3">The Deal</p>
              <p className="text-off-white/80 leading-relaxed">
                You work exclusively with me. No other agents, no undercutting rates, no drama. 
                This keeps your rates premium, your bookings consistent, and honestly - it keeps you safer. 
                I can't protect you if I don't know where you are.
              </p>
            </motion.div>
          </div>
        </section>

        {/* What I Need From You */}
        <section className="py-24 px-6 md:px-12 bg-deep-black">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="font-playfair text-4xl md:text-5xl text-champagne-gold mb-4">
                Are You the Girl?
              </h2>
              <p className="text-off-white/70 text-lg">
                I'm picky - but if this sounds like you, we should definitely chat
              </p>
            </motion.div>

            <div className="space-y-4 mb-12">
              <RequirementBox text="You're absolutely gorgeous and you know how to work it" />
              <RequirementBox text="You can hold a conversation about anything - current affairs, travel, wine, whatever. You're smart and interesting." />
              <RequirementBox text="You're reliable. If you say you'll be there, you'll be there. Looking fabulous." />
              <RequirementBox text="You get discretion. What happens stays private - always." />
              <RequirementBox text="You're comfortable in 5-star hotels, fancy restaurants, luxury settings. Or ready to be." />
              <RequirementBox text="You're 18+ and ready to commit to working exclusively through Muse & Co" />
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="bg-charcoal p-8 rounded-lg border border-champagne-gold/30 text-center">
              <p className="text-champagne-gold font-playfair text-xl mb-3">Real Talk</p>
              <p className="text-off-white/80 leading-relaxed mb-3">
                I turn down way more girls than I accept. This isn't for everyone - and that's the point. 
                My clients expect the absolute best, so that's exactly who I represent.
              </p>
              <p className="text-off-white/60 text-sm italic">
                If you're bubbly, beautiful, and brilliant - you're exactly who I'm looking for.
              </p>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-deep-black to-charcoal">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="font-playfair text-4xl text-champagne-gold mb-6">
                Ready to Start?
              </h2>
              <p className="text-off-white/80 text-lg leading-relaxed">
                Click that sparkling button at the bottom left to message me directly on WhatsApp. 
                We'll have a quick chat, and if we vibe, we'll meet for coffee and I'll tell you everything.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
              <ProcessBox number="1" text="Message me → We chat about you, what you're looking for, answer any questions" />
              <ProcessBox number="2" text="Meet for coffee → Get to know each other, I explain everything in detail" />
              <ProcessBox number="3" text="Professional photos → We get you looking incredible for client intros" />
              <ProcessBox number="4" text="First booking → You start living this life" />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 text-center">
              <p className="text-champagne-gold/90 font-playfair text-xl mb-2">
                See that sparkle? ✨
              </p>
              <p className="text-off-white/70 mb-4">
                Click the glowing button at the bottom left to start this conversation
              </p>
              <p className="text-off-white/50 text-sm italic">
                Everything we discuss is 100% confidential - always
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}

function BenefitBox({ emoji, title, text }: { emoji: string; title: string; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 bg-deep-black/50 border border-champagne-gold/20 rounded-lg hover:border-champagne-gold/40 transition-all"
    >
      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className="text-champagne-gold font-semibold text-lg mb-2">{title}</h3>
      <p className="text-off-white/70 text-sm leading-relaxed">{text}</p>
    </motion.div>
  )
}

function RequirementBox({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-start gap-4 p-4 bg-charcoal/50 border border-champagne-gold/20 rounded-lg"
    >
      <div className="text-champagne-gold text-xl mt-0.5">✓</div>
      <p className="text-off-white/80">{text}</p>
    </motion.div>
  )
}

function ProcessBox({ number, text }: { number: string; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex gap-4 items-start p-5 bg-charcoal border border-champagne-gold/30 rounded-lg"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-champagne-gold/20 border-2 border-champagne-gold flex items-center justify-center">
        <span className="text-champagne-gold font-bold">{number}</span>
      </div>
      <p className="text-off-white/80 pt-1.5">{text}</p>
    </motion.div>
  )
}

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

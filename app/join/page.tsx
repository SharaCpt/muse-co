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

  const phoneNumber = '+27607769793'
  const message = "Hey Shara! ✨ I saw the Join page and I'm interested in learning more about Muse & Co. Would love to chat!"
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <>
      <ModelRecruitmentButton />
      <main className="bg-deep-black pt-24">
        {/* Hero */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src={headerImage} alt="Join Muse & Co" fill className="object-cover" priority unoptimized />
            <div className="absolute inset-0 bg-deep-black/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-deep-black/80 via-transparent to-deep-black" />
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center px-6 max-w-5xl">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-champagne-gold/80 text-sm tracking-[0.4em] mb-6 uppercase"
            >
              Your Next Chapter Starts Here
            </motion.p>
            <h1 className="font-playfair text-6xl md:text-8xl text-champagne-gold mb-6 tracking-[0.15em]">
              JOIN MUSE & CO
            </h1>
            <p className="text-off-white/90 text-xl md:text-2xl font-light">
              Travel the World. Live Luxuriously. Be Extraordinary.
            </p>
          </motion.div>
        </section>

        {/* Premium Contact Box */}
        <section className="relative -mt-16 z-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-900/90 via-rose-800/90 to-pink-900/90 border-2 border-champagne-gold/50 shadow-[0_0_60px_rgba(199,91,122,0.3)]">
              {/* Shimmer effect */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-champagne-gold/10 to-transparent"
              />
              
              {/* Content */}
              <div className="relative z-10 p-8 md:p-10 text-center">
                <p className="text-champagne-gold font-playfair text-lg mb-2">Ready to Begin?</p>
                <p className="text-off-white/80 text-sm mb-6">
                  I'm Shara. Let's have a chat and see if we're the right fit for each other.
                </p>
                
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.1 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-champagne-gold to-[#B8962E] text-deep-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 group"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Message Shara on WhatsApp</span>
                </motion.a>
                
                <p className="text-off-white/50 text-xs mt-5 italic">
                  100% confidential • Usually replies within a few hours
                </p>
              </div>
            </div>
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

            <div className="grid md:grid-cols-2 gap-4 mb-12">
              <RequirementBox text="You're gorgeous and you know how to work it" />
              <RequirementBox text="Smart, interesting, can talk about anything" />
              <RequirementBox text="Reliable - you show up looking fabulous" />
              <RequirementBox text="Discretion is second nature to you" />
              <RequirementBox text="Comfortable in luxury settings (or ready to be)" />
              <RequirementBox text="18+ and ready for exclusive partnership" />
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="bg-charcoal p-8 rounded-lg border border-champagne-gold/30 text-center">
              <p className="text-champagne-gold font-playfair text-xl mb-3">Real Talk</p>
              <p className="text-off-white/80 leading-relaxed">
                I turn down way more girls than I accept. This isn't for everyone - and that's the point. 
                If you're bubbly, beautiful, and brilliant - you're exactly who I'm looking for.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Simple Process + Final CTA */}
        <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-deep-black to-charcoal">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="font-playfair text-4xl text-champagne-gold mb-6">
                How It Works
              </h2>
              <div className="flex flex-wrap justify-center gap-4 text-off-white/70 text-sm">
                <span className="flex items-center gap-2"><span className="text-champagne-gold">1.</span> Message me</span>
                <span className="text-champagne-gold/50">→</span>
                <span className="flex items-center gap-2"><span className="text-champagne-gold">2.</span> Coffee chat</span>
                <span className="text-champagne-gold/50">→</span>
                <span className="flex items-center gap-2"><span className="text-champagne-gold">3.</span> Photos</span>
                <span className="text-champagne-gold/50">→</span>
                <span className="flex items-center gap-2"><span className="text-champagne-gold">4.</span> Start living ✨</span>
              </div>
            </motion.div>

            {/* Final CTA Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-10 bg-gradient-to-br from-charcoal via-deep-black to-charcoal border border-champagne-gold/40 rounded-2xl"
            >
              <p className="text-champagne-gold font-playfair text-2xl mb-3">
                Ready to Change Your Life?
              </p>
              <p className="text-off-white/70 mb-8">
                The sparkling button in the corner is your direct line to me. Or tap below.
              </p>
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.1 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-800 to-rose-900 text-off-white font-semibold rounded-full border border-champagne-gold/50 hover:border-champagne-gold hover:shadow-[0_0_30px_rgba(199,91,122,0.4)] transition-all duration-300"
              >
                <svg className="w-5 h-5 text-champagne-gold" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Let's Chat, Beautiful</span>
              </motion.a>
              <p className="text-off-white/40 text-xs mt-6 italic">
                Everything we discuss stays between us - always
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
      className="flex items-center gap-3 p-4 bg-charcoal/50 border border-champagne-gold/20 rounded-lg"
    >
      <div className="text-champagne-gold text-lg">✓</div>
      <p className="text-off-white/80 text-sm">{text}</p>
    </motion.div>
  )
}

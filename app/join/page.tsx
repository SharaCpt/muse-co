'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'

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
    <main className="bg-deep-black pt-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
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
          <h1 className="font-playfair text-6xl md:text-8xl tracking-[0.2em] text-champagne-gold mb-8 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            JOIN MUSE & CO
          </h1>
          <p className="text-off-white/90 text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto">
            Become part of South Africa's most exclusive modeling and companion agency. 
            <span className="block mt-4 text-champagne-gold/80">We represent the cream of the crop.</span>
          </p>
        </motion.div>
      </section>

      {/* Why Muse & Co */}
      <section className="py-32 px-6 md:px-12 bg-gradient-to-b from-deep-black to-charcoal">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <p className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-4 uppercase">Why Choose Us</p>
          <h2 className="font-playfair text-5xl md:text-6xl text-champagne-gold mb-8 tracking-wide">
            The Muse & Co Difference
          </h2>
          <p className="text-off-white/80 text-lg leading-relaxed">
            We're not just another agency. We curate elite experiences for the world's most discerning clientele, 
            and we only work with exceptional models who embody beauty, intelligence, and sophistication.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <BenefitCard
            icon="✨"
            title="Premium Earnings"
            description="Top-tier compensation for luxury experiences. Our models earn significantly above industry standard because our clients demand excellence and pay accordingly."
          />
          <BenefitCard
            icon="🌍"
            title="Global Opportunities"
            description="Travel internationally with elite clientele. From Dubai to Monaco, experience the world's most exclusive destinations while earning premium rates."
          />
          <BenefitCard
            icon="🛡️"
            title="Safety & Discretion"
            description="Your privacy and safety are paramount. We thoroughly vet all clients and maintain absolute discretion in all arrangements."
          />
          <BenefitCard
            icon="👑"
            title="Exclusive Clientele"
            description="Work with successful business executives, international VIPs, and high-net-worth individuals who appreciate sophistication and elegance."
          />
          <BenefitCard
            icon="💎"
            title="Professional Support"
            description="Personal management, styling guidance, and 24/7 support. We invest in your success and ensure you're always presented at your absolute best."
          />
          <BenefitCard
            icon="🎯"
            title="Selective Placements"
            description="You choose your bookings. We never pressure you. Work when you want, with clients you approve, on your own terms."
          />
        </div>
      </section>

      {/* Who We're Looking For */}
      <section className="py-32 px-6 md:px-12 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.05),transparent_50%)]" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-4 uppercase">Requirements</p>
            <h2 className="font-playfair text-5xl md:text-6xl text-champagne-gold mb-8 tracking-wide">
              Who We're Looking For
            </h2>
            <p className="text-off-white/80 text-lg leading-relaxed">
              We maintain the highest standards because our reputation depends on the exceptional quality of our models. 
              If you embody these qualities, we want to meet you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RequirementCard
              title="Stunning Beauty"
              description="Exceptional physical appearance with a natural elegance. You turn heads and command attention in any room."
            />
            <RequirementCard
              title="Intelligence & Charm"
              description="Articulate, well-spoken, and engaging in conversation. You can connect with sophisticated clientele on multiple levels."
            />
            <RequirementCard
              title="Professionalism"
              description="Reliable, punctual, and committed to excellence. You understand this is a premium service requiring the highest standards and exclusive partnership with our agency."
            />
            <RequirementCard
              title="Discretion & Maturity"
              description="Absolute confidentiality and emotional intelligence. You understand the importance of privacy and conduct yourself accordingly."
            />
            <RequirementCard
              title="Age & Availability"
              description="18+ years old with flexible availability for bookings. You're committed to building a professional relationship with our agency."
            />
            <RequirementCard
              title="Sophisticated Presence"
              description="Comfortable in luxury environments. You're at ease at five-star hotels, exclusive events, and high-society gatherings."
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-8 border-2 border-champagne-gold/30 rounded-lg bg-deep-black/50"
          >
            <h3 className="font-playfair text-2xl text-champagne-gold mb-4 text-center">
              Not For Everyone
            </h3>
            <p className="text-off-white/70 text-center leading-relaxed">
              We're selective by design. We reject far more applicants than we accept. 
              If you're looking for volume bookings or standard escort work, we're not the right fit. 
              We specialize in exclusive, high-end arrangements with elite clientele who expect extraordinary companions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Exclusive Partnership */}
      <section className="py-32 px-6 md:px-12 bg-gradient-to-b from-charcoal to-deep-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(212,175,55,0.06),transparent_60%)]" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-4 uppercase">Our Commitment to You</p>
            <h2 className="font-playfair text-5xl md:text-6xl text-champagne-gold mb-8 tracking-wide">
              Exclusive Partnership
            </h2>
            <p className="text-off-white/80 text-lg leading-relaxed">
              Success in the luxury companion industry requires a strategic approach. 
              Here's why our exclusive representation model benefits you.
            </p>
          </motion.div>

          <div className="space-y-8 mb-12">
            <PartnershipPoint
              title="Higher, Consistent Rates"
              description="When you work exclusively through Muse & Co, we maintain premium pricing. No price wars, no competition from other agents representing you differently. Our clients know your rates are firm, protecting your earning potential and our shared reputation."
            />
            <PartnershipPoint
              title="Comprehensive Safety & Vetting"
              description="Exclusive representation means we track every booking, know where you are, and maintain complete oversight of client interactions. When models work through multiple agencies, safety protocols break down. We can't protect you if we don't know where you are."
            />
            <PartnershipPoint
              title="Brand Investment & Marketing"
              description="We invest heavily in your success - professional photography, client relationship building, personal brand positioning. This investment only makes sense when we're your sole representative. You get better marketing because we're confident in the partnership."
            />
            <PartnershipPoint
              title="Client Trust & Discretion"
              description="Elite clients demand reliability and discretion. They work with Muse & Co because they trust our processes. When models work through multiple agencies, it creates confusion, damages trust, and compromises the confidentiality our clientele require."
            />
            <PartnershipPoint
              title="Professional Growth"
              description="We develop long-term careers, not quick bookings. Exclusive models receive ongoing support, styling guidance, international opportunities, and strategic placements that build sustainable success."
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 border-2 border-champagne-gold/40 rounded-lg bg-gradient-to-br from-rose-900/20 to-deep-black relative overflow-hidden"
          >
            {/* Decorative sparkles */}
            <div className="absolute top-4 right-4 text-champagne-gold text-2xl">✨</div>
            <div className="absolute bottom-4 left-4 text-champagne-gold text-2xl">✨</div>
            
            <h3 className="font-playfair text-2xl text-champagne-gold mb-4 text-center">
              Quality Over Quantity
            </h3>
            <p className="text-off-white/80 text-center leading-relaxed mb-4">
              This isn't a restriction - it's a strategic choice. Models who partner exclusively with Muse & Co earn more, 
              work safer, and build better reputations than those spreading themselves across multiple agencies.
            </p>
            <p className="text-champagne-gold/80 text-center text-sm italic">
              We're building careers, not just filling calendars. That requires commitment from both sides.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-32 px-6 md:px-12 bg-deep-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-4 uppercase">The Process</p>
            <h2 className="font-playfair text-5xl md:text-6xl text-champagne-gold mb-8 tracking-wide">
              What to Expect
            </h2>
          </motion.div>

          <div className="space-y-8">
            <ProcessStep
              number="01"
              title="Initial Contact"
              description="Reach out via WhatsApp. We'll have a brief conversation to learn about you and answer your initial questions. This is informal and pressure-free."
            />
            <ProcessStep
              number="02"
              title="Interview"
              description="If you seem like a good fit, we'll schedule a private meeting. This is your chance to ask questions and for us to get to know you better. We'll discuss expectations, rates, and opportunities."
            />
            <ProcessStep
              number="03"
              title="Professional Photos"
              description="If we proceed, we'll arrange a professional photo session. These images will be used for client introductions (with your approval on every photo used)."
            />
            <ProcessStep
              number="04"
              title="Onboarding"
              description="We'll complete paperwork, discuss client preferences, set your availability, and prepare you for your first booking. You're in complete control of who you meet and when."
            />
            <ProcessStep
              number="05"
              title="Your First Booking"
              description="We'll match you with a vetted client who aligns with your preferences. You'll receive full details, support throughout, and payment immediately after."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 bg-gradient-to-b from-deep-black via-charcoal to-deep-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08),transparent_70%)]" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <p className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-6 uppercase">Ready to Begin?</p>
          <h2 className="font-playfair text-5xl md:text-6xl text-champagne-gold mb-8 tracking-wide">
            Start Your Journey
          </h2>
          <p className="text-off-white/80 text-lg mb-12 leading-relaxed">
            Take the first step towards an extraordinary opportunity. Message Shara directly on WhatsApp 
            to begin a confidential conversation about joining South Africa's most exclusive modeling agency.
          </p>

          {/* Premium Recruitment CTA */}
          <motion.a
            href="https://wa.me/+27607769793?text=Hi%20Shara!%20I'm%20interested%20in%20joining%20Muse%20%26%20Co%20as%20a%20model.%20I'd%20love%20to%20learn%20more%20about%20this%20opportunity%20and%20see%20if%20I'd%20be%20a%20good%20fit.%20Looking%20forward%20to%20hearing%20from%20you!%20✨"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block group max-w-xl w-full"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 25px rgba(212, 175, 55, 0.4), 0 0 40px rgba(199, 91, 122, 0.2)',
                  '0 0 35px rgba(212, 175, 55, 0.6), 0 0 50px rgba(199, 91, 122, 0.3)',
                  '0 0 25px rgba(212, 175, 55, 0.4), 0 0 40px rgba(199, 91, 122, 0.2)',
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-gradient-to-br from-rose-900 via-rose-800 to-pink-900 p-8 rounded-lg border-2 border-champagne-gold hover:border-champagne-gold/80 transition-all duration-300 relative overflow-hidden group-hover:scale-[1.02] shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
            >
              {/* Champagne gold sparkle particles */}
              <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-champagne-gold rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0.2, 0.8, 0.2],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>

              {/* Gold shimmer sweep */}
              <motion.div
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1.5,
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-champagne-gold/20 to-transparent"
              />
              
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <motion.span 
                    className="text-3xl"
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  >
                    ✨
                  </motion.span>
                  <p className="font-playfair text-3xl text-champagne-gold font-semibold tracking-wide">
                    Apply Now
                  </p>
                  <motion.span 
                    className="text-3xl"
                    animate={{
                      rotate: [0, -10, 10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      delay: 0.2,
                    }}
                  >
                    ✨
                  </motion.span>
                </div>
                <p className="text-off-white/90 text-lg font-inter font-light mb-4">
                  Message Shara on WhatsApp
                </p>
                <p className="text-champagne-gold/80 text-sm tracking-wider">
                  +27 60 776 9793
                </p>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-champagne-gold/10 rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-champagne-gold/10 rounded-tr-full" />
            </motion.div>
          </motion.a>

          <p className="text-off-white/50 text-sm mt-8 italic">
            All inquiries are handled with complete confidentiality
          </p>
        </motion.div>
      </section>
    </main>
  )
}

// Benefit Card Component
function BenefitCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-effect p-8 border border-champagne-gold/20 hover:border-champagne-gold/40 transition-all duration-500 group"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-playfair text-xl text-champagne-gold mb-3 tracking-wide">{title}</h3>
      <p className="text-off-white/70 leading-relaxed text-sm font-light">{description}</p>
    </motion.div>
  )
}

// Requirement Card Component
function RequirementCard({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex gap-4"
    >
      <div className="flex-shrink-0 w-2 h-2 bg-champagne-gold rounded-full mt-2" />
      <div>
        <h3 className="text-champagne-gold text-lg font-semibold mb-2 tracking-wide">{title}</h3>
        <p className="text-off-white/70 leading-relaxed text-sm font-light">{description}</p>
      </div>
    </motion.div>
  )
}

// Process Step Component
function ProcessStep({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex gap-6 items-start group"
    >
      <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-champagne-gold flex items-center justify-center bg-deep-black group-hover:bg-champagne-gold/10 transition-all duration-300">
        <span className="font-playfair text-champagne-gold text-lg">{number}</span>
      </div>
      <div>
        <h3 className="text-champagne-gold text-xl font-semibold mb-2 tracking-wide">{title}</h3>
        <p className="text-off-white/70 leading-relaxed font-light">{description}</p>
      </div>
    </motion.div>
  )
}

// Partnership Point Component
function PartnershipPoint({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex gap-4 items-start"
    >
      <div className="flex-shrink-0 w-3 h-3 bg-champagne-gold rounded-full mt-2" />
      <div>
        <h3 className="text-champagne-gold text-xl font-semibold mb-2 tracking-wide">{title}</h3>
        <p className="text-off-white/70 leading-relaxed font-light">{description}</p>
      </div>
    </motion.div>
  )
}

'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface SiteImage {
  id: string
  section: string
  image_url: string
}

export default function HomePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  const [images, setImages] = useState<Record<string, string>>({
    hero: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2400',
    service_card_1: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=1200',
    service_card_2: 'https://images.unsplash.com/photo-1522255272218-7ac5249be344?q=80&w=1200',
    service_card_3: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200',
    service_card_4: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
  })

  const [modelImages, setModelImages] = useState({
    model_card_1: 'https://images.unsplash.com/photo-1612874470096-d93a610de87b?q=80&w=800',
    model_card_2: 'https://images.unsplash.com/photo-1540316264016-aeb7538f4d6f?q=80&w=800',
    model_card_3: 'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?q=80&w=800',
  })

  useEffect(() => {
    fetchImages()
  }, [])

  async function fetchImages() {
    try {
      // Fetch from site_images table
      const { data, error } = await supabase
        .from('site_images')
        .select('*')
        .eq('page', 'Homepage')

      if (error) throw error

      if (data && data.length > 0) {
        const serviceImages: Record<string, string> = {}
        const modelImgs: Record<string, string> = {}
        
        data.forEach((img: SiteImage) => {
          if (img.section === 'hero') {
            serviceImages.hero = img.image_url
          } else if (img.section.startsWith('service_card_')) {
            serviceImages[img.section] = img.image_url
          } else if (img.section.startsWith('model_card_')) {
            modelImgs[img.section] = img.image_url
          }
        })
        
        if (Object.keys(serviceImages).length > 0) {
          setImages(prev => ({ ...prev, ...serviceImages }))
        }
        if (Object.keys(modelImgs).length > 0) {
          setModelImages(prev => ({ ...prev, ...modelImgs }))
        }
      }
    } catch (error) {
      console.error('Error fetching site images:', error)
    }
  }

  return (
    <main className="bg-deep-black">
      {/* Hero Section - Ultra Premium */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div style={{ scale }} className="absolute inset-0 z-0">
          <Image
            src={images.hero}
            alt="Elite luxury companion services Cape Town"
            fill
            unoptimized
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-black/80 via-deep-black/50 to-deep-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-black/60 via-transparent to-deep-black/60" />
        </motion.div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 z-[1]">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-champagne-gold/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative z-10 text-center px-6 max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-champagne-gold/80 text-sm tracking-[0.3em] mb-6 uppercase font-light">
              Global Luxury • Based in Cape Town
            </p>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="font-playfair text-7xl md:text-9xl tracking-[0.2em] text-off-white mb-8 drop-shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          >
            MUSE & CO
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="font-inter text-xl md:text-2xl tracking-[0.2em] text-off-white/90 mb-6 uppercase font-light"
          >
            Elite Companions • VIP Experiences • Global Luxury
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-off-white/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Curating South Africa's most beautiful models and sophisticated companions for luxury experiences worldwide. From intimate private encounters to exclusive international arrangements, 
            we deliver unparalleled beauty, elegance, and absolute discretion to discerning clientele across the globe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link
              href="/portfolio"
              className="group relative px-12 py-4 bg-champagne-gold text-deep-black font-inter tracking-[0.15em] hover:bg-champagne-gold/90 transition-all duration-300 overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.6)]"
            >
              <span className="relative z-10">VIEW PORTFOLIO</span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
            </Link>
            
            <Link
              href="/contact"
              className="px-12 py-4 border-2 border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-deep-black transition-all duration-300 tracking-[0.15em] shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)]"
            >
              BOOK NOW
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-champagne-gold/50 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1 h-2 bg-champagne-gold rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Elite Portfolio Preview - Image-Driven */}
      <section className="py-32 px-6 md:px-12 bg-deep-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.05),transparent_50%)]" />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-4 uppercase">Our Models</p>
            <h2 className="font-playfair text-5xl md:text-7xl text-off-white mb-6 tracking-wide">
              Elite Beauty
            </h2>
            <p className="text-off-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Exceptional models and sophisticated companions for luxury experiences, private arrangements, and exclusive international encounters. 
              Beauty, intelligence, and absolute discretion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: modelImages.model_card_1,
                category: "Event Hostess",
                name: "Available on Request",
                description: "Professional elegance for corporate galas"
              },
              {
                image: modelImages.model_card_2,
                category: "Private Companion",
                name: "Available on Request",
                description: "Intimate elegance for discerning clientele"
              },
              {
                image: modelImages.model_card_3,
                category: "VIP Hostess",
                name: "Available on Request",
                description: "Exclusive companionship for high-profile events"
              }
            ].map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative overflow-hidden"
              >
                <div className="relative h-[500px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
                  <Image
                    src={model.image}
                    alt={model.category}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/60 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
                  
                  {/* Glass morphism overlay */}
                  <div className="absolute inset-0 glass-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <motion.div 
                    className="absolute inset-0 border-2 border-champagne-gold/0 group-hover:border-champagne-gold/60 transition-all duration-500"
                    whileHover={{ scale: 0.95 }}
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-champagne-gold text-sm tracking-[0.25em] mb-2 uppercase font-light">{model.category}</p>
                    <p className="text-off-white text-xl font-playfair mb-2">{model.name}</p>
                    <p className="text-off-white/60 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {model.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-20"
          >
            <Link
              href="/portfolio"
              className="inline-block px-12 py-4 border-2 border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-deep-black transition-all duration-300 tracking-[0.15em] shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] font-light"
            >
              EXPLORE FULL PORTFOLIO
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Luxury Services - Image-Heavy with Glass Effect */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-deep-black via-charcoal to-deep-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(212,175,55,0.08),transparent_60%)]" />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-4 uppercase">Exclusive Services</p>
            <h2 className="font-playfair text-5xl md:text-7xl text-off-white mb-6 tracking-wide">
              Curated Experiences
            </h2>
            <p className="text-off-white/70 text-lg max-w-2xl mx-auto">
              Bespoke companionship and private experiences for the world's most discerning clientele
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ServiceCard
              image={images.service_card_1}
              title="VIP Nightlife & Events"
              description="Transform your venue into an exclusive destination. Our elite VIP hostesses bring sophistication and magnetic energy to Cape Town's most prestigious clubs, galas, and private celebrations."
              features={["Elite VIP Hostesses", "Professional Bottle Service", "Event Entertainment", "Private Party Staffing"]}
            />
            
            <ServiceCard
              image={images.service_card_2}
              title="Luxury Concierge Services"
              description="Elevated experiences for yachts, villas, and exclusive estates. Our lifestyle models provide sophisticated companionship and professional service for your most intimate gatherings."
              features={["Yacht Staffing & Models", "Private Villa Events", "Golf Event Hostesses", "Executive Companions"]}
            />
            
            <ServiceCard
              image={images.service_card_3}
              title="Elite Travel Companionship"
              description="Sophisticated companions for business and leisure travel worldwide. Our refined models provide elegant companionship, cultural insight, and discretion for international journeys and exclusive destinations."
              features={["International Travel Companions", "Executive Business Travel", "Luxury Destination Experiences", "VIP Airport & Event Escorts"]}
            />
            
            <ServiceCard
              image={images.service_card_4}
              title="Bespoke Private Events"
              description="Personalized elegance for your exclusive occasions. From intimate dinner parties to grand celebrations, our hand-selected professionals ensure every detail exceeds expectations."
              features={["Private Dinner Hosting", "Luxury Party Staffing", "VIP Guest Services", "Personalized Experiences"]}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-20"
          >
            <Link
              href="/services"
              className="inline-block px-12 py-4 border-2 border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-deep-black transition-all duration-300 tracking-[0.15em] shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] font-light"
            >
              EXPLORE SERVICES
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials - Elegant Cards */}
      <section className="py-32 px-6 md:px-12 bg-deep-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03),transparent_70%)]" />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-4 uppercase">Client Testimonials</p>
            <h2 className="font-playfair text-5xl md:text-7xl text-off-white tracking-wide">
              Trusted Excellence
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "MUSE & CO consistently delivers world-class VIP hostesses for our exclusive events. Their professionalism and elegance are unmatched in Cape Town.",
                author: "Marcus V.",
                role: "Private Events Director"
              },
              {
                quote: "Shara's agency has been our go-to for four years. They understand luxury hospitality like no one else. Absolutely worth every cent for the level of sophistication.",
                author: "Alistair K.",
                role: "Luxury Hotel Manager"
              },
              {
                quote: "From intimate gatherings to international arrangements, MUSE & CO delivers exceptional beauty and absolute discretion. Their refined companions truly understand the art of luxury companionship.",
                author: "Alessandro M.",
                role: "Private Client"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="glass-effect p-8 border border-champagne-gold/20 hover:border-champagne-gold/40 transition-all duration-500 group"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-champagne-gold text-lg">★</span>
                  ))}
                </div>
                
                <p className="text-off-white/80 leading-relaxed mb-6 italic font-light">
                  "{testimonial.quote}"
                </p>
                
                <div className="border-t border-champagne-gold/20 pt-4">
                  <p className="text-champagne-gold font-semibold tracking-wider">{testimonial.author}</p>
                  <p className="text-off-white/50 text-sm mt-1">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats Section - Luxury Showcase */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-deep-black via-charcoal to-deep-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-champagne-gold rounded-full filter blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-champagne-gold rounded-full filter blur-[128px]" />
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto relative z-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { number: "15+", label: "Years Experience" },
              { number: "1000+", label: "Events Staffed" },
              { number: "500+", label: "Elite Models" },
              { number: "100%", label: "Client Satisfaction" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-playfair text-5xl md:text-6xl text-champagne-gold mb-3 luxury-text-shadow">
                  {stat.number}
                </div>
                <div className="text-off-white/70 text-sm tracking-[0.2em] uppercase font-light">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section - Premium */}
      <section className="py-32 px-6 md:px-12 bg-deep-black relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2400"
            alt="Luxury event background"
            fill
            unoptimized
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-deep-black/80 to-deep-black" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <p className="text-champagne-gold/80 text-sm tracking-[0.3em] mb-6 uppercase font-light">
            Ready to Elevate Your Event?
          </p>
          <h2 className="font-playfair text-5xl md:text-7xl text-off-white mb-8 tracking-wide">
            Let's Create Something Extraordinary
          </h2>
          <p className="text-off-white/70 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the MUSE & CO difference. Elite staffing for discerning clients who demand nothing but perfection.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contact"
              className="px-12 py-5 bg-champagne-gold text-deep-black font-semibold tracking-[0.15em] hover:bg-champagne-gold/90 transition-all duration-300 shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.6)] text-sm uppercase"
            >
              Book Consultation
            </Link>
            
            <Link
              href="/portfolio"
              className="px-12 py-5 border-2 border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-deep-black transition-all duration-300 tracking-[0.15em] shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] text-sm uppercase font-light"
            >
              View Portfolio
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}

// Service Card Component with Glass Effect
function ServiceCard({ 
  image, 
  title, 
  description, 
  features 
}: { 
  image: string
  title: string
  description: string
  features: string[]
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.9)] hover:shadow-[0_25px_90px_rgba(212,175,55,0.15)] transition-all duration-700"
    >
      {/* Background Image */}
      <div className="relative h-80 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          unoptimized
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/80 to-deep-black/40" />
        
        {/* Glass morphism overlay */}
        <div className="absolute inset-0 glass-effect opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
      
      <div className="relative -mt-32 px-8 pb-8">
        {/* Gold accent line */}
        <div className="w-16 h-[2px] bg-gradient-to-r from-champagne-gold to-transparent mb-6 shimmer" />
        
        <h3 className="font-playfair text-3xl text-champagne-gold mb-4 tracking-wide group-hover:text-champagne-gold/90 transition-colors">
          {title}
        </h3>
        <p className="text-off-white/70 leading-relaxed mb-6 font-light">
          {description}
        </p>
        
        <div className="space-y-2">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center text-off-white/60 text-sm"
            >
              <span className="text-champagne-gold mr-3 text-xs">◆</span>
              {feature}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Gradient border effect */}
      <div className="absolute inset-0 border-2 border-champagne-gold/0 group-hover:border-champagne-gold/30 transition-all duration-700 pointer-events-none gradient-border" />
    </motion.div>
  )
}

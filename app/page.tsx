'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import {
  heroVariants,
  heroFadeIn,
  heroStagger,
  sectionVariants,
  sectionFadeIn,
  cardVariants,
  microFadeIn,
  primaryCTAHover,
  primaryCTATap,
  secondaryCTATap,
  viewportOnce,
} from '@/lib/motion'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface SiteImage {
  id: string
  section: string
  image_url: string
}

interface SiteContent {
  id: string
  content: string
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
    hero: 'https://images.unsplash.com/photo-1611305548077-3a945eb29457?q=80&w=2400&auto=format&fit=crop',
    service_card_1: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=1200',
    service_card_2: 'https://images.unsplash.com/photo-1522255272218-7ac5249be344?q=80&w=1200',
    service_card_3: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200',
    service_card_4: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
    service_card_5: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200',
    service_card_6: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=1200',
  })

  const [modelImages, setModelImages] = useState({
    model_card_1: 'https://images.unsplash.com/photo-1612874470096-d93a610de87b?q=80&w=800',
    model_card_2: 'https://images.unsplash.com/photo-1540316264016-aeb7538f4d6f?q=80&w=800',
    model_card_3: 'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?q=80&w=800',
  })

  // Editable content with defaults
  const [content, setContent] = useState({
    heroTagline: 'Elite Companions • VIP Experiences • Global Luxury',
    heroSubtitle: 'Curating South Africa\'s most beautiful models and sophisticated companions for luxury experiences worldwide. From exclusive private arrangements to international lifestyle experiences, we deliver unparalleled beauty, elegance, and absolute discretion to discerning clientele across the globe.',
  })

  useEffect(() => {
    fetchImages()
    fetchContent()
  }, [])

  async function fetchContent() {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .in('id', ['home_hero_tagline', 'home_hero_subtitle'])

      if (error) throw error

      if (data && data.length > 0) {
        const newContent: Record<string, string> = {}
        data.forEach((item: SiteContent) => {
          if (item.id === 'home_hero_tagline') newContent.heroTagline = item.content
          if (item.id === 'home_hero_subtitle') newContent.heroSubtitle = item.content
        })
        setContent(prev => ({ ...prev, ...newContent }))
      }
    } catch (error) {
      console.error('Error fetching content:', error)
    }
  }

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
          // Skip hero - it's hardcoded, not from database
          if (img.section === 'hero') {
            return
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
          {images.hero && (
            <Image
              src={images.hero}
              alt="Elite luxury companion and model services South Africa — Cape Town, Johannesburg, Durban"
              fill
              unoptimized
              className="object-cover object-center"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-deep-black/40 via-deep-black/25 to-deep-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-black/30 via-transparent to-deep-black/30" />
        </motion.div>

        {/* Floating particles effect — reduced for elegance */}
        <div className="absolute inset-0 z-[1]">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-champagne-gold/20 rounded-full"
              style={{
                left: `${(i * 10.5 + 3) % 100}%`,
                top: `${(i * 12.3 + 5) % 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 5 + (i % 3),
                repeat: Infinity,
                delay: (i % 5) * 0.6,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity }}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-6 max-w-5xl"
        >
          <motion.div
            variants={heroFadeIn}
            custom={heroStagger.label}
          >
            <p className="text-champagne-gold/80 text-sm tracking-[0.3em] mb-6 uppercase font-light">
              Global Luxury • Based in Cape Town
            </p>
          </motion.div>
          
          <motion.p 
            variants={heroVariants}
            custom={heroStagger.title}
            className="font-playfair text-7xl md:text-9xl tracking-[0.2em] text-off-white mb-4 drop-shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            aria-hidden="true"
          >
            MUSE & CO
          </motion.p>

          <motion.h1
            variants={heroFadeIn}
            custom={heroStagger.tagline}
            className="font-inter text-xl md:text-2xl tracking-[0.2em] text-off-white/90 mb-6 uppercase font-light"
          >
            Elite Companions & Private Event Models — Cape Town
          </motion.h1>
          
          <motion.p
            variants={heroFadeIn}
            custom={heroStagger.subtitle}
            className="text-off-white/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
          >
            {content.heroSubtitle}
          </motion.p>

          <motion.div
            variants={heroFadeIn}
            custom={heroStagger.cta}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {/* Primary CTA — lift + glow + shine sweep */}
            <motion.div
              whileHover={primaryCTAHover}
              whileTap={primaryCTATap}
            >
              <Link
                href="/portfolio"
                className="group relative px-12 py-4 bg-champagne-gold text-deep-black font-inter tracking-[0.15em] transition-all duration-300 overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.4)] block"
              >
                <span className="relative z-10 font-semibold">VIEW PORTFOLIO</span>
                {/* Shine sweep on hover */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </Link>
            </motion.div>
            
            {/* Secondary CTA — calm border fill */}
            <motion.div whileTap={secondaryCTATap}>
              <Link
                href="/contact"
                className="px-12 py-4 border-2 border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-deep-black transition-all duration-300 tracking-[0.15em] shadow-[0_0_20px_rgba(212,175,55,0.15)] block"
              >
                BOOK NOW
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: heroStagger.scroll }}
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
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionFadeIn}
          className="max-w-7xl mx-auto relative z-10"
        >
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
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
                category: "Dancers & Entertainers",
                name: "Available on Request",
                description: "Sophisticated elegance for exclusive events"
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
                variants={cardVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
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
            variants={cardVariants}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mt-20"
          >
            <Link
              href="/portfolio"
              className="inline-block px-12 py-4 border-2 border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-deep-black transition-all duration-300 tracking-[0.15em] shadow-[0_0_20px_rgba(212,175,55,0.15)] font-light"
            >
              EXPLORE FULL PORTFOLIO
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* — Statement Break — editorial pause */}
      <section className="py-20 md:py-28 px-6 bg-deep-black relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-12 bg-gradient-to-b from-transparent to-champagne-gold/40" />
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="font-playfair text-3xl md:text-5xl text-off-white/90 leading-snug tracking-wide">
            Where <span className="text-champagne-gold italic">beauty</span> meets <span className="text-champagne-gold italic">discretion</span>
          </p>
        </motion.div>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-px h-12 bg-gradient-to-b from-champagne-gold/40 to-transparent" />
      </section>

      {/* Luxury Services - Image-Heavy with Glass Effect */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-deep-black via-charcoal to-deep-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(212,175,55,0.08),transparent_60%)]" />
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionFadeIn}
          className="max-w-7xl mx-auto relative z-10"
        >
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              image={images.service_card_1}
              title="Private Dining & Social Companions"
              description="Elegant dinner companions for restaurants, wine tastings, galas, and social events. Intelligent, refined women who elevate any occasion."
              features={["Restaurant Dinner Companions", "Wine Tasting Partners", "Social Event & Gala Dates"]}
            />
            
            <ServiceCard
              image={images.service_card_2}
              title="Yacht & Villa Event Models"
              description="Professional models and hostesses for yacht parties, villa events, pool parties, and luxury coastal celebrations."
              features={["Yacht Party Models", "Villa Event Hostesses", "Pool Party & Coastal Events"]}
            />
            
            <ServiceCard
              image={images.service_card_3}
              title="Private Event Hostesses"
              description="Professional hostesses for your corporate dinner, golf day, poker evening, or private celebration. You choose — we arrange."
              features={["Corporate Dinner Companions", "Golf Day Hostesses", "Private Party Models"]}
            />
            
            <ServiceCard
              image={images.service_card_4}
              title="Party & Nightlife Companions"
              description="Choose your ideal companions for club nights, private parties, celebrations, and VIP nightlife experiences."
              features={["Club Night Companions", "Private Party Models", "VIP Nightlife Dates"]}
            />
            
            <ServiceCard
              image={images.service_card_5}
              title="Elite Private Companionship"
              description="Exclusive private arrangements and ongoing bespoke companionship. Personalised matching with absolute confidentiality."
              features={["Private Arrangements", "Ongoing Companionship", "Bespoke Matching"]}
            />
            
            <ServiceCard
              image={images.service_card_6}
              title="Travel Companions"
              description="Sophisticated travel companions for domestic and international trips. Experienced, well-travelled women for business or leisure."
              features={["International Travel", "Business Trip Companions", "Safari & Holiday Partners"]}
            />
          </div>

          <motion.div
            variants={cardVariants}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mt-20"
          >
            <Link
              href="/services"
              className="inline-block px-12 py-4 border-2 border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-deep-black transition-all duration-300 tracking-[0.15em] shadow-[0_0_20px_rgba(212,175,55,0.15)] font-light"
            >
              EXPLORE SERVICES
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* — Statement Break 2 — */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-b from-charcoal/30 to-deep-black relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-10 bg-gradient-to-b from-transparent to-champagne-gold/30" />
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="font-playfair text-2xl md:text-4xl text-off-white/80 leading-relaxed tracking-wide">
            Curated for the <span className="text-champagne-gold">world's most discerning</span> clientele
          </p>
        </motion.div>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-px h-10 bg-gradient-to-b from-champagne-gold/30 to-transparent" />
      </section>

      {/* CTA Section - Premium */}
      <section className="py-32 px-6 md:px-12 bg-deep-black relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2400"
            alt="Luxury companion event setting South Africa — elite VIP experience background"
            fill
            unoptimized
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-deep-black/80 to-deep-black" />
        </div>
        
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <p className="text-champagne-gold/80 text-sm tracking-[0.3em] mb-6 uppercase font-light">
            Exclusive Access
          </p>
          <h2 className="font-playfair text-5xl md:text-7xl text-off-white mb-8 tracking-wide">
            Experience Unparalleled Elegance
          </h2>
          <p className="text-off-white/70 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover South Africa's most sophisticated companions. Curated beauty, refined intelligence, and absolute discretion for the world's most discerning clientele.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.div whileHover={primaryCTAHover} whileTap={primaryCTATap}>
              <Link
                href="/contact"
                className="group relative px-12 py-5 bg-champagne-gold text-deep-black font-semibold tracking-[0.15em] transition-all duration-300 shadow-[0_0_40px_rgba(212,175,55,0.4)] text-sm uppercase block overflow-hidden"
              >
                <span className="relative z-10">Private Inquiry</span>
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </Link>
            </motion.div>
            
            <motion.div whileTap={secondaryCTATap}>
              <Link
                href="/portfolio"
                className="px-12 py-5 border-2 border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-deep-black transition-all duration-300 tracking-[0.15em] shadow-[0_0_20px_rgba(212,175,55,0.15)] text-sm uppercase font-light block"
              >
                View Portfolio
              </Link>
            </motion.div>
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
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="group relative overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.9)] hover:shadow-[0_25px_90px_rgba(212,175,55,0.15)] transition-all duration-500"
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
              variants={microFadeIn}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
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

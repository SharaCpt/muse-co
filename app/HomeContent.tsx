'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import CTAButton from '@/components/CTAButton'
import {
  heroVariants,
  heroFadeIn,
  heroStagger,
  sectionVariants,
  sectionFadeIn,
  cardVariants,
  viewportOnce,
} from '@/lib/motion'
import { BLUR_DATA_URL, SIZES } from '@/lib/image-utils'

interface HomeContentProps {
  images: Record<string, string>
  modelImages: Record<string, string>
  content: {
    heroTagline: string
    heroSubtitle: string
  }
}

export default function HomeContent({ images, modelImages, content }: HomeContentProps) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

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
              className="object-cover object-center"
              priority
              sizes={SIZES.hero}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-deep-black/40 via-deep-black/25 to-deep-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-black/30 via-transparent to-deep-black/30" />
        </motion.div>

        {/* Floating particles effect */}
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
            <CTAButton href="/portfolio" variant="primary">View Portfolio</CTAButton>
            <CTAButton href="/contact" variant="secondary" icon={false}>Book Now</CTAButton>
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

      {/* Elite Portfolio Preview */}
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
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes={SIZES.threeCol}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/60 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
                  
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
            <CTAButton href="/portfolio" variant="secondary">Explore Full Portfolio</CTAButton>
          </motion.div>
        </motion.div>
      </section>

      {/* Statement Moment — one large, slow idea filling the screen, not a paragraph */}
      <section className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center px-6 bg-deep-black overflow-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-16 bg-gradient-to-b from-transparent to-champagne-gold/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.06),transparent_60%)]" />
        <motion.div
          variants={heroVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          <p className="font-playfair text-5xl md:text-8xl text-off-white/95 leading-[1.15] tracking-wide">
            Where <span className="text-champagne-gold italic">beauty</span> meets
            <br className="hidden md:block" /> <span className="text-champagne-gold italic">discretion</span>
          </p>
        </motion.div>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-px h-16 bg-gradient-to-b from-champagne-gold/40 to-transparent" />
      </section>

      {/* Luxury Services — one experience revealed at a time, not a wall of cards */}
      <section className="relative overflow-hidden bg-charcoal">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(212,175,55,0.08),transparent_60%)]" />

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative z-10 max-w-4xl mx-auto text-center pt-32 px-6"
        >
          <p className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-4 uppercase">Exclusive Services</p>
          <h2 className="font-playfair text-5xl md:text-7xl text-off-white mb-6 tracking-wide">
            Curated Experiences
          </h2>
          <p className="text-off-white/70 text-lg max-w-2xl mx-auto">
            Bespoke companionship and private experiences for the world&apos;s most discerning clientele
          </p>
        </motion.div>

        <div className="relative z-10">
          <ServiceRow
            index={0}
            image={images.service_card_1}
            title="Private Dining & Social Companions"
            description="Elegant dinner companions for restaurants, wine tastings, galas, and social events. Intelligent, refined companions who elevate any occasion."
            features={["Restaurant Dinner Companions", "Wine Tasting Partners", "Social Event & Gala Dates"]}
          />
          <ServiceRow
            index={1}
            image={images.service_card_2}
            title="Yacht & Villa Event Models"
            description="Professional models and hostesses for yacht parties, villa events, pool parties, and luxury coastal celebrations."
            features={["Yacht Party Models", "Villa Event Hostesses", "Pool Party & Coastal Events"]}
          />
          <ServiceRow
            index={2}
            image={images.service_card_3}
            title="Private Event Hostesses"
            description="Professional hostesses for your corporate dinner, golf day, poker evening, or private celebration. You choose — we arrange."
            features={["Corporate Dinner Companions", "Golf Day Hostesses", "Private Party Models"]}
          />
          <ServiceRow
            index={3}
            image={images.service_card_4}
            title="Party & Nightlife Companions"
            description="Choose your ideal companions for club nights, private parties, celebrations, and VIP nightlife experiences."
            features={["Club Night Companions", "Private Party Models", "VIP Nightlife Dates"]}
          />
          <ServiceRow
            index={4}
            image={images.service_card_5}
            title="Elite Private Companionship"
            description="Exclusive private arrangements and ongoing bespoke companionship. Personalised matching with absolute confidentiality."
            features={["Private Arrangements", "Ongoing Companionship", "Bespoke Matching"]}
          />
          <ServiceRow
            index={5}
            image={images.service_card_6}
            title="Travel Companions"
            description="Sophisticated travel companions for domestic and international trips. Experienced, well-travelled models for business or leisure."
            features={["International Travel", "Business Trip Companions", "Safari & Holiday Partners"]}
            isLast
          />
        </div>

        <motion.div
          variants={cardVariants}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative z-10 text-center pb-32 px-6"
        >
          <CTAButton href="/services" variant="secondary">Explore Services</CTAButton>
        </motion.div>
      </section>

      {/* Statement Break 2 */}
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
            Curated for the <span className="text-champagne-gold">world&apos;s most discerning</span> clientele
          </p>
        </motion.div>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-px h-10 bg-gradient-to-b from-champagne-gold/30 to-transparent" />
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 bg-deep-black relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2400"
            alt="Luxury companion event setting South Africa — elite VIP experience background"
            fill
            className="object-cover opacity-20"
            sizes={SIZES.hero}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
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
            Discover South Africa&apos;s most sophisticated companions. Curated beauty, refined intelligence, and absolute discretion for the world&apos;s most discerning clientele.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <CTAButton href="/contact" variant="primary">Private Inquiry</CTAButton>
            <CTAButton href="/portfolio" variant="secondary">View Portfolio</CTAButton>
          </div>
        </motion.div>
      </section>
    </main>
  )
}

function ServiceRow({
  image,
  title,
  description,
  features,
  index,
  isLast,
}: {
  image: string
  title: string
  description: string
  features: string[]
  index: number
  isLast?: boolean
}) {
  const reversed = index % 2 === 1

  return (
    <motion.div
      variants={sectionFadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`relative grid md:grid-cols-2 max-w-7xl mx-auto items-stretch ${
        !isLast ? 'border-b border-champagne-gold/10' : ''
      }`}
    >
      <div className={`relative h-[50vh] md:h-[70vh] overflow-hidden ${reversed ? 'md:order-2' : ''}`}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes={SIZES.twoCol}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-black/50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-transparent" />
      </div>

      <div className={`flex flex-col justify-center px-6 py-16 md:px-16 md:py-0 ${reversed ? 'md:order-1' : ''}`}>
        <span className="font-inter text-champagne-gold/40 text-sm tracking-[0.3em] mb-4">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="font-playfair text-4xl md:text-5xl text-off-white mb-6 tracking-wide">
          {title}
        </h3>
        <p className="text-off-white/70 leading-relaxed mb-8 text-lg font-light max-w-md">
          {description}
        </p>

        <div className="space-y-3">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center text-off-white/60 text-sm">
              <span className="text-champagne-gold mr-3 text-xs">◆</span>
              {feature}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

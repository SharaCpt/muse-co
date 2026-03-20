'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  heroVariants,
  heroFadeIn,
  heroStagger,
  sectionVariants,
  sectionFadeIn,
  cardVariants,
  primaryCTAHover,
  primaryCTATap,
  viewportOnce,
} from '@/lib/motion'
import { BLUR_DATA_URL, SIZES } from '@/lib/image-utils'

interface ServicesContentProps {
  headerImage: string
  serviceImages: Record<string, string>
  content: {
    intro: string
    dining: string
    yacht: string
    events: string
    nightlife: string
    private: string
    travel: string
  }
}

export default function ServicesContent({ headerImage, serviceImages, content }: ServicesContentProps) {
  return (
    <main className="bg-deep-black pt-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={headerImage}
            alt="Elite companion services South Africa — luxury VIP companionship Cape Town Johannesburg Durban"
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
          <motion.p variants={heroFadeIn} custom={heroStagger.label} className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-4 uppercase">Curated Excellence</motion.p>
          <motion.h1
            variants={heroVariants}
            custom={heroStagger.title}
            className="font-playfair text-6xl md:text-8xl tracking-[0.15em] text-champagne-gold mb-6 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            SERVICES
          </motion.h1>
          <motion.p variants={heroFadeIn} custom={heroStagger.tagline} className="text-off-white/80 text-lg md:text-xl tracking-wide mb-4">
            You Choose — We Arrange
          </motion.p>
          <motion.p variants={heroFadeIn} custom={heroStagger.subtitle} className="text-off-white/50 text-sm tracking-widest mb-8">
            CAPE TOWN • JOHANNESBURG • DURBAN • PRETORIA • INTERNATIONAL
          </motion.p>
        </motion.div>
      </section>

      {/* Intro */}
      <section className="py-16 px-6 md:px-12 bg-deep-black">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            variants={sectionFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-off-white/80 text-lg md:text-xl font-inter leading-relaxed"
          >
            {content.intro}
          </motion.p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto space-y-24">
          <ServiceDetail
            title="PRIVATE DINING & SOCIAL COMPANIONS"
            image={serviceImages.dining_companions}
            description={content.dining}
            features={[
              'Restaurant dinner companions for business or pleasure',
              'Wine tasting and fine dining event partners',
              'Social event and gala companions',
              'After-dinner lounge and nightlife company',
              'Discreet, intelligent conversation partners',
            ]}
            reverse={false}
          />

          <ServiceDetail
            title="YACHT & VILLA EVENT MODELS"
            image={serviceImages.yacht_villa}
            description={content.yacht}
            features={[
              'Yacht party models and hostesses',
              'Private villa and estate event staff',
              'Pool party and coastal celebration models',
              'Luxury boat day companions',
              'Bespoke event entertainment',
            ]}
            reverse={true}
          />

          <ServiceDetail
            title="PRIVATE EVENT HOSTESSES"
            image={serviceImages.private_events}
            description={content.events}
            features={[
              'Corporate dinner and deal-closing companions',
              'Golf day and sporting event hostesses',
              'Professional poker and gaming dealers',
              'Private celebration and party hostesses',
              'VIP client entertainment',
            ]}
            reverse={false}
          />

          <ServiceDetail
            title="PARTY & NIGHTLIFE COMPANIONS"
            image={serviceImages.party_nightlife}
            description={content.nightlife}
            features={[
              'Club night and VIP table companions',
              'Private party and celebration models',
              'Bottle service and lounge companions',
              'Birthday and bachelor event models',
              'After-dinner nightlife companions',
            ]}
            reverse={true}
          />

          <ServiceDetail
            title="ELITE PRIVATE COMPANIONSHIP"
            image={serviceImages.private_companionship}
            description={content.private}
            features={[
              'Exclusive private arrangements',
              'Ongoing bespoke companionship',
              'Long-term discreet relationships',
              'Personalised companion matching',
              'Absolute confidentiality guaranteed',
            ]}
            reverse={false}
          />

          <ServiceDetail
            title="TRAVEL COMPANIONS"
            image={serviceImages.travel_companions}
            description={content.travel}
            features={[
              'Domestic travel companions across South Africa',
              'International travel to Mauritius, Dubai, London and beyond',
              'Business trip companionship',
              'Luxury holiday and safari companions',
              'Experienced, well-travelled companions',
            ]}
            reverse={true}
          />
        </div>
      </section>

      {/* FAQ Section — with FAQPage schema for featured snippets */}
      <section className="py-32 px-6 md:px-12 bg-deep-black relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What services does MUSE & CO offer?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'MUSE & CO provides private dining companions, yacht and villa event models, private event hostesses, party and nightlife companions, elite private companionship, and travel companions across South Africa and internationally. You browse our portfolio and choose — we arrange everything.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Do you provide models for private events and yacht parties?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. Browse our portfolio, choose who you want, and we arrange professional models and hostesses for your yacht party, villa event, pool party, private celebration, or corporate function.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Can I book a dinner companion in Cape Town or Johannesburg?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Absolutely. MUSE & CO arranges elegant dinner companions for restaurants, wine tastings, galas and social events in Cape Town, Johannesburg, Sandton, Durban, Pretoria, Stellenbosch, and nationwide.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Can I book companions for a private party or night out?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. Browse our portfolio and choose your ideal companions for private parties, club nights, celebrations, bachelor events, and VIP nightlife experiences across Cape Town, Johannesburg, and nationwide.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Can I request a companion for international travel?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. MUSE & CO arranges sophisticated travel companions for international trips including Mauritius, Dubai, London, and other worldwide destinations. Our companions are experienced travellers who provide elegant companionship anywhere in the world.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is your service completely confidential?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Absolute discretion is the foundation of everything we do. Every client is personally vetted, and all interactions remain strictly confidential. We never share client information under any circumstances.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How do I book through MUSE & CO?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Simply contact Shara directly via WhatsApp or phone. Describe your preferences, dates, and location, and she will personally curate the perfect companion or model for your experience. All enquiries are handled with absolute discretion.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What are your rates?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Visit our Pricing page for transparent starting rates. Bespoke experiences such as yacht charters, event models, international travel, and corporate packages are quoted individually. Contact Shara for a personalised quote.',
                  },
                },
              ],
            }),
          }}
        />

        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-16"
          >
            <p className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-4 uppercase">Common Questions</p>
            <h2 className="font-playfair text-4xl md:text-5xl text-champagne-gold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-off-white/60 text-lg">
              Everything you need to know about our elite companion services across South Africa
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: 'What services does MUSE & CO offer?', a: 'We provide private dining companions, yacht and villa event models, private event hostesses, party and nightlife companions, elite private companionship, and travel companions across South Africa and internationally.' },
              { q: 'Do you provide models for private events and yacht parties?', a: 'Yes. Browse our portfolio, choose who you want, and we arrange professional models and hostesses for your yacht party, villa event, pool party, private celebration, or corporate function.' },
              { q: 'Can I book a dinner companion in Cape Town or Johannesburg?', a: 'Absolutely. Browse our portfolio and choose an elegant dinner companion for restaurants, wine tastings, galas and social events in Cape Town, Johannesburg, Sandton, Durban, Pretoria, Stellenbosch, and nationwide.' },
              { q: 'Can I book companions for a private party or night out?', a: 'Yes. Browse our portfolio and choose your ideal companions for private parties, club nights, celebrations, bachelor events, and VIP nightlife experiences across Cape Town, Johannesburg, and nationwide.' },
              { q: 'Can I request a companion for international travel?', a: 'Yes. MUSE & CO arranges sophisticated travel companions for international trips including Mauritius, Dubai, London, and other worldwide destinations. Our companions are experienced travellers who provide elegant companionship anywhere in the world.' },
              { q: 'Is your service completely confidential?', a: 'Absolute discretion is the foundation of everything we do. Every client is personally vetted, and all interactions remain strictly confidential. We never share client information under any circumstances.' },
              { q: 'How do I book through MUSE & CO?', a: 'Simply contact Shara directly via WhatsApp or phone. Describe your preferences, dates, and location, and she will personally curate the perfect companion or model for your experience. All enquiries are handled with absolute discretion.' },
              { q: 'What are your rates?', a: 'Visit our Pricing page for transparent starting rates. Bespoke experiences such as yacht charters, event models, international travel, and corporate packages are quoted individually. Contact Shara for a personalised quote.' },
            ].map((faq, index) => (
              <motion.details
                key={index}
                variants={cardVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="group border border-champagne-gold/20 bg-charcoal/30 hover:border-champagne-gold/40 transition-all"
              >
                <summary className="cursor-pointer px-8 py-6 flex items-center justify-between text-off-white/90 font-inter tracking-wide text-sm md:text-base list-none">
                  <span>{faq.q}</span>
                  <span className="text-champagne-gold ml-4 group-open:rotate-45 transition-transform duration-200 text-xl">+</span>
                </summary>
                <div className="px-8 pb-6 text-off-white/70 text-sm leading-relaxed border-t border-champagne-gold/10 pt-4">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
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
              Ready to arrange your experience?
            </h2>
            <p className="text-off-white/80 font-inter text-lg">
              Contact us for a personalized consultation and bespoke companion services.
            </p>
            <p className="text-off-white/50 font-inter text-sm mt-4">
              Browse our <Link href="/portfolio" className="text-champagne-gold hover:underline">elite companion portfolio</Link>, review our <Link href="/pricing" className="text-champagne-gold hover:underline">transparent pricing</Link>, or <Link href="/contact" className="text-champagne-gold hover:underline">get in touch</Link> to begin.
            </p>
            <motion.div whileHover={primaryCTAHover} whileTap={primaryCTATap} className="inline-block">
              <a
                href="https://wa.me/+27607769793"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block px-10 py-5 bg-champagne-gold text-deep-black font-inter tracking-widest transition-smooth text-lg overflow-hidden"
              >
                <span className="relative z-10">CONTACT US</span>
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </a>
            </motion.div>
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
      variants={sectionFadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${reverse ? 'md:grid-flow-col-dense' : ''}`}
    >
      {/* Image */}
      <div className={`relative h-96 overflow-hidden ${reverse ? 'md:col-start-2' : ''}`}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes={SIZES.twoCol}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
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

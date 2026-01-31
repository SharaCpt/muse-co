'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaEnvelope, FaPhone } from 'react-icons/fa'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Default header image
const DEFAULT_HEADER = 'https://images.unsplash.com/photo-1647428028787-e004b0d00775?q=80&w=2000'

interface SiteContent {
  id: string
  content: string
}

export default function ContactPage() {
  const [headerImage, setHeaderImage] = useState<string>(DEFAULT_HEADER)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  // Editable content with defaults
  const [content, setContent] = useState({
    intro: 'Ready to elevate your next event? Contact us for a personalized consultation and discover how MUSE & CO can bring your vision to life.',
  })

  useEffect(() => {
    fetchHeaderImage()
    fetchContent()
  }, [])

  async function fetchContent() {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('id', 'contact_intro')
        .single()

      if (data?.content) {
        setContent({ intro: data.content })
      }
    } catch (error) {
      // Use default
    }
  }

  async function fetchHeaderImage() {
    try {
      const { data, error } = await supabase
        .from('site_images')
        .select('image_url')
        .eq('id', 'header_contact')
        .single()

      if (data?.image_url) {
        setHeaderImage(data.image_url)
      }
    } catch (error) {
      // Keep default on error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Send email notification to Shara
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Failed to send email')

      setSubmitStatus('success')
      setFormData({ name: '', email: '', eventType: '', message: '' })
      
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <main className="bg-deep-black pt-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={headerImage}
            alt="Contact MUSE & CO - Book Elite Companion Services Cape Town"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-deep-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-black/30 via-transparent to-deep-black" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <p className="text-champagne-gold/70 text-sm tracking-[0.3em] mb-4 uppercase">Get in Touch</p>
          <h1 className="font-playfair text-6xl md:text-8xl tracking-[0.2em] text-champagne-gold mb-6 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            CONTACT
          </h1>
          <p className="text-off-white/80 text-lg md:text-xl tracking-wide mb-8">
            Exclusive Arrangements • VIP Booking • Worldwide Service
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div>
              <h2 className="font-playfair text-4xl text-champagne-gold mb-6">
                Get In Touch
              </h2>
              <p className="text-off-white/80 font-inter leading-relaxed mb-8">
                {content.intro}
              </p>
            </div>

            {/* Direct Contact Methods */}
            <div className="space-y-4">
              <motion.a
                href="https://wa.me/+27607769793?text=Hi%20Shara!%20I%20found%20your%20contact%20details%20on%20the%20MUSE%20%26%20CO%20website.%20I%27d%20like%20to%20inquire%20about%20your%20elite%20companion%20services.%20Looking%20forward%20to%20discussing%20an%20exclusive%20arrangement.%20%E2%9C%A8"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
                className="block px-8 py-5 bg-gradient-to-r from-champagne-gold to-[#B8962E] text-deep-black font-semibold tracking-wider hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 text-center"
              >
                MESSAGE ON WHATSAPP
              </motion.a>
              
              <motion.a
                href="tel:+27607769793"
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
                className="block px-8 py-5 border-2 border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-deep-black transition-all duration-300 text-center font-semibold tracking-wider"
              >
                CALL SHARA
              </motion.a>
              
              <p className="text-off-white/50 text-xs text-center mt-4 italic">
                Fully confidential • Response within 24 hours
              </p>
            </div>

            {/* Business Hours */}
            <div className="pt-8 border-t border-champagne-gold/20">
              <h3 className="font-inter text-champagne-gold mb-4 tracking-wider">
                RESPONSE TIME
              </h3>
              <p className="text-off-white/70 text-sm">
                We respond to all inquiries within 24 hours.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            id="contact-form"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-off-white/80 font-inter text-sm mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-charcoal border border-champagne-gold/20 focus:border-champagne-gold text-off-white font-inter outline-none transition-smooth"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-off-white/80 font-inter text-sm mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-charcoal border border-champagne-gold/20 focus:border-champagne-gold text-off-white font-inter outline-none transition-smooth"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-off-white/80 font-inter text-sm mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-charcoal border border-champagne-gold/20 focus:border-champagne-gold text-off-white font-inter outline-none transition-smooth resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.1 }}
                className="w-full px-8 py-4 bg-champagne-gold text-deep-black font-inter tracking-widest hover:bg-opacity-90 transition-smooth gold-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    SENDING...
                  </>
                ) : 'SEND INQUIRY'}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-champagne-gold text-center font-inter text-sm"
                >
                  Thank you! We'll be in touch within 24 hours.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

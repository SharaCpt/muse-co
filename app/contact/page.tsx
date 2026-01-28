'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Reliable header image - elegant emerald aesthetic
const HEADER_IMAGE = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

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
            src={HEADER_IMAGE}
            alt="Contact MUSE & CO - Book Elite Companion Services Cape Town"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-deep-black/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-transparent to-deep-black" />
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
                Ready to elevate your next event? Contact us for a personalized consultation and discover how MUSE & CO can bring your vision to life.
              </p>
            </div>

            {/* Direct Contact Methods */}
            <div className="space-y-6">
              <ContactMethod
                icon={<FaWhatsapp />}
                title="WhatsApp"
                value="+27 60 776 9793"
                href="https://wa.me/+27607769793"
                primary
              />
              
              <ContactMethod
                icon={<FaPhone />}
                title="Phone"
                value="+27 60 776 9793"
                href="tel:+27607769793"
              />
              
              <ContactMethod
                icon={<FaEnvelope />}
                title="Email"
                value="Contact via form"
                href="#contact-form"
              />
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
                  className="w-full px-4 py-3 bg-charcoal border border-champagne-gold/20 focus:border-champagne-gold text-off-white font-inter outline-none transition-all duration-300 input-glow rounded-sm"
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
                  className="w-full px-4 py-3 bg-charcoal border border-champagne-gold/20 focus:border-champagne-gold text-off-white font-inter outline-none transition-all duration-300 input-glow rounded-sm"
                />
              </div>

              <div>
                <label htmlFor="eventType" className="block text-off-white/80 font-inter text-sm mb-2">
                  Event Type *
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-charcoal border border-champagne-gold/20 focus:border-champagne-gold text-off-white font-inter outline-none transition-all duration-300 input-glow rounded-sm cursor-pointer"
                >
                  <option value="">Select event type</option>
                  <option value="nightlife">Nightlife / Club Event</option>
                  <option value="private">Private Event / Villa</option>
                  <option value="golf">Golf Day</option>
                  <option value="brand">Brand Activation</option>
                  <option value="yacht">Yacht / Boat Party</option>
                  <option value="other">Other</option>
                </select>
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
                  className="w-full px-4 py-3 bg-charcoal border border-champagne-gold/20 focus:border-champagne-gold text-off-white font-inter outline-none transition-all duration-300 resize-none input-glow rounded-sm"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-champagne-gold text-deep-black font-inter tracking-widest hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)]"
              >
                {isSubmitting ? 'SENDING...' : 'SEND INQUIRY'}
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

function ContactMethod({
  icon,
  title,
  value,
  href,
  primary = false,
}: {
  icon: React.ReactNode
  title: string
  value: string
  href: string
  primary?: boolean
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center space-x-4 p-6 border rounded-sm transition-all duration-300 group ${
        primary
          ? 'border-champagne-gold bg-champagne-gold/10 shadow-[0_0_25px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]'
          : 'border-champagne-gold/20 bg-charcoal/30 hover:border-champagne-gold/60 hover:bg-charcoal/50'
      }`}
    >
      <div className={`text-3xl transition-all duration-300 ${primary ? 'text-champagne-gold' : 'text-champagne-gold/60'} group-hover:text-champagne-gold group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]`}>
        {icon}
      </div>
      <div>
        <p className="text-off-white/60 text-xs font-inter tracking-wider mb-1">
          {title}
        </p>
        <p className="text-off-white font-inter group-hover:text-champagne-gold transition-colors duration-300">
          {value}
        </p>
      </div>
    </motion.a>
  )
}

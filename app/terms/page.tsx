'use client'

import { motion } from 'framer-motion'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | MUSE & CO Elite Companions',
  description: 'Terms and conditions for MUSE & CO luxury companion services in Cape Town and worldwide.',
}

export default function TermsPage() {
  return (
    <main className="bg-deep-black pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <h1 className="font-playfair text-4xl md:text-5xl text-champagne-gold tracking-wider mb-12">
            Terms of Service
          </h1>

          <div className="space-y-6 text-off-white/80 font-inter leading-relaxed">
            <section>
              <h2 className="text-champagne-gold text-xl mb-4">Age Restriction</h2>
              <p>
                This website and our services are restricted to individuals 18 years of age or older. By accessing this site, you confirm that you meet this age requirement.
              </p>
            </section>

            <section>
              <h2 className="text-champagne-gold text-xl mb-4">Services</h2>
              <p>
                MUSE & CO provides elite lifestyle staffing and concierge services for private events, nightlife venues, and luxury experiences. All bookings are subject to availability and our standard terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="text-champagne-gold text-xl mb-4">Bookings</h2>
              <p>
                All staffing bookings must be confirmed in writing. Cancellation policies apply and will be communicated at the time of booking.
              </p>
            </section>

            <section>
              <h2 className="text-champagne-gold text-xl mb-4">Confidentiality</h2>
              <p>
                We maintain strict confidentiality regarding all client information and events. We expect the same discretion from our clients regarding our staff.
              </p>
            </section>

            <section>
              <h2 className="text-champagne-gold text-xl mb-4">Contact</h2>
              <p>
                For questions about these terms, please contact us via WhatsApp at +27 60 776 9793.
              </p>
            </section>

            <p className="text-sm text-off-white/60 pt-8">
              Last updated: January 2026
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

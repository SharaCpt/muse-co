'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-champagne-gold/20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-playfair text-3xl tracking-widest text-off-white mb-4 hover:text-champagne-gold transition-colors duration-300">
              MUSE & CO
            </h3>
            <p className="text-off-white/60 text-sm font-inter leading-relaxed">
              Elite lifestyle staffing & concierge services. 13 years of excellence in Cape Town.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-champagne-gold font-inter tracking-wider mb-4 text-sm">
              QUICK LINKS
            </h4>
            <div className="space-y-2">
              {[
                { href: '/about', label: 'About' },
                { href: '/services', label: 'Services' },
                { href: '/portfolio', label: 'Portfolio' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="block text-off-white/60 hover:text-champagne-gold text-sm transition-all duration-300 hover:translate-x-1"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Social & Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-champagne-gold font-inter tracking-wider mb-4 text-sm">
              CONNECT
            </h4>
            <div className="flex items-center space-x-4 mb-6">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-champagne-gold hover:text-champagne-gold/80 transition-all duration-300 text-2xl icon-hover-spin hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-off-white/60 hover:text-champagne-gold text-xs transition-all duration-300 hover:translate-x-1">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-off-white/60 hover:text-champagne-gold text-xs transition-all duration-300 hover:translate-x-1">
                Terms of Service
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-champagne-gold/10 text-center text-off-white/40 text-xs font-inter"
        >
          <p>&copy; {new Date().getFullYear()} MUSE & CO. All rights reserved. Cape Town, South Africa.</p>
        </motion.div>
      </div>
    </footer>
  )
}

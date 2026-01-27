'use client'

import Link from 'next/link'
import { FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-champagne-gold/20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-playfair text-3xl tracking-widest text-off-white mb-4">
              MUSE & CO
            </h3>
            <p className="text-off-white/60 text-sm font-inter leading-relaxed">
              Elite lifestyle staffing & concierge services. 13 years of excellence in Cape Town.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-champagne-gold font-inter tracking-wider mb-4 text-sm">
              QUICK LINKS
            </h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-off-white/60 hover:text-champagne-gold text-sm transition-smooth">
                About
              </Link>
              <Link href="/services" className="block text-off-white/60 hover:text-champagne-gold text-sm transition-smooth">
                Services
              </Link>
              <Link href="/portfolio" className="block text-off-white/60 hover:text-champagne-gold text-sm transition-smooth">
                Portfolio
              </Link>
              <Link href="/contact" className="block text-off-white/60 hover:text-champagne-gold text-sm transition-smooth">
                Contact
              </Link>
            </div>
          </div>

          {/* Social & Legal */}
          <div>
            <h4 className="text-champagne-gold font-inter tracking-wider mb-4 text-sm">
              CONNECT
            </h4>
            <div className="flex items-center space-x-4 mb-6">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-champagne-gold hover:text-champagne-gold/80 transition-smooth text-2xl"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-off-white/60 hover:text-champagne-gold text-xs transition-smooth">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-off-white/60 hover:text-champagne-gold text-xs transition-smooth">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-champagne-gold/10 text-center text-off-white/40 text-xs font-inter">
          <p>&copy; {new Date().getFullYear()} MUSE & CO. All rights reserved. Cape Town, South Africa.</p>
        </div>
      </div>
    </footer>
  )
}

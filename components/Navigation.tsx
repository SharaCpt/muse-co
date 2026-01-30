'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { href: '/services', label: 'SERVICES' },
    { href: '/pricing', label: 'PRICING' },
    { href: '/portfolio', label: 'PORTFOLIO' },
    { href: '/contact', label: 'CONTACT' },
    { href: '/join', label: 'JOIN MUSE', special: true },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-deep-black/95 backdrop-blur-sm border-b border-champagne-gold/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
<Link href="/" className="font-playfair text-2xl tracking-widest text-off-white hover:text-champagne-gold transition-colors duration-300">
          MUSE & CO
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-inter text-sm tracking-wider transition-all duration-300 ${
                link.special
                  ? 'text-[#C75B7A] font-semibold hover:text-rose-800 join-muse-link'
                  : pathname === link.href
                  ? 'text-champagne-gold'
                  : 'text-off-white/80 hover:text-champagne-gold'
              }`}
              style={link.special ? {
                textShadow: '-0.5px -0.5px 0 rgba(0,0,0,0.6), 0.5px -0.5px 0 rgba(0,0,0,0.6), -0.5px 0.5px 0 rgba(0,0,0,0.6), 0.5px 0.5px 0 rgba(0,0,0,0.6)'
              } : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <style jsx>{`
          .join-muse-link:hover {
            text-shadow: -0.8px -0.8px 0 rgba(0,0,0,0.9), 0.8px -0.8px 0 rgba(0,0,0,0.9), -0.8px 0.8px 0 rgba(0,0,0,0.9), 0.8px 0.8px 0 rgba(0,0,0,0.9) !important;
          }
        `}</style>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col space-y-2 w-8 h-8 justify-center"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 5, backgroundColor: '#A8ADB3' } : { rotate: 0, y: 0, backgroundColor: '#D4AF37' }}
            className="block h-0.5 w-8 transition-smooth"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -5, backgroundColor: '#A8ADB3' } : { rotate: 0, y: 0, backgroundColor: '#D4AF37' }}
            className="block h-0.5 w-8 transition-smooth"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-charcoal border-t border-champagne-gold/20"
          >
            <div className="px-6 py-8 space-y-6">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={link.special ? 'opacity-90' : ''}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block font-inter text-lg tracking-wider transition-all duration-300 ${
                      link.special
                        ? 'text-[#C75B7A] font-semibold join-muse-link-mobile'
                        : pathname === link.href
                        ? 'text-champagne-gold'
                        : 'text-off-white/80 hover:text-champagne-gold'
                    }`}
                    style={link.special ? {
                      textShadow: '-0.5px -0.5px 0 rgba(0,0,0,0.6), 0.5px -0.5px 0 rgba(0,0,0,0.6), -0.5px 0.5px 0 rgba(0,0,0,0.6), 0.5px 0.5px 0 rgba(0,0,0,0.6)'
                    } : undefined}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

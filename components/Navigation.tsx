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
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-deep-black/95 backdrop-blur-md border-b border-champagne-gold/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="font-playfair text-2xl tracking-widest text-off-white hover:text-champagne-gold transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]"
        >
          MUSE & CO
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative font-inter text-sm tracking-wider transition-all duration-300 py-2
                ${pathname === link.href
                  ? 'text-champagne-gold nav-active'
                  : 'text-off-white/80 hover:text-champagne-gold underline-expand'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col space-y-1.5 w-10 h-10 justify-center items-center rounded-lg hover:bg-champagne-gold/10 transition-colors"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-7 bg-champagne-gold transition-smooth"
          />
          <motion.span
            animate={isOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
            className="block h-0.5 w-7 bg-champagne-gold transition-smooth"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-7 bg-champagne-gold transition-smooth"
          />
        </button>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-deep-black/80 backdrop-blur-sm md:hidden z-40"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-charcoal/95 backdrop-blur-xl border-l border-champagne-gold/20 md:hidden z-50 shadow-[-20px_0_60px_rgba(0,0,0,0.8)]"
            >
              {/* Close Button */}
              <div className="flex justify-end p-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-champagne-gold/30 hover:bg-champagne-gold/10 transition-colors"
                >
                  <span className="text-champagne-gold text-2xl">×</span>
                </button>
              </div>
              
              {/* Menu Links */}
              <div className="px-8 py-4 space-y-2">
                {links.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.08, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-4 px-4 rounded-lg font-inter text-lg tracking-wider transition-all duration-300 border-l-2
                        ${pathname === link.href
                          ? 'text-champagne-gold bg-champagne-gold/10 border-champagne-gold'
                          : 'text-off-white/80 hover:text-champagne-gold hover:bg-champagne-gold/5 border-transparent hover:border-champagne-gold/50'
                        }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* Bottom CTA */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-0 left-0 right-0 p-8 border-t border-champagne-gold/20"
              >
                <a
                  href="https://wa.me/+27607769793"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-champagne-gold text-deep-black text-center font-semibold tracking-wider rounded-lg hover:bg-champagne-gold/90 transition-colors shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                >
                  BOOK NOW
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'

const PHONE = '+27607769793'
const WHATSAPP_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent('Hello, I would like to inquire about your services.')}`

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Solid header once scrolled past the top
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || isOpen
            ? 'bg-deep-black/90 backdrop-blur-md border-b border-champagne-gold/20'
            : 'bg-gradient-to-b from-deep-black/70 via-deep-black/20 to-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-playfair text-xl md:text-2xl tracking-[0.2em] text-off-white hover:text-champagne-gold transition-colors duration-300 z-10"
          >
            MUSE & CO
          </Link>

          <div className="flex items-center gap-3">
            {/* Persistent single CTA — always available, never repeated elsewhere in the header */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center rounded-full px-6 py-2.5 border border-champagne-gold/50 text-champagne-gold text-xs tracking-[0.2em] bg-champagne-gold/[0.04] backdrop-blur-sm shadow-[0_4px_16px_-6px_rgba(212,175,55,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-champagne-gold hover:text-deep-black hover:border-champagne-gold hover:shadow-[0_10px_26px_-8px_rgba(212,175,55,0.55)] active:translate-y-0 active:scale-[0.97]"
            >
              BOOK NOW
            </Link>

            {/* Menu Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-3 w-12 h-12 justify-center"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <div className="flex flex-col gap-1.5 w-6">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="block h-px w-full bg-champagne-gold origin-center"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block h-px w-full bg-champagne-gold"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="block h-px w-full bg-champagne-gold origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-deep-black/98 backdrop-blur-xl overflow-y-auto"
          >
            <div className="min-h-screen flex flex-col justify-center px-6 md:px-16 py-32">
              <div className="max-w-4xl w-full mx-auto md:mx-0">
                <nav className="space-y-1 md:space-y-2">
                  {links.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.5, delay: 0.08 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className="border-b border-champagne-gold/10 py-3 md:py-4"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-baseline gap-4 md:gap-6"
                      >
                        <span className="font-inter text-xs md:text-sm text-champagne-gold/40 tracking-widest">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`font-playfair text-4xl md:text-6xl tracking-wide transition-colors duration-300 ${
                            pathname === link.href
                              ? 'text-champagne-gold'
                              : 'text-off-white/90 group-hover:text-champagne-gold'
                          }`}
                        >
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Join Muse & Co — deliberately its own room: different palette, tone, audience (models, not clients) */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.5, delay: 0.08 + links.length * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8 md:mt-10"
                >
                  <Link
                    href="/join"
                    onClick={() => setIsOpen(false)}
                    className="group relative flex items-center justify-between gap-6 overflow-hidden rounded-lg border border-[#C75B7A]/40 bg-gradient-to-br from-rose-950/40 via-charcoal to-deep-black px-6 py-6 md:px-8 md:py-7 transition-colors duration-300 hover:border-[#C75B7A]/80"
                  >
                    <div>
                      <p className="text-[#C75B7A]/70 text-[11px] tracking-[0.3em] uppercase mb-1.5">
                        For Models — Now Recruiting
                      </p>
                      <span className="font-playfair text-2xl md:text-4xl tracking-wide text-[#E8A2B8] group-hover:text-[#C75B7A] transition-colors duration-300">
                        Join Muse & Co
                      </span>
                    </div>
                    <motion.span
                      className="text-[#C75B7A] text-2xl md:text-3xl flex-shrink-0"
                      animate={{ x: [0, 6, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>

                {/* Quick actions */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="mt-14 md:mt-16 pt-8 border-t border-champagne-gold/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-5">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-off-white/60 hover:text-champagne-gold transition-colors text-sm"
                    >
                      <FaWhatsapp className="text-lg" />
                      WhatsApp
                    </a>
                    <a
                      href="https://www.instagram.com/musaboratories"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-off-white/60 hover:text-champagne-gold transition-colors text-sm"
                      aria-label="Instagram"
                    >
                      <FaInstagram className="text-lg" />
                      Instagram
                    </a>
                  </div>
                  <div className="flex items-center gap-5 text-off-white/60 text-xs">
                    <Link href="/privacy" onClick={() => setIsOpen(false)} className="hover:text-champagne-gold transition-colors">Privacy</Link>
                    <Link href="/terms" onClick={() => setIsOpen(false)} className="hover:text-champagne-gold transition-colors">Terms</Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

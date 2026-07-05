'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'

const PHONE = '+27607769793'
const WHATSAPP_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent('Hello, I would like to inquire about your services.')}`

// Pages that already own their conversion flow — the bar would be redundant there
const HIDDEN_ON = ['/contact', '/join']

export default function StickyBookBar() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const hidden = HIDDEN_ON.some((p) => pathname?.startsWith(p))
  if (hidden) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-30 border-t border-champagne-gold/30 bg-deep-black/85 backdrop-blur-md"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <p className="hidden sm:block text-off-white/60 text-xs tracking-wide">
              Discreet &amp; confidential — replies within 24 hours
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-gradient-to-b from-[#E9CE72] to-champagne-gold text-deep-black font-inter text-sm font-semibold tracking-[0.1em] overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_8px_20px_-8px_rgba(212,175,55,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_14px_30px_-8px_rgba(212,175,55,0.75)] active:translate-y-0 active:scale-[0.97]"
            >
              <FaWhatsapp className="text-lg relative z-10" />
              <span className="relative z-10">MESSAGE SHARA</span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

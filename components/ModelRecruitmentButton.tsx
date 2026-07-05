'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, RefObject } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

interface ModelRecruitmentButtonProps {
  ctaBoxRef?: RefObject<HTMLDivElement>
}

export default function ModelRecruitmentButton({ ctaBoxRef }: ModelRecruitmentButtonProps) {
  const phoneNumber = '+27607769793'
  const message = "Hi Shara! I'm interested in joining Muse & Co as a model. I'd love to learn more about this opportunity and see if I'd be a good fit. Looking forward to hearing from you! ✨"
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  const [showButton, setShowButton] = useState(true)

  useEffect(() => {
    if (!ctaBoxRef?.current) return

    const observer = new IntersectionObserver(
      ([entry]) => setShowButton(!entry.isIntersecting),
      { threshold: 0.3 }
    )
    observer.observe(ctaBoxRef.current)
    return () => observer.disconnect()
  }, [ctaBoxRef])

  return (
    <AnimatePresence>
      {showButton && (
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center gap-3 rounded-full border border-[#C75B7A]/60 bg-gradient-to-br from-rose-950 via-rose-900 to-deep-black px-5 py-3.5 md:px-6 md:py-4 shadow-2xl overflow-hidden"
          aria-label="Message Shara on WhatsApp about joining Muse & Co"
        >
          <FaWhatsapp className="relative z-10 text-lg md:text-xl text-[#E8A2B8] flex-shrink-0" />
          <span className="relative z-10 text-[#E8A2B8] font-inter text-xs md:text-sm font-medium tracking-wide whitespace-nowrap">
            Message Shara
          </span>
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-[#E8A2B8]/15 to-transparent" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}

'use client'

import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppButton() {
  const phoneNumber = '+27607769793' // Shara's WhatsApp number
  const message = 'Hello, I would like to inquire about your services.'
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3 bg-[#25D366] rounded-full shadow-2xl hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-shadow"
      aria-label="Chat with Shara on WhatsApp"
    >
      <FaWhatsapp className="text-white text-2xl" />
      <span className="text-white font-semibold text-sm tracking-wide hidden sm:inline">Chat with Shara</span>
    </motion.a>
  )
}

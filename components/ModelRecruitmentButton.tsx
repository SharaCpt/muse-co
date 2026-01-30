'use client'

import { motion } from 'framer-motion'

export default function ModelRecruitmentButton() {
  const phoneNumber = '+27607769793'
  const message = "Hi Shara! I'm interested in joining Muse & Co as a model. I'd love to learn more about this opportunity and see if I'd be a good fit. Looking forward to hearing from you! ✨"
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-8 left-8 z-50 group"
      aria-label="Join Muse & Co as a model"
    >
      <motion.div
        animate={{
          boxShadow: [
            '0 0 20px rgba(212, 175, 55, 0.4), 0 0 30px rgba(199, 91, 122, 0.2)',
            '0 0 30px rgba(212, 175, 55, 0.6), 0 0 40px rgba(199, 91, 122, 0.3)',
            '0 0 20px rgba(212, 175, 55, 0.4), 0 0 30px rgba(199, 91, 122, 0.2)',
          ],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-20 h-20 bg-gradient-to-br from-rose-900 via-rose-800 to-pink-900 rounded-2xl flex items-center justify-center border-2 border-champagne-gold overflow-hidden"
      >
        {/* Sparkle particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-champagne-gold rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Icon */}
        <motion.span 
          className="text-3xl relative z-10"
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          ✨
        </motion.span>

        {/* Shimmer */}
        <motion.div
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 1.5,
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-champagne-gold/20 to-transparent"
        />
      </motion.div>

      {/* Tooltip on hover */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute left-24 top-1/2 -translate-y-1/2 bg-charcoal border border-champagne-gold/40 px-4 py-2 rounded-lg whitespace-nowrap pointer-events-none"
      >
        <p className="text-champagne-gold text-sm font-semibold">Join Muse & Co</p>
        <p className="text-off-white/70 text-xs">Become a model</p>
      </motion.div>
    </motion.a>
  )
}

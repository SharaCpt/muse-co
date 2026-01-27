'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AgeGate() {
  const [showGate, setShowGate] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if user has already confirmed age
    const hasConfirmed = localStorage.getItem('musecoAgeConfirmed')
    if (!hasConfirmed) {
      setShowGate(true)
    }
    setIsLoaded(true)
  }, [])

  const handleEnter = () => {
    localStorage.setItem('musecoAgeConfirmed', 'true')
    setShowGate(false)
  }

  if (!isLoaded) return null

  return (
    <AnimatePresence>
      {showGate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-deep-black"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-md mx-6 p-12 border-2 border-champagne-gold bg-charcoal/50 backdrop-blur-sm"
          >
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-champagne-gold -translate-x-2 -translate-y-2" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-champagne-gold translate-x-2 -translate-y-2" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-champagne-gold -translate-x-2 translate-y-2" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-champagne-gold translate-x-2 translate-y-2" />

            <div className="text-center space-y-6">
              <h1 className="font-playfair text-4xl tracking-widest text-champagne-gold">
                MUSE & CO
              </h1>
              
              <div className="space-y-4 text-off-white/90 font-inter text-sm leading-relaxed">
                <p>
                  This platform is private. Access is restricted to approved models and collaborators of MUSE & CO.
                </p>
                <p className="font-semibold">
                  You must be 18 years or older to enter.
                </p>
              </div>

              <button
                onClick={handleEnter}
                className="w-full mt-8 px-8 py-4 bg-champagne-gold text-deep-black font-inter tracking-widest hover:bg-opacity-90 transition-smooth gold-glow text-lg"
              >
                ENTER
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

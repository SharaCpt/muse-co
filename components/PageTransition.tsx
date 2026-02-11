'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { pageTransition } from '@/lib/motion'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <motion.div
      key={pathname}
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  )
}

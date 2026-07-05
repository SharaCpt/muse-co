'use client'

import { MotionConfig } from 'framer-motion'

// Wraps the entire app so every Framer Motion animation (nav, footer, sticky bar,
// page content) respects the OS-level "reduce motion" accessibility setting.
export default function MotionRoot({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

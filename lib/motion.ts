// ============================================================
// MUSE & CO — Motion Design System
// 3-tier animation hierarchy for premium feel
// ============================================================

// === TIER 1: Hero — Cinematic, slow, dominant ===
export const heroVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      delay,
      ease: [0.22, 1, 0.36, 1], // custom ease-out
    },
  }),
}

export const heroFadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.7, delay, ease: 'easeOut' },
  }),
}

// Hero stagger — entire hero resolves within ~1.2s
export const heroStagger = {
  label: 0.3,
  title: 0.4,
  tagline: 0.55,
  subtitle: 0.65,
  cta: 0.75,
  scroll: 1.2,
}

// === TIER 2: Section headers — Noticeable but subordinate ===
export const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export const sectionFadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
}

// === TIER 3: Cards & micro — Near-instant, staggered ===
export const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      delay: index * 0.06, // tight stagger
      ease: 'easeOut',
    },
  }),
}

export const microFadeIn = {
  hidden: { opacity: 0, y: 8 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      delay: index * 0.04,
      ease: 'easeOut',
    },
  }),
}

// === CTA Interactions ===
export const primaryCTAHover = {
  y: -2,
  boxShadow: '0 8px 40px rgba(212, 175, 55, 0.5), 0 0 60px rgba(212, 175, 55, 0.3)',
  transition: { duration: 0.2, ease: 'easeOut' },
}

export const primaryCTATap = {
  scale: 0.97,
  y: 0,
  transition: { duration: 0.1 },
}

export const secondaryCTAHover = {
  scale: 1.0,
  transition: { duration: 0.25, ease: 'easeOut' },
}

export const secondaryCTATap = {
  scale: 0.98,
  transition: { duration: 0.1 },
}

// === Page transition (route changes) ===
export const pageTransition = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}

// === Viewport settings for scroll-triggered animations ===
export const viewportOnce = { once: true, margin: '-80px' }

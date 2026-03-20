// ============================================================
// MUSE & CO — Image Utilities
// Shared blur placeholder + responsive size presets
// ============================================================

// 1×1 black PNG — Next.js blurs and scales it automatically.
// Shows a smooth dark placeholder while the real image loads.
export const BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='

// Responsive `sizes` hints — tells Next.js which srcset to generate
export const SIZES = {
  hero: '100vw',
  twoCol: '(max-width: 768px) 100vw, 50vw',
  threeCol: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
} as const

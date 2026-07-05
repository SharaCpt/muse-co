import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'rose' | 'roseOutline'

interface CTAButtonProps {
  href: string
  variant?: Variant
  children: React.ReactNode
  className?: string
  icon?: boolean
}

const isExternalHref = (href: string) => /^(https?:|tel:|mailto:)/.test(href)

const BASE =
  'group relative inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full font-inter text-sm font-semibold tracking-[0.15em] uppercase overflow-hidden transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]'

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-gradient-to-b from-[#E9CE72] to-champagne-gold text-deep-black shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_10px_30px_-8px_rgba(212,175,55,0.65)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_18px_40px_-10px_rgba(212,175,55,0.8)]',
  secondary:
    'border border-champagne-gold/50 text-champagne-gold bg-champagne-gold/[0.04] backdrop-blur-sm shadow-[0_6px_24px_-10px_rgba(212,175,55,0.3)] hover:bg-champagne-gold hover:text-deep-black hover:border-champagne-gold hover:shadow-[0_14px_34px_-8px_rgba(212,175,55,0.55)]',
  rose:
    'bg-gradient-to-b from-[#D97B96] to-[#C75B7A] text-off-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_30px_-8px_rgba(199,91,122,0.65)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_18px_40px_-10px_rgba(199,91,122,0.8)]',
  roseOutline:
    'border border-[#C75B7A]/50 text-[#E8A2B8] bg-[#C75B7A]/[0.04] backdrop-blur-sm shadow-[0_6px_24px_-10px_rgba(199,91,122,0.3)] hover:bg-[#C75B7A] hover:text-off-white hover:border-[#C75B7A] hover:shadow-[0_14px_34px_-8px_rgba(199,91,122,0.55)]',
}

// Elevated pill CTA used across the site — replaces the old flat rectangular buttons.
// Real depth via gradient fill + glossy inset highlight + layered shadow that grows on hover,
// a lift-and-press interaction, and a sliding arrow to signal direction/action.
export default function CTAButton({ href, variant = 'primary', children, className = '', icon = true }: CTAButtonProps) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {icon && (
        <ArrowRight
          className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={2}
        />
      )}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
    </>
  )

  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  )
}

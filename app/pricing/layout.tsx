import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rates & Packages — Escort & Companion Services',
  description: 'MUSE & CO escort rates and luxury companion packages. Transparent pricing for elite escorts, private arrangements, travel companionship, and bespoke experiences across South Africa.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Escort Rates & Packages | MUSE & CO',
    description: 'Transparent escort rates and luxury companion packages for private arrangements across South Africa.',
    url: '/pricing',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}

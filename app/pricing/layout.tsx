import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rates & Packages — Companion Services',
  description: 'MUSE & CO companion rates and luxury packages. Transparent pricing for private arrangements, travel companionship, and bespoke experiences across South Africa.',
  openGraph: {
    title: 'Pricing | MUSE & CO',
    description: 'Transparent companion rates and luxury packages for private arrangements across South Africa.',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}

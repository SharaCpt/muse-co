import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'MUSE & CO companion service rates and bespoke luxury experience packages. Transparent pricing for elite companionship, VIP arrangements, and curated luxury experiences in Cape Town.',
  openGraph: {
    title: 'Pricing | MUSE & CO Elite Companion Rates',
    description: 'Transparent pricing for elite companionship and bespoke luxury experiences in Cape Town.',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Companion Service Rates & Luxury Packages — South Africa',
  description: 'MUSE & CO companion rates and bespoke luxury packages. Transparent pricing for elite companionship, VIP arrangements, yacht charters, safari experiences and curated luxury events across Cape Town, Johannesburg, Durban & South Africa.',
  keywords: 'companion rates South Africa, escort pricing Cape Town, luxury companion cost Johannesburg, VIP escort rates Durban, bespoke luxury packages, yacht companion pricing',
  openGraph: {
    title: 'Pricing | MUSE & CO Elite Companion Rates — South Africa',
    description: 'Transparent pricing for elite companionship and bespoke luxury experiences across Cape Town, Johannesburg & South Africa.',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}

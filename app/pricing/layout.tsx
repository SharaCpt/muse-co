import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rates & Packages — Transparent Escort Pricing South Africa',
  description: 'MUSE & CO rates and packages. Transparent pricing for escort services, private arrangements, travel bookings, and bespoke experiences. Cape Town, Johannesburg, Durban & nationwide.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Rates & Packages | MUSE & CO',
    description: 'Transparent pricing for escort services, private arrangements and bespoke experiences across South Africa.',
    url: '/pricing',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}

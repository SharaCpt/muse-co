import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rates & Packages — Companion Booking Prices South Africa',
  description: 'MUSE & CO rates and packages. Transparent pricing for companion bookings, private arrangements, travel experiences, and bespoke packages. Hourly, overnight & multi-day rates available nationwide.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Rates & Packages | MUSE & CO',
    description: 'Transparent companion booking rates. Private arrangements, travel and bespoke experiences across South Africa.',
    url: '/pricing',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cape Town Escorts — VIP Escort Services Sea Point, Camps Bay & Stellenbosch',
  description: 'Cape Town escort services by MUSE & CO. VIP escorts available in Sea Point, Camps Bay, V&A Waterfront, Clifton, Stellenbosch & across the Western Cape. Premium escort bookings for private dining, yacht parties, nightlife, events & travel companionship. Call today.',
  alternates: {
    canonical: '/cape-town-escorts',
  },
  openGraph: {
    title: 'Cape Town Escorts — VIP Escort Services | MUSE & CO',
    description: 'VIP escort services across Cape Town. Premium escorts in Sea Point, Camps Bay, V&A Waterfront & Stellenbosch.',
    url: '/cape-town-escorts',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cape Town Escorts — VIP Escort Services | MUSE & CO',
    description: 'VIP escort services across Cape Town. Premium escorts in Sea Point, Camps Bay & Stellenbosch.',
  },
}

export default function CapeLayout({ children }: { children: React.ReactNode }) {
  return children
}

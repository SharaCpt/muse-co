import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Elite Escorts Cape Town — VIP Companions & Luxury Escort Services',
  description: 'MUSE & CO offers elite escorts in Cape Town. Premium escort services for private dining, yacht parties, events, nightlife & travel companionship. VIP escorts in Sea Point, Camps Bay, V&A Waterfront, Stellenbosch & across the Western Cape.',
  alternates: {
    canonical: '/cape-town-escorts',
  },
  openGraph: {
    title: 'Elite Escorts Cape Town | MUSE & CO',
    description: 'Premium escort services in Cape Town. VIP escorts for private arrangements, events & luxury experiences across the Western Cape.',
    url: '/cape-town-escorts',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elite Escorts Cape Town | MUSE & CO',
    description: 'Premium escort services in Cape Town. VIP escorts for private arrangements and luxury experiences.',
  },
}

export default function CapeLayout({ children }: { children: React.ReactNode }) {
  return children
}

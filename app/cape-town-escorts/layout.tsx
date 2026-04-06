import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Escorts Cape Town — Elite Escort Agency & VIP Escort Services in Cape Town',
  description: 'Looking for escorts in Cape Town? MUSE & CO is Cape Town\'s top-rated escort agency. Elite escorts for private dining, yacht parties, events, nightlife & travel. Available in Sea Point, Camps Bay, V&A Waterfront, Stellenbosch & the Western Cape.',
  alternates: {
    canonical: '/cape-town-escorts',
  },
  openGraph: {
    title: 'Escorts Cape Town | MUSE & CO',
    description: 'Cape Town\'s top-rated escort agency. Elite escorts for private arrangements, events & luxury experiences across the Western Cape.',
    url: '/cape-town-escorts',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Escorts Cape Town | MUSE & CO',
    description: 'Cape Town\'s top-rated escort agency. Elite escorts for private arrangements and luxury experiences.',
  },
}

export default function CapeLayout({ children }: { children: React.ReactNode }) {
  return children
}

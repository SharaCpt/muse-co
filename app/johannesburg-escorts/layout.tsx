import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Elite Escorts Johannesburg — VIP Companions Sandton & Joburg',
  description: 'MUSE & CO provides elite escorts in Johannesburg and Sandton. Premium escort services for business dinners, private events, nightlife & luxury companionship. VIP escorts in Sandton, Rosebank, Fourways, Melrose & across Gauteng.',
  alternates: {
    canonical: '/johannesburg-escorts',
  },
  openGraph: {
    title: 'Elite Escorts Johannesburg | MUSE & CO',
    description: 'Premium escort services in Johannesburg & Sandton. VIP escorts for business, events & luxury experiences across Gauteng.',
    url: '/johannesburg-escorts',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elite Escorts Johannesburg | MUSE & CO',
    description: 'Premium escort services in Johannesburg & Sandton. VIP escorts for business and luxury experiences.',
  },
}

export default function JohannesburgLayout({ children }: { children: React.ReactNode }) {
  return children
}

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Escorts Johannesburg — Premium Escort Agency Sandton & Joburg',
  description: 'Looking for escorts in Johannesburg? MUSE & CO provides premium escorts in Sandton, Rosebank, Fourways, Melrose & across Gauteng. Elite escort services for business dinners, private events, nightlife & luxury companionship.',
  alternates: {
    canonical: '/johannesburg-escorts',
  },
  openGraph: {
    title: 'Escorts Johannesburg | MUSE & CO',
    description: 'Premium escort agency in Johannesburg & Sandton. Elite escorts for business, events & luxury experiences across Gauteng.',
    url: '/johannesburg-escorts',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Escorts Johannesburg | MUSE & CO',
    description: 'Premium escort agency in Johannesburg & Sandton. Elite escorts for business and luxury experiences.',
  },
}

export default function JohannesburgLayout({ children }: { children: React.ReactNode }) {
  return children
}

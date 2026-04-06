import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Escorts Durban — Premium Escort Agency Umhlanga & KZN',
  description: 'Looking for escorts in Durban? MUSE & CO provides premium escorts in Umhlanga, Ballito, La Lucia, Morningside & across KwaZulu-Natal. Elite escort services for beach events, private dinners, nightlife & luxury companionship.',
  alternates: {
    canonical: '/durban-escorts',
  },
  openGraph: {
    title: 'Escorts Durban | MUSE & CO',
    description: 'Premium escort agency in Durban & Umhlanga. Elite escorts for beach events, private arrangements & luxury experiences across KZN.',
    url: '/durban-escorts',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Escorts Durban | MUSE & CO',
    description: 'Premium escort agency in Durban & Umhlanga. Elite escorts for luxury experiences across KZN.',
  },
}

export default function DurbanLayout({ children }: { children: React.ReactNode }) {
  return children
}

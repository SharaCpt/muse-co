import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Elite Escorts Durban — VIP Companions Umhlanga & KZN',
  description: 'MUSE & CO provides elite escorts in Durban and Umhlanga. Premium escort services for beach events, private dinners, nightlife & luxury companionship. VIP escorts in Umhlanga, Ballito, La Lucia, Morningside & across KwaZulu-Natal.',
  alternates: {
    canonical: '/durban-escorts',
  },
  openGraph: {
    title: 'Elite Escorts Durban | MUSE & CO',
    description: 'Premium escort services in Durban & Umhlanga. VIP escorts for beach events, private arrangements & luxury experiences across KZN.',
    url: '/durban-escorts',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elite Escorts Durban | MUSE & CO',
    description: 'Premium escort services in Durban & Umhlanga. VIP escorts for luxury experiences across KZN.',
  },
}

export default function DurbanLayout({ children }: { children: React.ReactNode }) {
  return children
}

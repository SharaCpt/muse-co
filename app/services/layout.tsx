import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services — Companions, Event Models & Nightlife | Cape Town',
  description: 'Private dining companions, yacht & villa event models, private event hostesses, party & nightlife companions, elite companionship, and travel companions. You choose — we arrange. Cape Town, Johannesburg, Durban & internationally.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Services | MUSE & CO',
    description: 'You choose, we arrange. Dining companions, yacht models, private event hostesses, nightlife companions & travel companions across South Africa.',
    url: '/services',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Escort Services — Elite Companions, Models & Nightlife | Cape Town',
  description: 'Premium escort services in Cape Town: private dining escorts, yacht & villa models, VIP hostesses, nightlife companions, elite escort experiences, and travel companions. You choose — we arrange. Cape Town, Johannesburg, Durban & nationwide.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Escort & Companion Services | MUSE & CO',
    description: 'Elite escort services in South Africa. Dining escorts, yacht models, VIP hostesses, nightlife companions & travel escorts across Cape Town, Johannesburg & Durban.',
    url: '/services',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}

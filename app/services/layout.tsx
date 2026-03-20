import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services — Private Dining, Yacht Models, VIP Hostesses & Travel Escorts',
  description: 'MUSE & CO escort services: private dining companions, yacht & villa models, VIP hostesses, nightlife escorts, travel companions. You choose — we arrange. Cape Town, Johannesburg, Durban & nationwide.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Escort & Model Services | MUSE & CO',
    description: 'Premium escort services across South Africa. Dining companions, yacht models, VIP hostesses, nightlife & travel escorts. Cape Town, Johannesburg & Durban.',
    url: '/services',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}

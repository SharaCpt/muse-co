import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services — Companions, Event Models & VIP Hostesses | Cape Town',
  description: 'Private dining companions, yacht & villa event models, corporate hostesses, promotional models, elite companionship, and travel companions. Serving Cape Town, Johannesburg, Durban & internationally.',
  openGraph: {
    title: 'Services | MUSE & CO',
    description: 'Companions, event models & VIP hostesses across South Africa. Dining companions, yacht models, corporate hostesses, promo models & travel companions.',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}

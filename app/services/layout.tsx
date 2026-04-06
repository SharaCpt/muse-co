import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Companion Services — Private Dining, Yacht Models, VIP Hostesses & Travel',
  description: 'MUSE & CO companion services: private dining dates, yacht & villa models, VIP event hostesses, nightlife companions, travel partners. Bespoke arrangements tailored to you. Available in Cape Town, Johannesburg, Durban & nationwide.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Companion & Model Services | MUSE & CO',
    description: 'Bespoke companion services across South Africa. Dining dates, yacht models, VIP hostesses, nightlife & travel companions.',
    url: '/services',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}

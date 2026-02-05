import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore MUSE & CO elite companion services - luxury lifestyle experiences, exclusive private arrangements, VIP nightlife companions, and bespoke events in Cape Town.',
  openGraph: {
    title: 'Services | MUSE & CO Elite Companion Services',
    description: 'Luxury lifestyle experiences, exclusive private arrangements, and VIP nightlife companions in Cape Town, South Africa.',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}

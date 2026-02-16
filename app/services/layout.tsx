import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services — Private Companionship & Bespoke Experiences',
  description: 'Explore MUSE & CO\'s companion services. From private arrangements and travel companionship to VIP event companions and long-term relationships. Available in Cape Town and across South Africa.',
  openGraph: {
    title: 'Services | MUSE & CO',
    description: 'Private companionship, travel companions, and bespoke experiences. Available in Cape Town and across South Africa.',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact & Bookings — Get in Touch',
  description: 'Contact MUSE & CO for companion arrangements and bookings. Reach Shara directly via WhatsApp for a discreet, personalised consultation. Available in Cape Town and across South Africa.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact | MUSE & CO',
    description: 'Get in touch for companion bookings. Discreet, personalised service via WhatsApp.',
    url: '/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}

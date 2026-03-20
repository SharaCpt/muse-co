import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact & Bookings — Book a Premium Escort via WhatsApp',
  description: 'Contact MUSE & CO for escort bookings and private arrangements. Reach Shara directly via WhatsApp for a discreet, personalised consultation. Available in Cape Town, Johannesburg, Durban & across South Africa.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact & Bookings | MUSE & CO',
    description: 'Book a premium escort. Discreet, personalised service via WhatsApp. Cape Town & nationwide.',
    url: '/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}

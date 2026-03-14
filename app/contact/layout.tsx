import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact & Bookings — Book an Elite Escort',
  description: 'Contact MUSE & CO for escort bookings and companion arrangements. Reach Shara directly via WhatsApp for a discreet, personalised consultation. Elite escorts available in Cape Town, Johannesburg, Durban & across South Africa.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact | MUSE & CO',
    description: 'Book an elite escort or companion. Discreet, personalised service via WhatsApp. Cape Town & nationwide.',
    url: '/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}

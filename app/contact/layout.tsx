import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact MUSE & CO for exclusive companion arrangements and VIP bookings. Reach Shara directly via WhatsApp for discreet, personalized service in Cape Town.',
  openGraph: {
    title: 'Contact | MUSE & CO Cape Town',
    description: 'Reach us for exclusive companion arrangements and VIP bookings. Discreet, personalized service.',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}

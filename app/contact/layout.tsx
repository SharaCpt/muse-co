import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact & VIP Booking — Cape Town, Johannesburg & Nationwide',
  description: 'Contact MUSE & CO for exclusive companion arrangements and VIP bookings across South Africa. Serving Cape Town, Johannesburg, Durban, Pretoria & internationally. Reach Shara directly via WhatsApp for discreet, personalised service.',
  keywords: 'contact companion agency South Africa, book escort Cape Town, VIP booking Johannesburg, WhatsApp companion Durban, discreet escort booking',
  openGraph: {
    title: 'Contact & Book | MUSE & CO — Cape Town, Johannesburg & South Africa',
    description: 'Contact us for exclusive companion arrangements across South Africa. Discreet, personalised VIP service.',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}

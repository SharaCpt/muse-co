import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import AgeGate from '@/components/AgeGate'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'MUSE & CO | Elite Lifestyle Models & VIP Staffing | Luxury Events Cape Town',
  description: 'Curated portfolio of elite female professionals for luxury brand launches, VIP events, and exclusive experiences in Cape Town. Premium hostesses, brand ambassadors, and bespoke concierge services.',
  keywords: 'VIP staffing Cape Town, elite lifestyle models, brand launch hostesses, luxury event staff, brand ambassadors, VIP hostesses, Cape Town concierge, exclusive event staffing, professional models',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-inter`}>
        <AgeGate />
        <Navigation />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}

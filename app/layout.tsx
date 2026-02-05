import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import AgeGate from '@/components/AgeGate'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: {
    default: 'MUSE & CO | Elite Companion Services Cape Town | Luxury VIP Escort South Africa',
    template: '%s | MUSE & CO'
  },
  description: 'Premier luxury companion and elite escort services in Cape Town, South Africa. Exclusive VIP companions, high-class travel escorts, and sophisticated companionship worldwide. Discretion guaranteed.',
  keywords: 'luxury escort Cape Town, elite companion South Africa, VIP escort services, high-class escort Cape Town, luxury travel companion, executive companion, elite hostess Cape Town, VIP companion services South Africa, luxury escort agency, exclusive companion Cape Town',
  authors: [{ name: 'MUSE & CO' }],
  creator: 'MUSE & CO',
  publisher: 'MUSE & CO',
  metadataBase: new URL('https://museco.co.za'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://museco.co.za',
    siteName: 'MUSE & CO',
    title: 'MUSE & CO | Elite Companion Services Cape Town',
    description: 'Premier luxury companion and elite escort services in Cape Town, South Africa. Exclusive VIP companions and sophisticated companionship worldwide.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MUSE & CO Elite Companion Services Cape Town'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MUSE & CO | Elite Companion Services Cape Town',
    description: 'Premier luxury companion and elite escort services in Cape Town, South Africa.',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'MUSE & CO',
    description: 'Premier luxury companion and elite escort services in Cape Town, South Africa',
    url: 'https://museco.co.za',
    telephone: '+27-60-776-9793',
    priceRange: 'R$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cape Town',
      addressRegion: 'Western Cape',
      addressCountry: 'ZA'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -33.9249,
      longitude: 18.4241
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Cape Town'
      },
      {
        '@type': 'Country',
        name: 'South Africa'
      },
      {
        '@type': 'Place',
        name: 'Worldwide'
      }
    ],
    serviceType: [
      'Elite Companion Services',
      'VIP Escort Services',
      'Luxury Travel Companion',
      'Executive Companion',
      'High-Class Hostess Services'
    ]
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-inter`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-champagne-gold focus:text-deep-black focus:font-semibold focus:tracking-wider">
          Skip to content
        </a>
        <AgeGate />
        <Navigation />
        <div id="main-content">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}

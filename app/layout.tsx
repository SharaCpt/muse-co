import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import AgeGate from '@/components/AgeGate'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: {
    default: 'MUSE & CO | Elite Escorts & Companions South Africa',
    template: '%s | MUSE & CO'
  },
  description: 'MUSE & CO — South Africa\'s premier elite escort & companion agency. Elite escorts and luxury companions for private arrangements, VIP events, and bespoke experiences. Cape Town, Johannesburg, Durban & Pretoria. Est. 2011.',  
  authors: [{ name: 'MUSE & CO' }],
  creator: 'MUSE & CO',
  publisher: 'MUSE & CO',
  metadataBase: new URL('https://www.museco.co.za'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://www.museco.co.za',
    siteName: 'MUSE & CO',
    title: 'MUSE & CO | Elite Escorts & Companions South Africa',
    description: 'South Africa\'s premier elite escort & companion agency. Elite escorts and luxury companions for private arrangements and bespoke experiences. Est. 2011.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MUSE & CO Elite Escorts & Companions Cape Town South Africa'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MUSE & CO | Elite Escorts & Companions South Africa',
    description: 'South Africa\'s premier elite escort & companion agency. Elite escorts and luxury companions for private arrangements and bespoke experiences. Est. 2011.',
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
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'MUSE & CO',
      url: 'https://www.museco.co.za',
      logo: 'https://www.museco.co.za/og-image.jpg',
      description: 'Elite escort and companion agency based in Cape Town. Cape Town\'s #1 elite escort agency offering premium escorts, elite companions, and VIP escort services across South Africa.',
      telephone: '+27-60-776-9793',
      email: 'sharafindit@gmail.com',
      foundingDate: '2011',
      founder: {
        '@type': 'Person',
        name: 'Shara'
      },
      sameAs: [
        'https://www.instagram.com/musaboratories'
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'MUSE & CO',
      description: 'Elite escort and companion agency in Cape Town. #1 escort agency offering elite escorts, VIP companions, and premium escort services across South Africa. Serving Cape Town, Johannesburg, Durban & Pretoria.',
      url: 'https://www.museco.co.za',
      telephone: '+27-60-776-9793',
      priceRange: '$$$$',
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
        { '@type': 'City', name: 'Cape Town' },
        { '@type': 'City', name: 'Johannesburg' },
        { '@type': 'City', name: 'Durban' },
        { '@type': 'City', name: 'Pretoria' },
        { '@type': 'City', name: 'Stellenbosch' },
        { '@type': 'City', name: 'Sandton' },
        { '@type': 'City', name: 'Umhlanga' },
        { '@type': 'Country', name: 'South Africa' },
        { '@type': 'Place', name: 'Worldwide' }
      ],
      serviceType: [
        'Elite Escort Services',
        'VIP Companions',
        'Private Escort Arrangements',
        'Companion Services',
        'Private Event Models',
        'Yacht Party Models',
        'Private Event Hostesses',
        'Party & Nightlife Escorts',
        'Travel Escort Companionship',
        'Dinner Escorts',
      ]
    }
  ]

  return (
    <html lang="en">
      <head>
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-inter`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-champagne-gold focus:text-deep-black focus:font-semibold focus:tracking-wider">
          Skip to content
        </a>
        <AgeGate />
        <Navigation />
        <div id="main-content">
          <PageTransition>
            {children}
          </PageTransition>
        </div>
        <Footer />
      </body>
    </html>
  )
}

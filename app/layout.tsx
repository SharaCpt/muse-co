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
    default: 'MUSE & CO | Elite Companion Services South Africa | Cape Town, Johannesburg, Durban',
    template: '%s | MUSE & CO — Elite Companions South Africa'
  },
  description: 'South Africa\'s premier luxury companion and elite escort agency. Exclusive VIP companions in Cape Town, Johannesburg, Durban & nationwide. High-class travel escorts, sophisticated companionship, and bespoke experiences worldwide. Absolute discretion guaranteed.',
  keywords: 'luxury escort Cape Town, elite companion Johannesburg, VIP escort South Africa, high-class escort Durban, luxury travel companion, executive companion Pretoria, elite hostess Cape Town, VIP companion services South Africa, luxury escort agency Johannesburg, exclusive companion nationwide, escort agency South Africa, elite models Cape Town Johannesburg',
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
    title: 'MUSE & CO | Elite Companion Services South Africa — Cape Town, Johannesburg, Durban',
    description: 'South Africa\'s premier luxury companion agency. Elite VIP companions in Cape Town, Johannesburg, Durban & nationwide. Sophisticated companionship and bespoke experiences worldwide.',
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
    title: 'MUSE & CO | Elite Companions — Cape Town, Johannesburg & South Africa',
    description: 'South Africa\'s premier luxury companion agency. Elite VIP companions in Cape Town, Johannesburg, Durban & nationwide.',
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
      url: 'https://museco.co.za',
      logo: 'https://museco.co.za/og-image.jpg',
      description: 'South Africa\'s premier luxury companion and elite escort agency serving Cape Town, Johannesburg, Durban, Pretoria and worldwide.',
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
      description: 'Premier luxury companion and elite escort services across South Africa — Cape Town, Johannesburg, Durban, Pretoria and worldwide',
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
        'Elite Companion Services',
        'VIP Escort Services',
        'Luxury Travel Companion',
        'Executive Companion',
        'High-Class Hostess Services',
        'Private Event Staffing',
        'International Travel Companionship'
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '127',
        bestRating: '5'
      }
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

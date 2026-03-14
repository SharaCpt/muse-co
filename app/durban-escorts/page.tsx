import { createServerSupabase } from '@/lib/supabase-server'
import LocationPageContent from '@/components/LocationPageContent'

export const revalidate = 300

export default async function DurbanEscortsPage() {
  const supabase = createServerSupabase()

  let models: any[] = []
  try {
    const { data } = await supabase
      .from('portfolio_images')
      .select('id, name, slug, category, image_url, age, height')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .limit(6)

    if (data) models = data
  } catch {}

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'MUSE & CO — Elite Escorts Durban',
    description: 'Premium escort and companion agency serving Durban and Umhlanga. Elite escorts for beach events, private arrangements, and luxury experiences across KwaZulu-Natal.',
    url: 'https://www.museco.co.za/durban-escorts',
    telephone: '+27-60-776-9793',
    priceRange: '$$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Durban',
      addressRegion: 'KwaZulu-Natal',
      addressCountry: 'ZA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -29.8587,
      longitude: 31.0218,
    },
    areaServed: {
      '@type': 'City',
      name: 'Durban',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do you offer escort services in Umhlanga?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Umhlanga is one of our key service areas in KZN. Our escorts are available at Umhlanga hotels, The Oyster Box, Gateway Theatre, and across the North Coast.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I book an escort for a Durban beach event?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. Our Durban escorts are perfect for beach parties, yacht charters along the coastline, beachfront events, and poolside gatherings at luxury hotels.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are your escorts available in Ballito?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we cover the full KZN North Coast including Ballito, Zimbali, Salt Rock, and Shakas Rock. Our escorts also serve the South Coast and KZN Midlands.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LocationPageContent
        city="Durban"
        region="KwaZulu-Natal, South Africa"
        heroImage="https://images.unsplash.com/photo-1599230080915-89de42c7a946?q=80&w=2400&auto=format&fit=crop"
        heroAlt="Elite escorts Durban — luxury escort services in Umhlanga and KwaZulu-Natal, South Africa"
        intro="Where the warm Indian Ocean meets world-class luxury — Durban's finest escort experience awaits."
        bodyText={[
          "Durban is South Africa's subtropical paradise, and MUSE & CO brings elite escort services to the warm heart of KwaZulu-Natal. From the golden beaches of Umhlanga to the vibrant energy of the Durban beachfront, our escorts are the perfect companions for every occasion.",
          "Whether you're attending the Durban July, hosting guests at a Zimbali estate, or enjoying sundowners at one of Umhlanga's rooftop bars, our escorts add elegance and excitement to every moment. Each is selected for their natural beauty, warmth, and effortless ability to connect.",
          "Durban's unique blend of beach culture, Asian-influenced cuisine, and subtropical glamour calls for escorts who appreciate the city's distinctive character. Our KZN escorts are local connoisseurs who know exactly how to make your Durban experience exceptional.",
        ]}
        services={[
          { title: 'Beach & Pool Escorts', description: 'Stunning escorts for Durban beachfront events, hotel pool parties, and coastal outings along the Golden Mile and Umhlanga promenade.' },
          { title: 'Private Dinner Escorts', description: 'Charming escorts for fine dining in Umhlanga, Morningside, and Durban\'s acclaimed restaurant scene. From curries to haute cuisine.' },
          { title: 'Event & Racing Escorts', description: 'Glamorous escorts for the Durban July, Greyville Race Course events, ICC conferences, and charity galas across the city.' },
          { title: 'Resort & Spa Escorts', description: 'Relaxed, engaging companionship at Zimbali, The Oyster Box, Fairmont, or any luxury KZN resort for a truly indulgent experience.' },
          { title: 'Nightlife Escorts', description: 'Vibrant companions for Florida Road bars, Umhlanga nightlife, and the thriving Durban social scene. Fun, beautiful, and always discreet.' },
          { title: 'North Coast Escorts', description: 'Escort services extending to Ballito, Salt Rock, Shakas Rock, and Zimbali. Perfect for North Coast holidays and weekend getaways.' },
        ]}
        areas={[
          'Umhlanga', 'Ballito', 'La Lucia', 'Morningside', 'Berea',
          'Durban North', 'Florida Road', 'Zimbali', 'Westville', 'Kloof',
          'Hillcrest', 'Pinetown', 'Amanzimtoti', 'Salt Rock', 'Umdloti',
        ]}
        whyTitle="Why Choose MUSE & CO in Durban?"
        whyPoints={[
          { title: 'KZN\'s Premier Escort Agency', text: 'We bring Cape Town\'s gold standard of escort services to Durban. Professional, beautiful, and always discreet — our KZN escorts set the benchmark.' },
          { title: 'Beach to Boardroom', text: 'Our Durban escorts are equally comfortable at a Zimbali beach party or a corporate dinner at the ICC. Versatile, engaging, and always appropriate.' },
          { title: 'Warm & Natural', text: 'Durban culture is warm and welcoming — our escorts reflect this perfectly. Genuine, approachable, and always delightful company.' },
          { title: 'Full KZN Coverage', text: 'From Ballito to Margate, Midlands to the Elephant Coast — we cover all of KwaZulu-Natal for clients who need companionship beyond the city.' },
        ]}
        faqItems={[
          { q: 'Do you offer escort services in Umhlanga?', a: 'Yes, Umhlanga is one of our key areas in KZN. Our escorts are available at Umhlanga hotels, The Oyster Box, Gateway Theatre, and across the North Coast.' },
          { q: 'Can I book an escort for a Durban beach event?', a: 'Absolutely. Our Durban escorts are perfect for beach parties, yacht charters along the coastline, beachfront events, and poolside gatherings at luxury hotels.' },
          { q: 'Are your escorts available in Ballito?', a: 'Yes, we cover the full KZN North Coast including Ballito, Zimbali, Salt Rock, and Shakas Rock. Our escorts also serve the South Coast and KZN Midlands.' },
          { q: 'What makes MUSE & CO different from other Durban agencies?', a: 'We are a nationally established agency with a decade-long reputation. Our vetting process, quality standards, and commitment to discretion are unmatched in the KZN escort market.' },
        ]}
        models={models}
      />
    </>
  )
}

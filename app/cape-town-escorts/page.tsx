import { createServerSupabase } from '@/lib/supabase-server'
import LocationPageContent from '@/components/LocationPageContent'

export const revalidate = 300

export default async function CapeTownEscortsPage() {
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
    name: 'MUSE & CO — Elite Escorts Cape Town',
    description: 'Premium escort and companion agency in Cape Town. Elite escorts for private arrangements, events, and luxury experiences across the Western Cape.',
    url: 'https://www.museco.co.za/cape-town-escorts',
    telephone: '+27-60-776-9793',
    priceRange: '$$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cape Town',
      addressRegion: 'Western Cape',
      addressCountry: 'ZA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -33.9249,
      longitude: 18.4241,
    },
    areaServed: {
      '@type': 'City',
      name: 'Cape Town',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I book an elite escort in Cape Town?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Contact MUSE & CO directly via WhatsApp for a discreet consultation. Share your preferences and schedule, and we will arrange the perfect escort for your needs.',
        },
      },
      {
        '@type': 'Question',
        name: 'What areas in Cape Town do your escorts cover?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our escorts are available across Cape Town including the City Bowl, Sea Point, Camps Bay, Clifton, V&A Waterfront, Constantia, Stellenbosch, Franschhoek, and surrounding areas.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are your Cape Town escort services discreet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolute discretion is our top priority. All bookings, communications, and arrangements are handled with complete confidentiality.',
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
        city="Cape Town"
        region="Western Cape, South Africa"
        heroImage="https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2400&auto=format&fit=crop"
        heroAlt="Elite escorts Cape Town — luxury escort services in the Mother City, South Africa"
        intro="Premium escort and companion services in the Mother City — where luxury meets the Atlantic Ocean."
        bodyText={[
          "Cape Town is South Africa's most glamorous city, and MUSE & CO is the premier elite escort agency serving the Mother City. Whether you're visiting for business, attending a Camps Bay yacht party, or exploring the winelands, our professional escorts ensure an unforgettable experience.",
          "Our Cape Town escorts are hand-selected for their beauty, intelligence, and social sophistication. From intimate dinner dates at waterfront restaurants to exclusive private arrangements at luxury hotels, every encounter is tailored to your preferences with absolute discretion.",
          "As Cape Town's trusted escort agency since 2011, we understand the city's elite social scene intimately. Our escorts are comfortable at fine dining establishments, private villas in Clifton, wine estates in Stellenbosch, and world-class events across the Western Cape.",
        ]}
        services={[
          { title: 'Private Dinner Escorts', description: 'Elegant escorts for fine dining at top Cape Town restaurants. From La Colombe to The Test Kitchen — arrive with a stunning companion.' },
          { title: 'Yacht & Beach Escorts', description: 'Professional models and escorts for yacht charters, Camps Bay pool parties, and Clifton beach events. The perfect plus-one for waterfront occasions.' },
          { title: 'Event & Gala Escorts', description: 'Sophisticated escorts for corporate events, gallery openings, horse racing at Kenilworth, and exclusive Cape Town galas.' },
          { title: 'VIP Nightlife Companions', description: 'Turn heads at Cape Town\'s best clubs and lounges. Our escorts know the V&A scene, Long Street, and exclusive private venues.' },
          { title: 'Winelands Escorts', description: 'Cultured, engaging escorts for wine tasting in Stellenbosch, Franschhoek, and Paarl. Perfect for romantic vineyard visits.' },
          { title: 'Travel & Hotel Escorts', description: 'Companionship for your stay at The Silo, One&Only, Mount Nelson, or any luxury Cape Town accommodation.' },
        ]}
        areas={[
          'City Bowl', 'Sea Point', 'Camps Bay', 'Clifton', 'V&A Waterfront',
          'Green Point', 'Constantia', 'Hout Bay', 'Stellenbosch', 'Franschhoek',
          'Paarl', 'Somerset West', 'Table View', 'Century City', 'Bloubergstrand',
        ]}
        whyTitle="Why Choose MUSE & CO in Cape Town?"
        whyPoints={[
          { title: 'Established Since 2011', text: 'Cape Town\'s most trusted elite escort agency with over a decade of experience and an impeccable reputation for quality and discretion.' },
          { title: 'Hand-Selected Escorts', text: 'Every escort is personally vetted for beauty, sophistication, and professionalism. We only represent the finest.' },
          { title: 'Absolute Discretion', text: 'Your privacy is non-negotiable. All communications, bookings, and encounters are handled with complete confidentiality.' },
          { title: 'Tailored to You', text: 'Every arrangement is bespoke. Tell us your preferences and occasion — we handle everything else.' },
        ]}
        faqItems={[
          { q: 'How do I book an elite escort in Cape Town?', a: 'Simply contact us via WhatsApp for a discreet consultation. Share your preferences — occasion, date, and any specifics — and we\'ll arrange the perfect companion for you.' },
          { q: 'What areas in Cape Town do your escorts cover?', a: 'Our escorts are available across Cape Town including the City Bowl, Sea Point, Camps Bay, Clifton, V&A Waterfront, Constantia, Stellenbosch, Franschhoek, and surrounding areas.' },
          { q: 'Are your Cape Town escort services discreet?', a: 'Absolute discretion is our top priority. All bookings, communications, and arrangements are handled with complete confidentiality. We never share client details.' },
          { q: 'What is included in the escort service?', a: 'Our escort service includes the companionship of a beautiful, intelligent professional for your chosen occasion. Visit our pricing page for detailed rate information.' },
        ]}
        models={models}
      />
    </>
  )
}

import { createServerSupabase } from '@/lib/supabase-server'
import LocationPageContent from '@/components/LocationPageContent'

export const revalidate = 300

export default async function PretoriaEscortsPage() {
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
    name: 'MUSE & CO — Elite Escorts Pretoria',
    description: 'Premium escort and companion agency serving Pretoria and Centurion. Elite escorts for diplomatic functions, private arrangements, and luxury experiences across Tshwane.',
    url: 'https://www.museco.co.za/pretoria-escorts',
    telephone: '+27-60-776-9793',
    priceRange: '$$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pretoria',
      addressRegion: 'Gauteng',
      addressCountry: 'ZA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -25.7479,
      longitude: 28.2293,
    },
    areaServed: {
      '@type': 'City',
      name: 'Pretoria',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do you provide escort services in Waterkloof?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Waterkloof and Waterkloof Ridge are core service areas. Our escorts are available for private arrangements at residences, embassies, and fine dining establishments in these prestigious suburbs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I book an escort for a diplomatic or government event in Pretoria?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our escorts are experienced at high-profile events requiring exceptional discretion and social polish. They are comfortable in formal diplomatic settings and understand the protocol required.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Centurion included in your Pretoria escort service area?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. We serve all of Centurion including Irene, Highveld, and surrounding areas. We also cover Midrand, bridging the gap between Pretoria and Johannesburg.',
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
        city="Pretoria"
        region="Gauteng, South Africa"
        heroImage="https://images.unsplash.com/photo-1596367407372-96cb88503db6?q=80&w=2400&auto=format&fit=crop"
        heroAlt="Elite escorts Pretoria — luxury escort services in Waterkloof and the capital city of South Africa"
        intro="South Africa's administrative capital calls for escorts who exude class, intellect, and understated sophistication."
        bodyText={[
          "Pretoria — the Jacaranda City — is a city of diplomats, government officials, and discerning professionals who demand the utmost discretion. MUSE & CO provides elite escort services tailored to the capital's unique social landscape, where refinement and confidentiality are paramount.",
          "From embassy dinners in Waterkloof to intimate evenings in Brooklyn, our Pretoria escorts bring a combination of beauty, intelligence, and social grace that perfectly suits the city's distinguished character. Each escort understands the discreet nature required in a city where reputation matters above all.",
          "Whether you're a visiting dignitary, a business executive at a Menlyn conference, or simply seeking refined companionship during your time in Tshwane, MUSE & CO delivers an escort experience that exceeds expectations while maintaining absolute confidentiality.",
        ]}
        services={[
          { title: 'Diplomatic Event Escorts', description: 'Cultured, multilingual escorts who excel at embassy functions, diplomatic dinners, and formal government events. Poised, discreet, and impeccably mannered.' },
          { title: 'Fine Dining Escorts', description: 'Elegant escorts for Pretoria\'s top restaurants — from Waterkloof\'s intimate eateries to Brooklyn\'s upscale dining scene and Menlyn\'s gourmet venues.' },
          { title: 'Private Arrangement Escorts', description: 'Discreet, premium escort services for private arrangements at Pretoria\'s finest hotels, guest houses, and exclusive residences in Waterkloof Ridge.' },
          { title: 'Conference & Business Escorts', description: 'Professional escorts for Sun Arena events, CSIR conferences, and business gatherings. Articulate, polished, and completely comfortable in corporate settings.' },
          { title: 'Cultural Experience Escorts', description: 'Knowledgeable escorts for Pretoria\'s cultural offerings — Voortrekker Monument, Freedom Park, theatre evenings, and gallery openings.' },
          { title: 'Weekend & Leisure Escorts', description: 'Relaxed, engaging companionship for Rietvlei Dam outings, Irene Farm visits, spa days, or leisurely brunches at Pretoria\'s charming cafes.' },
        ]}
        areas={[
          'Waterkloof', 'Brooklyn', 'Menlyn', 'Hatfield', 'Arcadia',
          'Centurion', 'Irene', 'Highveld', 'Faerie Glen', 'Lynnwood',
          'Newlands', 'Equestria', 'Garsfontein', 'Moreleta Park', 'Midrand',
        ]}
        whyTitle="Why Choose MUSE & CO in Pretoria?"
        whyPoints={[
          { title: 'Capital-Grade Discretion', text: 'In a city of diplomats and officials, discretion isn\'t a feature — it\'s essential. We operate with intelligence-level confidentiality.' },
          { title: 'Refined & Educated Escorts', text: 'Pretoria\'s social scene demands more than beauty. Our escorts are well-read, articulate, and comfortable discussing current affairs over dinner.' },
          { title: 'Full Tshwane Coverage', text: 'From Waterkloof Ridge to Centurion, Hatfield to Irene — we serve the entire Pretoria metropolitan area with consistent quality.' },
          { title: 'Seamless Joburg Connection', text: 'Need an escort in both Pretoria and Johannesburg during your trip? We coordinate across both cities effortlessly through our integrated service.' },
        ]}
        faqItems={[
          { q: 'Do you provide escort services in Waterkloof?', a: 'Yes, Waterkloof and Waterkloof Ridge are core service areas. Our escorts are available for private arrangements at residences, embassies, and fine dining establishments in these prestigious suburbs.' },
          { q: 'Can I book an escort for a diplomatic or government event?', a: 'Our escorts are experienced at high-profile events requiring exceptional discretion and social polish. They are comfortable in formal settings and understand the protocol required.' },
          { q: 'Is Centurion included in your Pretoria service area?', a: 'Absolutely. We serve all of Centurion including Irene, Highveld, and surrounding areas. We also cover Midrand, bridging the gap between Pretoria and Johannesburg.' },
          { q: 'How do Pretoria bookings work?', a: 'Contact us via WhatsApp for a discreet consultation. We\'ll discuss your needs, occasion, and preferences, then recommend the ideal escort. The process is quick, private, and professional.' },
        ]}
        models={models}
      />
    </>
  )
}

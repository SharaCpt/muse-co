import { createServerSupabase } from '@/lib/supabase-server'
import LocationPageContent from '@/components/LocationPageContent'

export const revalidate = 300

export default async function JohannesburgEscortsPage() {
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
    name: 'MUSE & CO — Elite Escorts Johannesburg',
    description: 'Premium escort and companion agency serving Johannesburg and Sandton. Elite escorts for corporate events, private dinners, and luxury experiences across Gauteng.',
    url: 'https://www.museco.co.za/johannesburg-escorts',
    telephone: '+27-60-776-9793',
    priceRange: '$$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Johannesburg',
      addressRegion: 'Gauteng',
      addressCountry: 'ZA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -26.2041,
      longitude: 28.0473,
    },
    areaServed: {
      '@type': 'City',
      name: 'Johannesburg',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do you provide escort services in Sandton?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Sandton is one of our primary service areas in Johannesburg. Our escorts are available at Sandton hotels, restaurants, and event venues throughout the business district.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I book a Johannesburg escort for a business event?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. Our Johannesburg escorts are experienced at corporate functions, conference dinners, and business entertainment. They are professional, articulate, and impeccably presented.',
        },
      },
      {
        '@type': 'Question',
        name: 'How quickly can I arrange an escort in Johannesburg?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We can arrange escort services in Johannesburg with as little as a few hours notice, depending on availability. For guaranteed availability, we recommend booking 24-48 hours in advance.',
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
        city="Johannesburg"
        region="Gauteng, South Africa"
        heroImage="https://images.unsplash.com/photo-1577948000111-9c970dfe3743?q=80&w=2400&auto=format&fit=crop"
        heroAlt="Elite escorts Johannesburg — luxury escort services in Sandton and Joburg, South Africa"
        intro="South Africa's business capital deserves an escort service that matches its ambition and sophistication."
        bodyText={[
          "Johannesburg is the economic powerhouse of Africa, and MUSE & CO is the elite escort agency that serves its most discerning clients. From the gleaming towers of Sandton to the trendy streets of Maboneng, our escorts bring beauty, charm, and effortless sophistication to every occasion.",
          "Whether you're closing a deal at the Michelangelo, hosting clients at a Rosebank penthouse, or unwinding after a conference at Montecasino — our Johannesburg escorts are the ideal companions. Each is selected for intelligence, beauty, and the ability to hold their own in any social setting.",
          "Joburg moves fast, and so do we. Our concierge-style service means you can arrange a premium escort quickly and discreetly, with all the professionalism you'd expect from South Africa's leading escort agency.",
        ]}
        services={[
          { title: 'Business Dinner Escorts', description: 'Polished, articulate escorts who make the perfect impression at corporate dinners and client entertainment in Sandton, Rosebank, and Melrose Arch.' },
          { title: 'Corporate Event Escorts', description: 'Professional escorts for conferences, awards evenings, product launches, and networking events across Johannesburg\'s business district.' },
          { title: 'Private Arrangement Escorts', description: 'Discreet escort services for intimate private arrangements at Johannesburg\'s finest hotels and exclusive residences.' },
          { title: 'Nightlife & Social Escorts', description: 'Stunning escorts for VIP clubs, rooftop lounges, and the vibrant Sandton and Maboneng social scenes.' },
          { title: 'Casino & Entertainment Escorts', description: 'Glamorous companionship for Montecasino, Emperors Palace, and upscale entertainment venues across Gauteng.' },
          { title: 'Weekend Getaway Escorts', description: 'Escort companionship for Cradle of Humankind visits, Sun City trips, or relaxing at a Magaliesberg spa retreat.' },
        ]}
        areas={[
          'Sandton', 'Rosebank', 'Fourways', 'Melrose', 'Hyde Park',
          'Bryanston', 'Morningside', 'Illovo', 'Houghton', 'Maboneng',
          'Parkhurst', 'Greenside', 'Midrand', 'Centurion', 'Randburg',
        ]}
        whyTitle="Why Choose MUSE & CO in Johannesburg?"
        whyPoints={[
          { title: 'Joburg\'s Premium Escort Agency', text: 'We serve the top tier of Johannesburg\'s social and business scene. Our escorts meet the highest standards of professionalism and beauty.' },
          { title: 'Sandton Specialists', text: 'We know Sandton\'s hotel, restaurant, and event landscape intimately. Our escorts are regulars at the city\'s most exclusive venues.' },
          { title: 'Fast & Flexible Booking', text: 'Johannesburg moves fast. We offer same-day bookings when available, with a streamlined WhatsApp consultation process.' },
          { title: 'Total Confidentiality', text: 'Particularly important in Joburg\'s business community — your privacy is guaranteed. No records, no traces, complete discretion.' },
        ]}
        faqItems={[
          { q: 'Do you provide escort services in Sandton?', a: 'Yes, Sandton is one of our primary areas. Our escorts are available at Sandton hotels, restaurants, and event venues throughout the business district and surrounding suburbs.' },
          { q: 'Can I book a Johannesburg escort for a business event?', a: 'Absolutely. Our Johannesburg escorts are experienced at corporate functions, conference dinners, and business entertainment. They are polished, articulate, and impeccably presented.' },
          { q: 'How quickly can I arrange an escort in Johannesburg?', a: 'We can arrange escort services with as little as a few hours notice, depending on availability. For the best selection, we recommend booking 24-48 hours in advance.' },
          { q: 'Do your escorts travel to Pretoria from Johannesburg?', a: 'Yes, our escorts regularly serve clients in Pretoria and across the wider Gauteng region. We also have a dedicated Pretoria page for services in the capital.' },
        ]}
        models={models}
      />
    </>
  )
}
